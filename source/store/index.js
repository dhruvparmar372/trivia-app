import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  actionBuffer,
  absorbActionsToBuffer
} from "source/middlewares/actionBuffer";
import { OFFLINE_PERSIST_KEYS } from "source/constants/store";
import rootReducer from "source/reducers";
import rootSaga from "source/sagas";

const persistedReducer = persistReducer(
  {
    key: "triviaApp",
    storage,
    whitelist: OFFLINE_PERSIST_KEYS
  },
  rootReducer
);

const middlewares = [actionBuffer];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// absorb non redux-persist actions until persistance completes
absorbActionsToBuffer(
  ["persist/PERSIST", "persist/PURGE"],
  ["persist/REHYDRATE", "SAGAS/INIT/DONE"]
);

export const persistor = persistStore(store, null, () => {
  sagaMiddleware.run(rootSaga);
  store.dispatch({ type: "SAGAS/INIT/DONE" });
});
// persistor.purge();

export default store;
