import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage.tsx';

describe('LoginPage', () => {
  it('Renders login form', () => {
    // ARRANGE
    render(<LoginPage />);

    // ACT
    const loginForm = screen.getByRole('login-form');

    // ASSERT
    expect(loginForm).toBeInTheDocument();
  });
});
