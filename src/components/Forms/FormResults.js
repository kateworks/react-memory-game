import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { LOCAL_STORAGE_KEY } from '../../utils/const';
import './Form.css';

function ResultsItem({ name, time}) {
  return (
    <li className="form__list-item">
      <input
        type="text" id="input-name" name="input-name"
        className="form__item form__item_name"
        disabled value={name || ''}
      />
      <input
        type="text" id="input-time" name="input-time"
        className="form__item form__item_time"
        disabled value={time || ''}
      />
    </li>
  );
}

function FormResults(props) {
  const [ resultsTable, setResultsTable ] = useState([]);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const results = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      setResultsTable(results);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitResults();
  };

  const getResults = (array) => {
    if (array.length > 0) {
      array.sort((a, b) => (a.time - b.time));
      return (
        <ul className="form__list">
          {
            array.map((item, index) => (
              <ResultsItem key={index} name={item.name} time={item.time}/>
            ))
          }
        </ul>
      );
    } else {
      return (
        <p className="form__empty">
          No results yet
        </p>
      );
    }
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="form__header">Results</h3>
        {
          getResults(resultsTable)
        }
        <Button type="submit" userClass="form__btn-submit">
          OK
        </Button>
      </form>
    </section>
  );
}

export default FormResults;