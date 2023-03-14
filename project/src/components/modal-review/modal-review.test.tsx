import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { FetchStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';
import ModalReview from './modal-review';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Modals]: {
    activeCamera: null,
    isAddToCartOpen: false,
    isReviewOpen: true,
    isReviewSuccessOpen: false
  },
  [NameSpace.Reviews]: {
    postReviewStatus: FetchStatus.Idle
  }
});

const history = createMemoryHistory();

describe('Modal Review:', () => {

  it('should render corectly', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal')).toHaveClass('is-active');
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);

    await userEvent.type(screen.getByTestId('review'), 'some review');
    await userEvent.type(screen.getByTestId('userName'), 'name');
    await userEvent.type(screen.getByTestId('disadvantage'), 'some disadvantages');
    await userEvent.type(screen.getByTestId('advantage'), 'some advantages');

    expect(screen.getByDisplayValue('some review')).toBeInTheDocument();
    expect(screen.getByDisplayValue('name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('some disadvantages')).toBeInTheDocument();
    expect(screen.getByDisplayValue('some advantages')).toBeInTheDocument();
  });
});
