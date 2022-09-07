import * as React from 'react';
import { dataFooter } from '../../utils/data';
import Divider from '../divider/divider';
import Image from '../image/image';
import Text from '../text/text';
import footerStyles from './footer.module.css';

function Footer() {

  return (
    <>
      <Divider />
      <footer className={footerStyles.footer}>
        <Text class={footerStyles.copy} text='&copy; Котловой62&nbsp;2022' />
        <ul className={footerStyles.list}>
          {dataFooter.map((el, index) => (
            <li className={footerStyles.item} key={index}>
              <Image class={footerStyles.icon} src={el.image} alt={el.name}/>
              <Text class={footerStyles.text} text={el.text} />
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}

export default Footer;