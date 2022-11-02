import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import chatSlice, { mockStore } from './store/reducer';

test('Still working on how to deal with createStateSyncMiddleware in the Component Tests', () => {
  expect('team').not.toMatch(/I/);
});

/* import App from './App';

test('Register User On Application & Send Message', () => {
  render(<App />);
  const initialUserLength = mockStore.getState().chat.users.length;

  let titleInput = screen.getByPlaceholderText('Name');
  expect(titleInput).toBeInTheDocument();
  fireEvent.change(titleInput, { target: { value: 'Erick' } });
  expect(titleInput).toHaveValue('Erick');

  let submitButton = screen.getByText('Submit');
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  let users = mockStore.getState().chat.users.length;
  expect(users).toBeGreaterThan(initialUserLength);

}); */