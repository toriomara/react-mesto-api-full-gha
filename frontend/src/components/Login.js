import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from './AuthForm';

export const Login = ({ onLogin, errorMessage }) => {
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
    onLogin(email, password);
  };

  return (
    <section className='auth'>
      <h1 className='auth__header'>Вход</h1>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText='Войти'
        errorMessage={errorMessage}
        formValue={formValue}
        onChange={handleChange}
      />
      <div className='auth__signup'>
        <span>
          Не зарегистрированы?&nbsp;
          <Link to='/signup' className='auth__link'>
            Регистрация
          </Link>
        </span>
      </div>
    </section>
  );
};
