import * as React from 'react';
import { useContext } from 'react';
import brandlistStyles from './brand-list.module.css';
import { FC } from 'react';
import { DataBrandsContext } from '../../services/contexts/app-context';

interface IBrandListProps {
  children: React.ReactNode
}

function BrandList() {
  const brands = useContext(DataBrandsContext);
  // console.log(brands);
  
  return (
    <section className={brandlistStyles.container}>
      <ul className={brandlistStyles.list}>
        {brands.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} className={brandlistStyles.image} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BrandList;