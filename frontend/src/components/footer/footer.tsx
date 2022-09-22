import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { dataFooter, pathNames } from '../../utils/data';
import Divider from '../divider/divider';
import Image from '../image/image';
import Link from '../link/link';
import Navigation from '../navigation/navigation';
import Text from '../text/text';
import footerStyles from './footer.module.css';

function Footer() {
  const history = useHistory();
  const onClickLink = React.useCallback(
    (path: string) => {
      history.replace({ pathname: path });
    },
    [history]
  );

  return (
    <>
      <Divider />
      <footer className={footerStyles.footer}>
        <Text class={footerStyles.copy} text='&copy; Котловой62&nbsp;2022' />
        <div className={footerStyles.container}>
          <Navigation className={footerStyles.nav}>
            <Link class={footerStyles.link} onClick={() => onClickLink(pathNames.about)}>
              <Text class={footerStyles.text} text='О нас' />
            </Link>
            <Link class={footerStyles.link} onClick={() => onClickLink(pathNames.contacts)}>
              <Text class={footerStyles.text} text='Контакты' />
            </Link>
            <Link class={footerStyles.link} onClick={() => onClickLink(pathNames.feedback)}>
              <Text class={footerStyles.text} text='Написать нам' />
            </Link>
          </Navigation>
        </div>
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