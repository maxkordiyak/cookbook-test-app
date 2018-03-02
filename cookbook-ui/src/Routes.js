import React from 'react';
import { Route } from 'react-router-dom';
import RecipeListContainer from './containers/List';
import NewRecipeContainer from './containers/New';
import RecipeDetailsContainer from './containers/Details';

export default () => (
  [
    <Route key="create" exact path="/new/recipe" component={NewRecipeContainer}></Route>,
    <Route key="list" exact path="/recipes" component={RecipeListContainer}></Route>,
    <Route key="details" exact path="/recipes/:id" component={RecipeDetailsContainer}></Route>
  ]
);