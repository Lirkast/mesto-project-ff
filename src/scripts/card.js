import { openDeletePopup, LikeCard } from '../index.js';

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
    deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardContent._id));
  }

  if (cardContent.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => LikeCard(cardContent, likeButton, likesCount));
  cardImage.addEventListener('click', () => imageCallback(cardContent));

  return cardElement;
}

export function deleteItem(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}