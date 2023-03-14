import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { TabType } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import TabDescription from './tab-description';

const mockCamera = makeFakeCamera();

describe('Tab Description', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <TabDescription
            description={mockCamera.description}
            tabType={TabType.Description}
          />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
    expect(screen.getByTestId('tab-description')).toHaveClass('is-active');
  });

  it('shouldn\'t have class "is-active" if type is not description', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <TabDescription
            description={mockCamera.description}
            tabType={TabType.Characteristic}
          />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('tab-description')).not.toHaveClass('is-active');
  });
});
