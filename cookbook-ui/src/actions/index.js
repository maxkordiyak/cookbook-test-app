import { buildUrl } from '../utils/index.js';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const GET_LIST = 'GET_LIST';
export const GET_LIST_ERROR = 'GET_LIST';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_DETAILS_ERROR = 'GET_DETAILS';
export const SET_INDEX = 'SET_INDEX';
export const REMOVE_RECIPE = 'REMOVE_RECIPE';

export const UPDATE_RECIPE_ERROR = 'UPDATE_RECIPE_ERROR';
export const REMOVE_RECIPE_ERROR = 'REMOVE_RECIPE_ERROR';
export const CREATE_RECIPE_ERROR = 'CREATE_RECIPE_ERROR';

const BASE_URL = 'http://localhost:3001/api/recipes';

export function startLoading() {
  return { type: START_LOADING };
}

export function endLoading() {
  return { type: END_LOADING };
}

export function setRecipeList(json) {
  return {
    type: GET_LIST,
    list: json.data,
    pagination: json.pagination
  };
}

export function onRecipeListError(error) {
  return {
    type: GET_LIST_ERROR,
    error: error
  };
}

export function getRecipeList() {

    return (dispatch, getState) => {
        dispatch(startLoading());
        console.log(getState())
        const sort = getState().recipe.sort;
        const page = getState().recipe.index.selected + 1;
        const params = {
            page: JSON.stringify(page),
            limit: getState().recipe.limit,
            sort: JSON.stringify(sort)
        };
        const URL = BASE_URL;
        return fetch(
            buildUrl(URL, params), { method: "GET" })
                .then(response => response.json())
                .then(json => dispatch(setRecipeList(json)))
                .catch(error => {
                    dispatch(onRecipeListError(error))
                })
                .then(endLoading);
    }
}

export function fetchRecipesIfNeeded() {
    return dispatch => {
        return dispatch(getRecipeList)
    }
}

export function setRecipeDetails(json) {
  return {
    type: GET_DETAILS,
    details: json.data
  };
}

export function onRecipeDetailsError(error) {
  return {
    type: GET_DETAILS_ERROR,
    error: error
  };
}

export function getRecipeDetails(id) {

    return dispatch => {
        const URL = `${BASE_URL}/${id}`;

        return fetch(URL, { method: "GET" })
            .then(response => response.json())
            .then(json => dispatch(setRecipeDetails(json)))
            .catch(error => {
                dispatch(onRecipeDetailsError(error));
            })
            .then(endLoading);
    }
}

export function onCreateRecipeError(error) {
    return {
        type: CREATE_RECIPE_ERROR,
        error: error
    };
}

export function createRecipe(data) {

    const URL = BASE_URL;
    return dispatch => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch(error => {
                dispatch(onCreateRecipeError(error))
            })
            .then(endLoading);
    };
}


export function onRemoveRecipeError(error) {
    return {
        type: REMOVE_RECIPE_ERROR,
        error: error
    };
}

export function removeRecipe(recipeId) {

    return dispatch => {
        startLoading();
        const URL = `${BASE_URL}/${recipeId}`;
        return fetch(URL, { method: "DELETE" })
            .then(() => dispatch({ type: REMOVE_RECIPE, recipeId }) )
            .catch(error => {
                dispatch(onRemoveRecipeError(error))
            })
            .then(endLoading);
    }
}

export function onUpdateRecipeError(error) {
    return {
        type: UPDATE_RECIPE_ERROR,
        error: error
    };
}

export function updateRecipe(data) {

    const URL = `${BASE_URL}/${data.id}`;
    return dispatch => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch(error => {
                dispatch(onUpdateRecipeError(error))
            })
            .then(endLoading);
    };
}

export function setPageIndex(index) {
    return { type: SET_INDEX, index };
}

