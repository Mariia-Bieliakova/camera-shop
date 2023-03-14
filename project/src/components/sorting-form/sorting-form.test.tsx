import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import SortingForm from './sorting-form';

describe('Sorting form:', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <SortingForm />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
});
