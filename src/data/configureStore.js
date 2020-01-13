import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";

import { createRootReducer } from "data/rootReducer";
import rootSaga from "data/rootSaga";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return { history, store };
}
