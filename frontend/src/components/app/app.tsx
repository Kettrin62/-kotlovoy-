import { 
  useState, 
  useEffect,
  useReducer
} from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  useLocation,
  useHistory
} from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import AppHeader from '../app-header/app-header';
import { 
  TDataBrand, 
  TDataSwiper,
  TDataCartElement,
  TTotalPrice,
  TAction,
  TDeliveryMethod,
  TDeliveryForm,
  TUser,
  TFormRegister,
  TFormAuth,
  TAuth,
  TDelivery,
  TDataElement
} from '../../services/types/data';
import api from '../../api';
import { 
  DataBrandsContext, 
  DataCartContext,
  DataSwiperContext,
  DeliveryContext
} from '../../services/contexts/app-context';
import { HomePage } from '../../pages/home';
import Footer from '../footer/footer';
import { ElementsPage } from '../../pages/elements';
import { PayPage } from '../../pages/pay';
import { DeliveryPage } from '../../pages/delivery';
import { AboutPage } from '../../pages/about';
import { ContactsPage } from '../../pages/contacts';
import { FeedbackPage } from '../../pages/feedback';
import { ElementPage } from '../../pages/element';
import { CartPage } from '../../pages/cart';
import { 
  CartStepContext,
  TotalPriceContext,
  SelectedDeliveryContext,
  DeliveryFormContext
} from '../../services/contexts/cart-context';
import { formDeliveryInit, stepName, totalInitialPrice } from '../../utils/data';
import { ProtectedRoute } from '../protected-route/protected-route';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import AuthContext from '../../services/contexts/auth-context';
import { Loader } from '../../ui/loader/loader';
import { ProfilePage } from '../../pages/profile';
import { UserContext } from '../../services/contexts/user-context';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { OrderInfoPage } from '../../pages/order-info';
import { AdminPanelPage } from '../../pages/admin-panel';
import useLocalStorage from '../../services/hooks';

function reducer(_totalPrice: TTotalPrice, action: TAction) {
  const deliveryPrice =
    (action.delivery?.selectedMethod &&
      action.delivery?.methods.
      find(method => method.id === action.delivery?.selectedMethod)?.price) || 
    0;

  const total = deliveryPrice +
    action.array.reduce((
      acc: number, 
      item: TDataCartElement<TDataElement>
    ) => acc + item.element.cur_price * item.amount, 0);

  return { price: total };
}

