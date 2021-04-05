import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import {reducers} from './ducks/index';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;