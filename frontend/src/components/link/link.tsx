import * as React from 'react';
import { FC } from 'react';

interface ILinkProps {
  class: string;
  onClick: () => void;
  children: React.ReactNode;
};

const Link: FC<ILinkProps> = (props) => {
  return (
    <a className={props.class} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

export default Link;