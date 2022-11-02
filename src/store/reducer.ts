import {configureStore, createSlice} from '@reduxjs/toolkit';

export interface ChatState {
    messages: any;
    users: any;
};

const initialState: ChatState = {
    messages: [],
    users: [],
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

 export const mockStore = configureStore({
    reducer: {
        'chat': chatSlice.reducer,
    },
  });

  export default chatSlice;