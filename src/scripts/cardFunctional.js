const cardTemplate = document.querySelector('#card-template').content;

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function cardCreation(name, link, deleteEl, likeEl, imageEl) {

  const cardItem = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardDeleteButton.addEventListener('click', () => deleteEl(cardItem));
  cardLikeButton.addEventListener('click', () => likeEl(cardLikeButton));
  cardImage.addEventListener('click', () => imageEl({ name, link }));

  return cardItem;
}

export function deleteItem(cardItem) {
  cardItem.remove();
}