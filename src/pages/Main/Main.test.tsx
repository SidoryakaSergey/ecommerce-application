import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage.tsx';

describe('MainPage', () => {
  it('Renders main content', () => {
    // ARRANGE
    render(<MainPage />);
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Main');
  });
});
