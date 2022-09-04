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

function App() {

  const [brands, setBrands] = useState<Array<TDataBrands>>([]);
  const [swiper, setSwiper] = useState<Array<TDataSwiper>>([
    {
      id: 1,
      title: 'Slide 1',
      image: 'http://www.pnzsad.ru/media/Swiper/4.png',
      message: 'I am angry',
      available: true,
      url: '#'
    },
    {
      id: 2,
      title: 'Slide 2',
      image: 'http://www.pnzsad.ru/media/Swiper/7.png',
      message: 'I am happy',
      available: true,
      url: '#'
    },
    {
      id: 3,
      title: 'Slide 3',
      image: 'http://www.pnzsad.ru/media/Swiper/5.png',
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
    // const getData = () => {
    //   fetch(`${BASEURL}brands/`)
    //   .then(function (res) {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     return Promise.reject(`Ошибка: ${res.statusText}`);
    //   })
    //   .then((data) => {
    //     setData(data.data)
    //   }
    //     )
    //   .catch((err) => console.log(err));
    // };
    getBrands();
  }, []);

  // console.log(data);
  

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