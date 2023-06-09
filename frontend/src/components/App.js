import '../index.css';
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Register } from './Register';
import { Login } from './Login';
import * as mestoAuth from '../utils/mestoAuth';
import { InfoTooltip } from './InfoTooltip';

// https://dev.to/zachsnoek/creating-custom-react-hooks-useform-1gon
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms
// Бургер меню не окончено, адо доделать. Не могу понять как сдвигать всю страницу вниз.
// Хук useForm не смог сделать (логику понимаю, но пока он не заработал).
// Также доделать универсальный попап, и валидацию. Всё это найдешь в ревью спринта 12.

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ ...card, isClicked: true });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .addCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
    api
      .removeCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter((card) => selectedCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape' || evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mouseup', closeByEscape);

      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mouseup', closeByEscape);
      };
    }
  }, [isOpen]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mestoAuth
        .getToken(token)
        .then((res) => {
          if (res.email) {
            setUserData(res.email);
          // if (res.data.email) {
          //   setUserData(res.data.email);
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          if (err === 400) {
            console.log('При передаче токена произошла ошибка');
          }
          if (err === 401) {
            console.log('Некорректный токен');
          }
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  // useEffect(() => {
  //   localStorage.setItem('jwt', checkToken);
  // }, []);

  const handleRegister = (email, password) => {
    mestoAuth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistered(true);
        navigate('/signin');
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegistered(false);
        if (err === 'Ошибка: 400') {
          setErrorMessage('Почта и/или пароль заполнены некорректно');
        }
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage();
        }, 5000);
      });
  };

  const handleLogin = (email, password) => {
    mestoAuth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setUserData({ email });
        navigate('/');
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === 'Ошибка: 400') {
          setErrorMessage('Не заполнены почта и/или пароль');
        } else if (err === 'Ошибка: 401') {
          // setErrorMessage('Пользователь с таким email не найден');
          setErrorMessage('Неверный email или пароль');
        }
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
          userData={userData}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegister}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login onLogin={handleLogin} errorMessage={errorMessage} />
            }
          />
          <Route
            path='*'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Navigate to='/signin' replace />
              )
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleConfirmDelete}
          isLoading={isLoading}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