function App() {

  const [brands, setBrands] = useState<Array<TDataBrand>>([]);

  const [swiper, setSwiper] = useState<Array<TDataSwiper>>([]);

  // const [dataCart, setDataCart] = useState<Array<TDataCartElement>>([]);
  const [dataCart, setDataCart] = useLocalStorage('cart', []);

  const [step, setStep] = useState<string>('');

  const [totalPrice, totalDispatcher] = useReducer(reducer, totalInitialPrice);

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number>(1);
  const [form, setForm] = useState<TDeliveryForm>(formDeliveryInit);
  const [deliveryMethods, setDeliveryMethods] = useState<Array<TDeliveryMethod>>([]);

  const [ auth, setAuth ] = useState<TAuth>({
    loggedIn: null,
    isAdmin: null,
  });
  const [ user, setUser ] = useState<TUser | null>(null);
  const [successForgotPassword, setSuccessForgotPassword] = useState(false);

  const history = useHistory();

  const registration = (data: TFormRegister) => {
    const { email, password, username } = data;
    api
      .signup({ email, password, username })
      .then(res => {
        // history.push('/login')
        authorization(data)
      })
      .catch(err => {
        console.log(err);
        
        const errors = Object.values(err)
        console.log(errors);
        
        if (errors.length > 0) {
          alert(errors.join(', '))
        }
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
      })
  };

  const authorization = (data: TFormAuth) => {
    const { email, password } = data;
    api
      .signin({ email, password })
      .then(res => {
        if (res.auth_token) {
          localStorage.setItem('token', res.auth_token)
          api.getUserData()
            .then(res => {
              setUser(res);
              setAuth({
                loggedIn: true,
                isAdmin: res.is_admin,
              })
            })
            .catch(err => {
              setAuth({
                loggedIn: false,
                isAdmin: false,
              })
              history.push('/login')
            })
        } else {
          setAuth({
            loggedIn: false,
            isAdmin: false,
          })
        }
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
      })
  };

  const onLogout = () => {
    api
      .signout()
      .then(res => {
        localStorage.removeItem('token');
        setDataCart([]);
        setStep('')
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  const forgotPassword = (email: string) => {
    api
      .forgotPassword(email)
      .then(res => {
        setSuccessForgotPassword(true);
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
        setSuccessForgotPassword(false);
      })
  };

  const getBrands = () => {
    api
      .getBrands()
      .then(data => setBrands(data))
      .catch(err => console.log(err))
  };

  const getSliders = () => {
    api
      .getSliders()
      .then(data => setSwiper(data))
      .catch(err => console.log(err))
  };

  const getMethodsDelivery = () => {
    api
      .getDeliveryMethods()
      .then(data => setDeliveryMethods(data))
      .catch(err => console.log(err))
  };

  const addDeliveryMethod = (data: TDelivery, set: (el: boolean) => void) => {
    api
      .addDeliveryMethod(data)
      .then(res => {
        // alert('Метод доставки добавлен');
        set(false);
        getMethodsDelivery()
      })
      .catch(err => console.log(err));
  };

  const editDeliveryMethod = (id: number, data: TDelivery) => {
    api
      .editDeliveryMethod(id, data)
      .then(res => {
        // alert('Метод доставки изменен');
        // set(false);
        getMethodsDelivery()
      })
      .catch(err => console.log(err));
  };

  const deleteDeliveryMethod = (id: number) => {
    api
      .deleteDeliveryMethod(id)
      .then(res => {
        // alert('Метод доставки удалён');
        // set(false);
        getMethodsDelivery()
      })
      .catch(err => console.log(err));
  }

  const initUser = () => {
    const token = localStorage.getItem('token');
    if (token && token !== null) {
      return api.getUserData()
      .then(res => {
        setUser(res)
        setAuth({
          loggedIn: true,
          isAdmin: res.is_admin,
        })
      })
      .catch(err => {
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
        history.push('/login')
      })
    }
    setAuth({
      loggedIn: false,
      isAdmin: false,
    })
  };
  
  useEffect(() => {
    initUser();
    getBrands();
    getSliders();
    getMethodsDelivery();
  }, []);

  if (auth.loggedIn === null) {
    return <Loader size='large' />
  }

  return (
    <ErrorBoundary>
      <div>
        <Router>
          <AuthContext.Provider value={auth}>
            <UserContext.Provider value={{user, setUser}}>
              <DataCartContext.Provider value={{ dataCart, setDataCart }}>
                <CartStepContext.Provider value={{ step, setStep }}>
                  <DeliveryContext.Provider value={deliveryMethods}>
                    <AppHeader />
                    <Switch>
                      <Route path='/' exact={true}>
                        <DataBrandsContext.Provider value={brands}>
                          <DataSwiperContext.Provider value={swiper}>
                            <HomePage />
                          </DataSwiperContext.Provider>
                        </DataBrandsContext.Provider>
                      </Route>
                      <Route path='/elements' exact={true}>
                        <ElementsPage />
                      </Route>
                      <Route path='/elements/:id' exact={true}>
                        <ElementPage />
                      </Route>

                      <Route path='/pay' exact={true}>
                        <PayPage />
                      </Route>

                      <Route path='/delivery' exact={true}>
                        <DeliveryPage />
                      </Route>

                      <Route path='/about' exact={true}>
                        <AboutPage />
                      </Route>

                      <Route path='/contacts' exact={true}>
                        <ContactsPage />
                      </Route>

                      <Route path='/feedback' exact={true}>
                        <FeedbackPage />
                      </Route>

                      <Route path='/elements/brand/:id' exact={true}>
                        <ElementsPage />
                      </Route>

                      <Route path='/elements/search/:name' exact={true}>
                        <ElementsPage />
                      </Route>

                      <Route path='/cart' exact={true}>
                        <TotalPriceContext.Provider value={{ totalPrice, totalDispatcher }}>
                          <SelectedDeliveryContext.Provider value={{ selectedDeliveryId, setSelectedDeliveryId }}>
                            <DeliveryFormContext.Provider value={{ form, setForm }}>
                              <CartPage />
                            </DeliveryFormContext.Provider>
                          </SelectedDeliveryContext.Provider>
                        </TotalPriceContext.Provider>
                      </Route>

                      <Route path='/register' exact={true}>
                        <RegisterPage
                          onSignUp={registration}
                        />
                      </Route>

                      <Route path='/login' exact={true}>
                        <LoginPage 
                          onLogin={authorization}
                        />
                      </Route>
                      <Route path='/forgot-password' exact={true}>
                        <ForgotPasswordPage 
                          onForgot={forgotPassword} 
                          success={successForgotPassword}
                        />
                      </Route>
                      <Route path='/reset-password' exact={true}>
                        <ResetPasswordPage
                          successForgot={successForgotPassword}
                        />
                      </Route>

                      <ProtectedRoute
                        path='/profile' 
                        exact={true}
                      >
                        <ProfilePage onLogout={onLogout} />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/profile/set-password' 
                        exact={true}
                      >
                        <ProfilePage onLogout={onLogout} />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/profile/orders' 
                        exact={true}
                      >
                        <ProfilePage onLogout={onLogout} />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/profile/orders/:id' 
                        exact={true}
                      >
                        <OrderInfoPage />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/admin-panel/orders' 
                        exact={true}
                      >
                        <AdminPanelPage
                          onLogout={onLogout} 
                          addDelivery={addDeliveryMethod} 
                          editDelivery={editDeliveryMethod}
                          deleteDelivery={deleteDeliveryMethod}
                        />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/admin-panel/orders/:id' 
                        exact={true}
                      >
                        <OrderInfoPage />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/admin-panel/users' 
                        exact={true}
                      >
                        <AdminPanelPage
                          onLogout={onLogout} 
                          addDelivery={addDeliveryMethod} 
                          editDelivery={editDeliveryMethod}
                          deleteDelivery={deleteDeliveryMethod}
                        />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/admin-panel/delivery' 
                        exact={true}
                      >
                        <AdminPanelPage 
                          onLogout={onLogout} 
                          addDelivery={addDeliveryMethod} 
                          editDelivery={editDeliveryMethod}
                          deleteDelivery={deleteDeliveryMethod}
                        />
                      </ProtectedRoute>

                      <ProtectedRoute
                        path='/admin-panel/status' 
                        exact={true}
                      >
                        <AdminPanelPage
                          onLogout={onLogout} 
                          addDelivery={addDeliveryMethod} 
                          editDelivery={editDeliveryMethod}
                          deleteDelivery={deleteDeliveryMethod}
                        />
                      </ProtectedRoute>

                    </Switch>
                  </DeliveryContext.Provider>
                </CartStepContext.Provider>
              </DataCartContext.Provider>
            </UserContext.Provider>
          </AuthContext.Provider>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App;