import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage.tsx';

describe('MainPage', () => {
  it('Renders main content', () => {
    // ARRANGE
    render(<MainPage />);

    // ACT
    const incrediblesPosterImg = screen.getAllByAltText(/banner1/i);

    // ASSERT
    expect(incrediblesPosterImg[0]).toBeInTheDocument();
  });
});
