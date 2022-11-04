import React from "react";
import { TDelivery, TFormRegister, TFormStatus, TStatus } from "../services/types/data";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState<TFormRegister>({
    email: '',
    password: '',
    username: '',
    current_password: '',
    new_password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState<TFormRegister>({
    email: '',
    password: '',
    username: '',
    current_password: '',
    new_password: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      setValues({...values, [name]: value.toLowerCase()});
    } else setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target?.closest("form")!.checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {
      email: '',
      password: '',
      username: '',
      current_password: '',
      new_password: ''
    }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

//хук управления формой и валидации формы
export function useFormStatus() {
  const [values, setValues] = React.useState<TFormStatus>({
    status: '',
    comment: '',
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target?.closest("form")!.checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {
      status: '',
      comment: '',
    }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

//хук управления формой и валидации формы
export function useFormDelivery() {
  const [values, setValues] = React.useState<TDelivery>({
    company: '',
    comment: '',
    duration: '',
    price: 0,
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target?.closest("form")!.checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {
      company: '',
      comment: '',
      duration: '',
      price: 0,
    }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}