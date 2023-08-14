import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('Renders main content', () => {
    // ARRANGE
    render(<Main />);
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      }),
    ).toHaveTextContent('Main');
  });
});
