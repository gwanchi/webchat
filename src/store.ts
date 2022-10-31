import {configureStore, createSlice} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {createStateSyncMiddleware, initStateWithPrevTab} from "redux-state-sync";
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'chat',
    storage,
    // stateReconciler: autoMergeLevel2,
  }

export interface ChatState {
    messages: any;
    users: any;
};

const initialState: ChatState = {
    messages: [],
    users:[],
  };

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      setMessages: (state: any, {payload}: {payload: any}) => {
        state.messages = [...state.messages, payload];
      },
      setUsers: (state: any, {payload}: {payload: any}) => {
        state.users = [...state.users, payload];
      },
      removeUser: (state: any, {payload}: {payload: any}) => {
        state.users = [...state.users].filter((data) => data.pk !== payload.pk);
      },
    }
  });

const persistedReducer = persistReducer(persistConfig, chatSlice.reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, createStateSyncMiddleware({})],
  });

  initStateWithPrevTab(store);

  export const {setMessages, setUsers, removeUser} = chatSlice.actions;

  export const persistor = persistStore(store);
  
  export default store;