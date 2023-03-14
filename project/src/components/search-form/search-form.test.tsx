import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from './search-form';

describe('Search form:', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
