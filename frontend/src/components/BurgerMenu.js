import { Link } from 'react-router-dom';

export const BurgerMenu = (props) => {
  const { userData, onSignOut, isBurgerMenuOpen } = props;
  return (
    <div className={`burger-menu ${isBurgerMenuOpen ? 'opened' : ''}`}>
      <div>{userData.email}</div>
      <Link to='/sign-in' onClick={onSignOut} className='auth__link'>
        Выйти
      </Link>
    </div>
  );
};
