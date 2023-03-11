import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ModalAddCart from './modal-add-cart';

const mockStore = configureMockStore();
const fakeCamera = makeFakeCamera();

const store = mockStore({
  [NameSpace.Modals]: {
    activeCamera: fakeCamera,
    isAddToCartOpen: true,
    isReviewOpen: false,
    isReviewSuccessOpen: false
  }
});

const history = createMemoryHistory();

describe('Modal Add to cart:', () => {

  it('should render corectly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddCart />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal')).toHaveClass('is-active');
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
