import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import entryReducer from './reducers/entryReducers';
import settingsReducer from './reducers/settingsReducers';

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['entry'],
};

const reducer = combineReducers({
	entry: entryReducer,
	settings: settingsReducer,
});

const persistreducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
	persistreducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

const newStore = { store, persistor };

export default newStore;
