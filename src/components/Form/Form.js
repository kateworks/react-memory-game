import React from 'react';
import Button from '../Button/Button';
import './Form.css';

function Form() {
  return (
    <section className="form-container">
      <form className="form">
        <h3 className="form__header">
          Enter your name
        </h3>
        <input
          type="text" id="input-name" name="input-name"
          className="form__item form__item_name"
          placeholder="Name" required
        />
        <Button
          type="submit"
          userClass="form__btn-submit"
        >
          OK
        </Button>
      </form>
    </section>
  );
}

export default Form;