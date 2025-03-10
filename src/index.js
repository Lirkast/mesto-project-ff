import './pages/index.css';
import avatar from './images/avatar.jpg';
import logo from './images/logo.svg';
import { initialCards } from './scripts/cards.js';
import { openModal, exitModal } from './scripts/modalWindow.js';
import { cardCreation, likeCard, deleteItem } from './scripts/cardFunctional.js';

const elements = {
  editButton: document.querySelector('.profile__edit-button'),
  addButton: document.querySelector('.profile__add-button'),
  editPopup: document.querySelector('.popup_type_edit'),
  addPopup: document.querySelector('.popup_type_new-card'),
  imagePopup: document.querySelector('.popup_type_image'),
  profileTitle: document.querySelector('.profile__title'),
  profileDescription: document.querySelector('.profile__description'),
  formElement: document.querySelector('.popup_type_edit .popup__form'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description'),
  newForm: document.querySelector('.popup_type_new-card .popup__form'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url'),
  placesList: document.querySelector('.places__list'),
  popupImage: document.querySelector('.popup__image'),
  popupCaption: document.querySelector('.popup__caption'),
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      exitModal(popup);
    });
  }

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      exitModal(popup);
    }
  });
});

function openImage(cardContent) {
  elements.popupImage.src = cardContent.link;
  elements.popupImage.alt = cardContent.name;
  elements.popupCaption.textContent = cardContent.name;
  openModal(elements.imagePopup);
}

function addCardSubmit(evt) {
  evt.preventDefault();
  const newCardEl = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  const newCardContent = cardCreation(newCardEl.name, newCardEl.link, deleteItem, likeCard, openImage);
  elements.placesList.prepend(newCardContent);
  exitModal(elements.addPopup);
  elements.newForm.reset();
}

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  elements.profileTitle.textContent = elements.nameInput.value;
  elements.profileDescription.textContent = elements.descriptionInput.value;
  exitModal(elements.editPopup);
}

elements.editButton.addEventListener('click', () => {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
  openModal(elements.editPopup);
});

elements.addButton.addEventListener('click', () => {
  elements.newForm.reset();
  openModal(elements.addPopup);
});

elements.formElement.addEventListener('submit', handleUserFormSubmit);
elements.newForm.addEventListener('submit', addCardSubmit);

initialCards.forEach((cardContent) => {
  const cardElement = cardCreation(cardContent.name, cardContent.link, deleteItem, likeCard, openImage);
  elements.placesList.append(cardElement);
});