import * as React from 'react';
import { FC } from 'react';

interface ILinkProps {
  class: string;
  src: string;
  alt: string;
};

const Image: FC<ILinkProps> = (props) => {
  return (
    <img className={props.class} src={props.src} alt={props.alt} />
  )
}

export default Image;