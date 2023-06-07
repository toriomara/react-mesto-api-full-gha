import { useEffect } from 'react';

export const UniversalPopup = ({ isOpen, name, card, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} ${
        card.isClicked ? 'popup_opened' : ''
      } popup_${name}`}
      onClick={handleOverlay}
    >
      <div className='popup__container'>
        {children}
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </section>
  );
};
