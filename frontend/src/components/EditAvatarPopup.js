import React, { useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export const EditAvatarPopup = (props) => {
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;

  const inputAvatar = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  };

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='form__input form__input_avatar'
        id='avatar-card'
        name='card-avatar'
        type='url'
        placeholder='Ведите адрес ссылки на аватар'
        ref={inputAvatar}
        required
      />
      <span className='form__input-error avatar-card-error'></span>
    </PopupWithForm>
  );
};
