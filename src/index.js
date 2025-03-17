import './pages/index.css';
import avatar from './images/avatar.jpg';
import logo from './images/logo.svg';
import { openModal, exitModal } from './scripts/modal.js';
import { creationCard, likeCard, deleteItem, openDeletePopup, likeCardHandler } from './scripts/card.js';
import { initializeValidation, resetValidation, enableValidation } from './scripts/validation.js'; 
import { getInitialCards, getProfile, editProfile, addNewCard, removeCard, likeCardA, unlikeCardA, editProfileAvatar } from './scripts/api.js';

const elements = {
  editButton: document.querySelector('.profile__edit-button'),
  editPopup: document.querySelector('.popup_type_edit'),
  imagePopup: document.querySelector('.popup_type_image'),
  addButton: document.querySelector('.profile__add-button'),
  profileTitle: document.querySelector('.profile__title'),
  descriptionInput: document.querySelector('.popup__input_type_description'),
  placesList: document.querySelector('.places__list'),
  popupImage: document.querySelector('.popup__image'),
  popupCaption: document.querySelector('.popup__caption'),
  profileDescription: document.querySelector('.profile__description'),
  editProfileForm: document.querySelector('.popup_type_edit .popup__form'),
  nameInput: document.querySelector('.popup__input_type_name'),
  addPopup: document.querySelector('.popup_type_new-card'),
  newForm: document.querySelector('.popup_type_new-card .popup__form'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url'),
  profileImage: document.querySelector('.profile__image'),
  avatarPopup: document.querySelector('.popup_type_new-avatar'),
  avatarForm: document.querySelector('.form__new-avatar'),
  avatarLinkInput: document.querySelector('.popup__input_type_new-avatar'),
  avatarEditButton: document.querySelector('.profile__avatar__edit-button'),
  deletePopup: document.querySelector('.popup_type_delete-card'),
  deleteForm: document.querySelector('.form__delete-card'),
};

// Закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => exitModal(popup));
  }
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) exitModal(popup);
  });
});

// Инициализация профиля и карточек с сервера
let userId = '';
Promise.all([getProfile(), getInitialCards()])
  .then(([profile, cards]) => {
    elements.profileTitle.textContent = profile.name;
    elements.profileDescription.textContent = profile.about;
    elements.profileImage.style.backgroundImage = `url(${profile.avatar})`;
    userId = profile._id;

    cards.forEach((cardContent) => {
      const cardElement = creationCard(
        cardContent,
        userId,
        openDeletePopup,
        likeCardHandler,
        openImage
      );
      elements.placesList.append(cardElement);
    });
  })
  .catch((err) => console.log(err));

// Открытие изображения
function openImage(cardContent) {
  elements.popupImage.src = cardContent.link;
  elements.popupImage.alt = cardContent.name;
  elements.popupCaption.textContent = cardContent.name;
  openModal(elements.imagePopup);
}

// Обновление профиля
function handleUserFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = elements.editProfileForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editProfile(elements.nameInput.value, elements.descriptionInput.value)
    .then((profile) => {
      elements.profileTitle.textContent = profile.name;
      elements.profileDescription.textContent = profile.about;
      exitModal(elements.editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

// Добавление новой карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = elements.newForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  const newCardEl = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  addNewCard(newCardEl)
    .then((card) => {
      const newCardContent = creationCard(
        card,
        userId,
        openDeletePopup,
        likeCardHandler,
        openImage
      );
      elements.placesList.prepend(newCardContent);
      exitModal(elements.addPopup);
      elements.newForm.reset();
      resetValidation(elements.newForm, enableValidation);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

// Удаление карточки
let cardElementToDelete = null;
let cardIdToDelete = null;

function submitDeleteCard(evt) {
  evt.preventDefault();
  removeCard(cardIdToDelete)
    .then(() => {
      deleteItem(cardElementToDelete);
      exitModal(elements.deletePopup);
    })
    .catch((err) => console.log(err));
}

// Обновление аватара
function submitAvatarForm(evt) {
  evt.preventDefault();
  const submitButton = elements.avatarForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editProfileAvatar(elements.avatarLinkInput.value)
    .then((profile) => {
      elements.profileImage.style.backgroundImage = `url(${profile.avatar})`;
      exitModal(elements.avatarPopup);
      elements.avatarForm.reset();
      resetValidation(elements.avatarForm, enableValidation);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

// Слушатели событий
elements.editButton.addEventListener('click', () => {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
  openModal(elements.editPopup);
  resetValidation(elements.editProfileForm, enableValidation);
});

elements.addButton.addEventListener('click', () => {
  elements.newForm.reset();
  openModal(elements.addPopup);
  resetValidation(elements.newForm, enableValidation);
});

elements.avatarEditButton.addEventListener('click', () => {
  elements.avatarForm.reset();
  openModal(elements.avatarPopup);
  resetValidation(elements.avatarForm, enableValidation);
});

elements.editProfileForm.addEventListener('submit', handleUserFormSubmit);
elements.newForm.addEventListener('submit', addCardSubmit);
elements.deleteForm.addEventListener('submit', submitDeleteCard);
elements.avatarForm.addEventListener('submit', submitAvatarForm);

// Включаем валидацию
initializeValidation(enableValidation);