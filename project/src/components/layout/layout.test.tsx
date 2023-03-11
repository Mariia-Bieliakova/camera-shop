import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Layout from './layout';

const history = createMemoryHistory();

describe('Layout component', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Layout>
          <p> I am children </p>
        </Layout>
      </HistoryRouter>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('I am children')).toBeInTheDocument();
  });
});
