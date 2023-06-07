import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

export const EditProfilePopup = (props) => {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name'>
        <input
          className='form__input form__input_profile_name'
          id='name-profile'
          name='name'
          type='text'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          value={name}
          onChange={handleChangeName}
          required
        />
        <span className='form__input-error name-profile-error'></span>
      </label>
      <label htmlFor='job'>
        <input
          className='form__input form__input_profile_job'
          id='job-profile'
          name='job'
          type='text'
          placeholder='Сфера деятельности'
          minLength='2'
          maxLength='200'
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <span className='form__input-error job-profile-error'></span>
      </label>
    </PopupWithForm>
  );
};
