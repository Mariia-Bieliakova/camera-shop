import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { TabType } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import TabCharacteristic from './tab-characteristic';

const mockCamera = makeFakeCamera();

describe('Tab Characteristic', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <TabCharacteristic camera={mockCamera} tabType={TabType.Characteristic} />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.category)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.type)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.level)).toBeInTheDocument();
    expect(screen.getByTestId('tab-characteristic')).toHaveClass('is-active');
  });

  it('shouldn\'t have class "is-active" if type is not characteristic', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <TabCharacteristic camera={mockCamera} tabType={TabType.Description} />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('tab-characteristic')).not.toHaveClass('is-active');
  });
});
