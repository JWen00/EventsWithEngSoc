import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import InitialScreen from "./screens/InitialScreen";

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default function App() {
  return (
    <Provider store={store}>
      <InitialScreen/>
    </Provider>
  );
}
