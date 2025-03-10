function EscClose(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) {
      exitModal(activePopup);
    }
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', EscClose);
}

export function exitModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', EscClose);
}



