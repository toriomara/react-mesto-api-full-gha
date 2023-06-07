export const ImagePopup = (props) => {
  const { card, onClose } = props;
  return (
    <section
      className={`popup popup_image ${card.isClicked ? 'popup_opened' : ''}`}
    >
      <div className='image-container'>
        <figure className='image-container__figure'>
          <button
            className='popup__close-button popup__close-button_image image-container__close-button'
            type='button'
            aria-label='Закрыть'
            onClick={onClose}
          ></button>
          <img
            className='image-container__image'
            alt={card.name}
            src={card ? card.link : ''}
          />
          <figcaption className='image-container__caption'>
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
