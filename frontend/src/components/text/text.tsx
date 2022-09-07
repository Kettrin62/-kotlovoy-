import * as React from 'react';
import { FC } from 'react';

interface ITextProps {
  class: string;
  text: string;
}

const Text: FC<ITextProps> = (props) => {

  return (
    <p className={props.class}>
      {props.text}
    </p>
  )
}

export default Text;