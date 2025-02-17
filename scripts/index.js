const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function cardCreation(name, link, deleteItem) {
    const cardItem = cardTemplate.cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');

    cardItem.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteItem);

    return cardItem;
}

function deleteItem(event) {
    event.target.closest('.card').remove();
}

initialCards.forEach(({name, link}) => {
    placesList.append(cardCreation(name, link, deleteItem));
});