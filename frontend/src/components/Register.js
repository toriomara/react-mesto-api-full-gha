import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from './AuthForm';

export const Register = ({ onRegister, errorMessage }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);
  };

  return (
    <section className='auth'>
      <h1 className='auth__header'>Регистрация</h1>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText='Зарегистрироваться'
        errorMessage={errorMessage}
        formValue={formValue}
        onChange={handleChange}
      />
      <div className='auth__signup'>
        <span>
          Уже зарегистрированы?&nbsp;
          <Link to='/sign-in' className='auth__link'>
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Register;
