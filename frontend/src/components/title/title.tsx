import { FC } from 'react';
import titleStyles from './title.module.css';

interface ITitleProps {
  text: string;
}

const Title: FC<ITitleProps> = ({ text }) => (
  <h1 className={titleStyles.title}>
    {text}
  </h1>
)


export default Title;