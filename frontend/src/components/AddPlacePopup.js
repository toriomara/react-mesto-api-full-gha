import React, { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  // const { values, handleChange, setValues } = useForm({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAddPlace({
  //     name: values.name,
  //     link: values.link,
  //   });
  // };

  // useEffect(() => {
  //   setValues({});
  // }, [isOpen]);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='form__input form__input_card_name'
        id='name-card'
        name='card-name'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        value={name || ''}
        // value={values.name || ''}
        // onChange={handleChange}
        onChange={handleChangeName}
        required
      />
      <span className='form__input-error name-card-error'></span>
      <input
        className='form__input form__input_card_link'
        id='link-card'
        name='card-link'
        type='url'
        placeholder='Ведите адрес ссылки'
        value={link || ''}
        // value={values.link || ''}
        // onChange={handleChange}
        onChange={handleChangeLink}
        required
      />
      <span className='form__input-error link-card-error'></span>
    </PopupWithForm>
  );
};
