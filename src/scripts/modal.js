function closePopup(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) exitModal(activePopup);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopup);
}

export function exitModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
  document.removeEventListener('keydown', closePopup);
}