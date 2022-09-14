import * as React from 'react';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { TDataBrand, TDataSwiper } from '../../services/types/data';
import api from '../../api';
// import { BASEURL } from '../../utils/constants';
import { DataBrandsContext, DataSwiperContext } from '../../services/contexts/app-context';
import { HomePage } from '../../pages/home';

import slide1 from '../../images/фото котлов/2022-09-04 23-22-17.png';
import slide2 from '../../images/фото котлов/2022-09-04 23-25-45.png';
import slide3 from '../../images/фото котлов/1597939460154787852.jpg';
import slide4 from '../../images/фото котлов/remont-i-obsluzhivanie-kotlov-bosch.jpeg';
import Footer from '../footer/footer';
import { BrandElementsPage } from '../../pages/brand-elements';
import { ElementsPage } from '../../pages/elements';
import { PayPage } from '../../pages/pay';
import { DeliveryPage } from '../../pages/delivery';
import { AboutPage } from '../../pages/about';
import { ContactsPage } from '../../pages/contacts';
import { FeedbackPage } from '../../pages/feedback';

function App() {

  const [brands, setBrands] = useState<Array<TDataBrand>>([]);

  const [swiper, setSwiper] = useState<Array<TDataSwiper>>([]);

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
              <BrandElementsPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App;