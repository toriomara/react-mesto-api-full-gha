import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BurgerMenu } from './BurgerMenu';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';

export const Header = (props) => {
  const { onSignOut, userData } = props;
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const handleBurgerMenu = () => {setIsBurgerMenuOpen(!isBurgerMenuOpen)};
  const currentUser = useContext(CurrentUserContext)

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Лого Mesto' />
      </Link>
      <div className='header__navbar'>
        {pathname === '/signin' && (
          <Link to='/signup' onClick={onSignOut} className='auth__link'>
            Регистрация
          </Link>
        )}
        {pathname === '/signup' && (
          <Link to='/signin' onClick={onSignOut} className='auth__link'>
            Войти
          </Link>
        )}
        {pathname === '/' && (
          <div className='header__user'>
            <div>{currentUser?.email}</div>
            <Link to='/signin' onClick={onSignOut} className='auth__link'>
              Выйти
            </Link>
          </div>
        )}
      </div>
      <button
        className={`${
          isBurgerMenuOpen ? 'navbar__close-button' : 'auth__burger-button'
        }`}
        type='button'
        aria-label='Меню'
        onClick={handleBurgerMenu}
      ></button>
      <BurgerMenu
        isBurgerMenuOpen={isBurgerMenuOpen}
        onChange={setIsBurgerMenuOpen}
        onSignOut={onSignOut}
        userData={userData}
      ></BurgerMenu>
    </header>
  );
};

// 20.00
// 15.15
// 10.30
// 5.45
// 1.00
