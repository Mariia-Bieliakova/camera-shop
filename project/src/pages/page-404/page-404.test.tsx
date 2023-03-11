import {render, screen} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './page-404';

describe('Component Page 404:', () => {

  it('should render correctly:', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PageNotFound />
        </BrowserRouter>
      </HelmetProvider>
    );

    const headerElement = screen.getByText('404 Страница не найдена');
    const linkElement = screen.getByText('Вернуться на главную страницу');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
