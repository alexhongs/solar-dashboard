import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {createStore, StoreProvider} from 'easy-peasy';

const model = {
  quizStep: 0,
  quizResult: {
    0: 'Home',
    1: 'Allegheny',
    2: 'Test',
    3: 'Test',
    4: 'Test',
    5: 'Test',
    6: 'Test',
  },
};

describe('Customer page', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  it('Should have the correct tabs in the nav bar', () => {
    const app = (
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    );

    const {getByTestId} = render(app);
    const element = screen.getByText(/Did you know Western PA, there are/i);

    expect(element).toBeInTheDocument();
  });
})
