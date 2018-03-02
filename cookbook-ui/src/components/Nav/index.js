import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default () => (
  [
    <NavLink key="recipes" to="/recipes">Recipes</NavLink>,
    <NavLink key="new" to="/new/recipe">Create</NavLink>
  ]
);