import * as React from 'react';
import { useState, useEffect } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { TDataBrands, TDataSwiper } from '../../services/types/data';
import api from '../../api';
// import { BASEURL } from '../../utils/constants';
import { DataBrandsContext, DataSwiperContext } from '../../services/contexts/app-context';
import { HomePage } from '../../pages/home';

import slide1 from '../../images/фото котлов/2022-09-04 23-22-17.png';
import slide2 from '../../images/фото котлов/2022-09-04 23-25-45.png';
import slide3 from '../../images/фото котлов/1597939460154787852.jpg';
import slide4 from '../../images/фото котлов/remont-i-obsluzhivanie-kotlov-bosch.jpeg';
import brand1 from '../../images/brands/arderia.png';
import brand2 from '../../images/brands/ariston.png';
import brand3 from '../../images/brands/attack.png';
import brand4 from '../../images/brands/baltgaz.png';
import brand5 from '../../images/brands/baxi.png';
import brand6 from '../../images/brands/beretta.png';
import brand7 from '../../images/brands/biasi.png';
import brand8 from '../../images/brands/bosch.png';
import brand9 from '../../images/brands/buderus.png';

function App() {

  const [brands, setBrands] = useState<Array<TDataBrands>>([
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand1}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand2}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand3}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand4}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand5}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand6}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand7}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand8}`
    },
    {
      id: 1,
      title: 'Brand 1',
      image: `${brand9}`
    },
  ]);

  const [swiper, setSwiper] = useState<Array<TDataSwiper>>([
    {
      id: 1,
      title: 'Slide 1',
      image: `${slide1}`,
      message: 'I am angry',
      available: true,
      url: '#'
    },
    {
      id: 2,
      title: 'Slide 2',
      image: `${slide2}`,
      message: 'I am happy',
      available: true,
      url: '#'
    },
    {
      id: 3,
      title: 'Slide 3',
      image: `${slide3}`,
      message: 'I am programmer',
      available: true,
      url: '#'
    },
    {
      id: 4,
      title: 'Slide 3',
      image: `${slide4}`,
      message: 'I am programmer',
      available: true,
      url: '#'
    },
  ]);

  const getBrands = () => {
    api
      .getBrands()
      .then(data => setBrands(data))
      .catch(err => console.log(err))
  }


  useEffect(() => {
    // getBrands();
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
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App;