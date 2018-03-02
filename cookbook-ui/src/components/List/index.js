import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import './index.css';

export default ({ list = [], sortColumn }) => (
  <div className="list">
    <h2 className="mdc-typography--title page-title">Recipes List</h2>
    <div className="table">
      <ul className="mdc-list mdc-list--two-line">
        {
          list.map(el => <Link key={el._id} to={`/recipes/${el._id}`} className="mdc-list-item">
            <span className="mdc-list-item__text">
              {el.name}
                <span className="mdc-list-item__secondary-text">
                    Created {format(el.created_at, 'Do MMMM, YYYY HH:mm')}
                </span>
            </span>
          </Link>)
        }
      </ul>
    </div>
  </div>
);