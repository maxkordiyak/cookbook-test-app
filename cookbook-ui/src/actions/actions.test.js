import * as actions from './index';
import {START_LOADING, GET_LIST} from "./index";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const BASE_URL = 'http://localhost:3001/api/recipes';

describe('actions', () => {
    it('should create an action to start loading', () => {
        const expectedLoading = {
            type: START_LOADING,
        };
        expect(actions.startLoading()).toEqual(expectedLoading)
    })
});

