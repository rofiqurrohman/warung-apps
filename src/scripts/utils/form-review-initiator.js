/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import WarungSource from '../data/warung-source';
import Toast from './toast-initiator';

const FormReviewInitiator = {
  init({ form }) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.validateDataForm(form);
    });
  },

  validateDataForm(form) {
    const data = this.setDataForm(form);
    const error = {
      status: false,
      keys: [],
    };

    for (const key in data) {
      if (data[key] === '') {
        error.status = true;
        error.keys.push(key);
      }
    }

    if (error.status === false) {
      this.sendData({
        data: JSON.stringify(data),
        form,
      });
    } else {
      this.errorHandler(error, form);
    }
  },

  setDataForm(form) {
    const data = new FormData(form);
    const dataForm = {};
    for (const key of data.keys()) {
      dataForm[key] = data.get(key);
    }
    return dataForm;
  },

  errorHandler(error, form) {
    form.querySelectorAll('span').forEach((item) => {
      item.remove();
    });
    error.keys.forEach((key) => {
      const element = document.querySelector(`#${key}`);
      const errorElement = document.createElement('span');
      errorElement.setAttribute('class', 'input-require');
      errorElement.innerText = `field ${key} must be filled`;
      element.after(errorElement);
    });
  },

  successHandler(form) {
    const formElement = form;
    formElement.querySelectorAll('span').forEach((item) => {
      item.remove();
    });

    formElement.querySelector('input[type=text]').value = '';
    formElement.querySelector('textarea').value = '';

    Toast({
      type: 'success',
      text: 'Review added successfully',
    });
  },

  async sendData({ data, form }) {
    try {
      WarungSource.sendReview(data);
      this.successHandler(form);
    } catch (err) {
      console.log(err);
    }
  },
};

export default FormReviewInitiator;
