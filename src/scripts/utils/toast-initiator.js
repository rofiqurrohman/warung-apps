const Toast = ({ type, text }) => {
  const toastElem = document.createElement('div');
  toastElem.classList.add('toast');
  toastElem.classList.add(type);
  const textElem = document.createElement('p');
  textElem.classList.add('t-text');
  textElem.innerHTML += text;
  toastElem.appendChild(textElem);

  const toastContainer = document.querySelector('.toast-container');
  window.onload = () => {
    toastContainer.appendChild(toastElem);
  };

  setTimeout(() => {
    toastElem.classList.add('active');
  }, 1);

  setTimeout(() => {
    toastElem.classList.remove('active');
    setTimeout(() => {
      toastElem.remove();
    }, 350);
  }, 4000);
};

export default Toast;
