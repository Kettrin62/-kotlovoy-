import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import brandlistStyles from './brand-list.module.css';
import { DataBrandsContext } from '../../services/contexts/app-context';

function BrandList() {
  const brands = useContext(DataBrandsContext);

  return (
    <section className={brandlistStyles.container}>
      <ul className={brandlistStyles.list}>
        {brands.map(item => (
          <li key={item.id}>
            <Link to={{ pathname: `/elements/brand/${item.id}` }}>
              <img src={item.image} alt={item.title} className={brandlistStyles.image} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BrandList;