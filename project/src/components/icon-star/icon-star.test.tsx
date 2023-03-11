import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import IconStar from './icon-star';

const history = createMemoryHistory();

describe('Icon Star Component', () => {

  it('should render correctly without props', () => {

    render(
      <HistoryRouter history={history}>
        <IconStar />
      </HistoryRouter>
    );

    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });

  it('should render correctly with props', () => {

    render(
      <HistoryRouter history={history}>
        <IconStar full/>
      </HistoryRouter>
    );

    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });
});
