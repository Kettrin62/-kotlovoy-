import * as React from 'react';
import { useContext, useCallback } from 'react';
import { 
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import brandlistStyles from './brand-list.module.css';
import { FC } from 'react';
import { DataBrandsContext } from '../../services/contexts/app-context';
import Button from '../button/button';

interface IBrandListProps {
  children: React.ReactNode
}

function BrandList() {
  const brands = useContext(DataBrandsContext);
  const history = useHistory();

  // const onClickBrand = useCallback(
  //   () => {
  //     history.replace({ pathname: '/elements' });
  //   },
  //   [history]
  // );

  return (
    <section className={brandlistStyles.container}>
      <ul className={brandlistStyles.list}>
        {brands.map(item => (
          <li key={item.id}>
            <Link to={{ pathname: `/elements/brand/${item.id}` }}>
              <img src={item.image} alt={item.title} className={brandlistStyles.image} />
            </Link>
            {/* <img src={item.image} alt={item.title} className={brandlistStyles.image} /> */}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BrandList;