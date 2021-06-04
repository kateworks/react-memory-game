import React, { useState } from 'react';
import Button from '../Button/Button';
import './Form.css';

function FormInput(props) {
  const [ name, setName ] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitName(name, props.result);
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="form__header">Enter your name</h3>

        <div className="form__fields">
          <input
            type="text" id="input-name" name="input-name"
            className="form__item form__item_name"
            placeholder="Name" required
            value={name}
            onChange={handleChange}
          />
          <input
            type="text" id="input-time" name="input-time"
            className="form__item form__item_time"
            disabled value={props.result}
          />
        </div>

        <Button type="submit" userClass="form__btn-submit">
          OK
        </Button>
      </form>
    </section>
  );
}

export default FormInput;