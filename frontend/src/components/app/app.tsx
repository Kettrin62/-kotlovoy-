import * as React from 'react';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { 
  TDataBrand, 
  TDataSwiper,
  TDataElement,
  TDataCartElement
} from '../../services/types/data';
import api from '../../api';
import { 
  DataBrandsContext, 
  DataCartContext, 
  DataSwiperContext 
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

function App() {

  const [brands, setBrands] = useState<Array<TDataBrand>>([]);

  const [swiper, setSwiper] = useState<Array<TDataSwiper>>([]);

  const [dataCart, setDataCart] = useState<Array<TDataCartElement>>([]);

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
  }

  useEffect(() => {
    getBrands();
    getSliders();
  }, []);


  return (
    <ErrorBoundary>
      <div>
        <Router>
          <DataCartContext.Provider value={{ dataCart, setDataCart }}>
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
                {/* <BrandElementsPage /> */}
                <ElementsPage />
              </Route>

              <Route path='/elements/search/:name' exact={true}>
                <ElementsPage />
              </Route>

              <Route path='/cart' exact={true}>
                <CartPage />
              </Route>

            </Switch>
          </DataCartContext.Provider>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App;