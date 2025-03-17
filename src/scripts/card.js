import { openModal, exitModal } from './modal.js';
import { likeCardA, unlikeCardA, removeCard } from './api.js';

let cardElementToDelete = null;
let cardIdToDelete = null;

export function creationCard(cardContent, userId, deleteCallback, likeCallback, imageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCount = cardElement.querySelector('.card__like-num');

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  likesCount.textContent = cardContent.likes.length;

  if (cardContent.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardContent._id));
  }

  if (cardContent.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => likeCallback(cardContent, likeButton, likesCount));
  cardImage.addEventListener('click', () => imageCallback(cardContent));

  return cardElement;
}

export function deleteItem(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function openDeletePopup(cardElement, cardId) {
  cardElementToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(document.querySelector('.popup_type_delete-card'));
}

export function submitDeleteCard(evt) {
  evt.preventDefault();
  removeCard(cardIdToDelete)
    .then(() => {
      deleteItem(cardElementToDelete);
      exitModal(document.querySelector('.popup_type_delete-card'));
      cardElementToDelete = null; // Очистка после удаления
      cardIdToDelete = null;
    })
    .catch((err) => console.log(err));
}

export function likeCardHandler(card, likeButton, likesCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  (isLiked ? unlikeCardA : likeCardA)(card._id)
    .then((updatedCard) => {
      likeCard(likeButton);
      likesCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.log(err));
}