import { GET_LIST, GET_DETAILS, SET_INDEX, REMOVE_RECIPE_ERROR, CREATE_RECIPE_ERROR, UPDATE_RECIPE_ERROR } from '../actions';

export default (state = { list: [], pagination: [], limit: 10, index: 1, details: {}, errorMessage: "", sort: {"created_at": "desc"} }, action) => {
  const { type, list, index, pagination, details, errorMessage } = action;

  switch (type) {
  case GET_LIST:
    return Object.assign({}, state, {
      list, pagination
    });
  case GET_DETAILS:
    return Object.assign({}, state, {
      details
    });
  case SET_INDEX:
    return Object.assign({}, state, {
      index
    });
  case REMOVE_RECIPE_ERROR:
    return Object.assign({}, state, {
      errorMessage
    });
  case CREATE_RECIPE_ERROR:
    return Object.assign({}, state, {
      errorMessage
    });
  case UPDATE_RECIPE_ERROR:
    return Object.assign({}, state, {
      errorMessage
    });
  break;
  default:
    return state;
  }
};
