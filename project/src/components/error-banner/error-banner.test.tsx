import {render, screen} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ErrorBanner from './error-banner';

describe('Component Error Banner:', () => {

  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <ErrorBanner />
        </BrowserRouter>
      </HelmetProvider>
    );

    const spanElement = screen.getByText('Не удалось загрузить промо:( Попробуйте обновить страницу.');

    expect(spanElement).toBeInTheDocument();
  });
});
