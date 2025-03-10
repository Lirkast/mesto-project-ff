const cardTemplate = document.querySelector('#card-template').content;

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function cardCreation(name, link, deleteEl, likeEl, imageEl) {

  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardDeleteButton.addEventListener('click', () => deleteEl(cardElement));
  cardLikeButton.addEventListener('click', () => likeEl(cardLikeButton));
  cardImage.addEventListener('click', () => imageEl({ name, link }));

  return cardElement;
}

export function deleteItem(cardElement) {
  cardElement.remove();
}
