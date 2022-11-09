import * as React from 'react';
import formStyles from './form.module.css';
import { FC } from 'react';
import cn from 'classnames';

interface IFormProps {
  class?: string;
  name: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
};


const Form: FC<IFormProps> = (props) => {
  return (
    <form name={props.name} className={cn(formStyles.form, props.class)} onSubmit={props.onSubmit}>
      <fieldset className={(props.class ? props.class : formStyles.form__info)}>
        {props.children}
      </fieldset>
    </form>
  )
};

export default Form;