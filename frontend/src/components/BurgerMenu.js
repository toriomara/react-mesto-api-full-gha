import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const BurgerMenu = (props) => {
  const { onSignOut, isBurgerMenuOpen } = props;
  const currentUser = useContext(CurrentUserContext)
  return (
    <div className={`burger-menu ${isBurgerMenuOpen ? 'opened' : ''}`}>
      <div>{currentUser?.email}</div>
      <Link to='/signin' onClick={onSignOut} className='auth__link'>
        Выйти
      </Link>
    </div>
  );
};
