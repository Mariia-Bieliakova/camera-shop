import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { CAMERAS_PER_PAGE, NameSpace, START_PAGE } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Pagination:', () => {

  it('should render correctly 2 pages and button "Next":', () => {
    const store = mockStore({
      [NameSpace.Ui]: {
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 2
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('should render correctly 4 pages and button "Prev", "Next":', () => {
    const store = mockStore({
      [NameSpace.Ui]: {
        currentPage: 2,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 4
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('should render correctly 10 pages and button "Prev":', () => {
    const store = mockStore({
      [NameSpace.Ui]: {
        currentPage: 10,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 10
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.queryByText('11')).not.toBeInTheDocument();
  });
});
