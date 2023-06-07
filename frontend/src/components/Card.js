import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = (props) => {
  const { card, onCardClick, onCardLike, onCardDelete } = props;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__button ${
    isLiked && 'card__button_active'
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className='card'>
      {isOwn && (
        <button
          className='card__button_trash'
          type='button'
          aria-label='Удалить'
          onClick={handleDeleteClick}
        />
      )}
      <img
        className='card__image'
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className='card__title'>
        <h2 className='card__name'>{card.name}</h2>
        <div>
          <button
            type='button'
            aria-label='Нравится'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className='card__likes-counter'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};
