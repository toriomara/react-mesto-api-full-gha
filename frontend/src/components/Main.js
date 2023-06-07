import React, { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = (props) => {
  const {
    cards,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      {/* Profile */}
      <section className='profile'>
        <div className='profile__main'>
          <div
            className='profile__avatar-container'
            // style={{ backgroundImage: `url(${userAvatar})` }}
          >
            <img
              className='profile__avatar'
              src={currentUser.avatar}
              alt='Аватар'
            />
            <button
              className='profile__avatar-edit-button'
              type='button'
              aria-label='Смена аватара'
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className='profile__info'>
            <div className='profile__info-wrapper'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                className='profile__edit-button'
                type='button'
                aria-label='Редактировать'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__job'>{currentUser.about}</p>
          </div>
        </div>
        <button
          className='profile__button'
          type='button'
          aria-label='Добавить'
          onClick={onAddPlace}
        ></button>
      </section>
      {/* Cards */}
      <section className='cards' id='cards'>
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};
