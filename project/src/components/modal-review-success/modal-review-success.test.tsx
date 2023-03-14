import { NameSpace } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ModalReviewSuccess from './modal-review-success';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Modals]: {
    isReviewSuccessOpen: true
  }
});

const history = createMemoryHistory();

describe('Modal Success', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReviewSuccess />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal')).toHaveClass('is-active');
    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
