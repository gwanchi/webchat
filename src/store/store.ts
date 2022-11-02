import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {createStateSyncMiddleware, initStateWithPrevTab} from "redux-state-sync";
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import chatSlice from './reducer';

const persistConfig = {
    key: 'chat',
    storage,
    // stateReconciler: autoMergeLevel2,
  }

const persistedReducer = persistReducer(persistConfig, chatSlice.reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, createStateSyncMiddleware({})],
  });

  initStateWithPrevTab(store);

  export const {setMessages, setUsers, removeUser} = chatSlice.actions;

  export const persistor = persistStore(store);
  
  export default store;