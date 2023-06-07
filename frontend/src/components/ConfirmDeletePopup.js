import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export const ConfirmDeletePopup = (props) => {
  const { isOpen, onClose, onCardDelete, isLoading } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete();
  };

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText='Удалить'
      buttonTextLoading='Удаление...'
      isLoading={isLoading}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
};
