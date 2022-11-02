import chatSlice, { mockStore } from './store/reducer';

const {setMessages, setUsers, removeUser} = chatSlice.actions;

test('Send Message to Chat', () => {
    let messages: any = mockStore.getState().chat.messages;
    const initialMessagesCount = messages.length;

    mockStore.dispatch(setMessages({'pk': '5d89ec49-8980-4f8c-9dd4-4ffd54342016', 'id': 'e9a5588d-8553-4b01-8b41-6d7e49a40223', 'name': 'Erick', 'message': 'Hurrehh it is weekend', 'time' : 'Wed Nov 02 2022'}));
    messages = mockStore.getState().chat.messages;
    const sentMessage = messages.find((message: any) => message.pk === '5d89ec49-8980-4f8c-9dd4-4ffd54342016');
    expect(sentMessage?.name).toBe('Erick');
    expect(sentMessage?.message).toBe('Hurrehh it is weekend');
    expect(messages.length).toBeGreaterThan(initialMessagesCount);
});

test('Register a User to Chat & Delete a User from Chat', () => {
    let users: any = mockStore.getState().chat.users;
    const initialUsersCount = users.length;

    mockStore.dispatch(setUsers({'pk' : '3a6883f9-9c2a-4420-9e6c-ee8c679615de', 'name' : 'Erick'}));
    users = mockStore.getState().chat.users;
    const registeredUser = users.find((user: any) => user.pk === '3a6883f9-9c2a-4420-9e6c-ee8c679615de');
    expect(registeredUser?.name).toBe('Erick');
    expect(users.length).toBeGreaterThan(initialUsersCount);

    mockStore.dispatch(removeUser({'pk': '3a6883f9-9c2a-4420-9e6c-ee8c679615de'}));
    users = mockStore.getState().chat.users;
    expect(users.length).toBe(initialUsersCount);

});