import React from 'react';

export const PopupWithForm = (props) => {
  const {
    name,
    title,
    children,
    btn,
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    buttonText,
    buttonTextLoading,
  } = props;
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form className='form' name={name} onSubmit={onSubmit}>
          <fieldset className='form__set'>
            {children}
            <button
              className='form__save-button'
              type='submit'
              aria-label={btn}
            >
              {isLoading ? buttonTextLoading : buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
