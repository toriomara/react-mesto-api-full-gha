import successReg from '../images/successReg.png';
import errorReg from '../images/errorReg.png';

export const InfoTooltip = (props) => {
  const { isOpen, onClose, isRegistered } = props;
  const title = isRegistered
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз';

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
        <img src={isRegistered ? successReg : errorReg} alt={title} />
        <h2 className='popup__title'>{title}</h2>
      </div>
    </section>
  );
};
