import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { makeFakePastReview } from '../../utils/mock';
import ReviewItem from './review-item';

const mockReview = makeFakePastReview();

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Review Item:', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <ReviewItem reviewItem={mockReview} />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${mockReview.rating}`)).toBeInTheDocument();
  });
});
