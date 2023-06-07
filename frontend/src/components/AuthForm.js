export const AuthForm = (props) => {
  const { onSubmit, onChange, formValue, errorMessage, buttonText } = props;

  return (
    <form onSubmit={onSubmit} className='auth__form'>
      <input
        id='email'
        name='email'
        type='email'
        autoComplete='off'
        className='auth__input'
        placeholder='Email'
        value={formValue.email || ''}
        onChange={onChange}
        required
      />
      <input
        id='password'
        name='password'
        type='password'
        autoComplete='off'
        className='auth__input'
        placeholder='Пароль'
        value={formValue.password || ''}
        onChange={onChange}
        required
      />
      <div className='auth__error'>{errorMessage}</div>
      <button type='submit' className='auth__button'>
        {buttonText}
      </button>
    </form>
  );
};
