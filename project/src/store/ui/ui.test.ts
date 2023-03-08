import { CAMERAS_PER_PAGE, START_PAGE } from '../../const';
import { changePage, setPagesCount, ui } from './ui';

describe('Reducer: ui', () => {
  it('without additional parameters should return initial state', () => {
    expect(ui.reducer(undefined, { type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0
      });
  });

  it('should set current page as given', () => {
    const state = {
      currentPage: START_PAGE,
      camerasPerPage: CAMERAS_PER_PAGE,
      pages: 0
    };

    const page = 4;

    expect(ui.reducer(state, changePage({page})))
      .toEqual({
        currentPage: page,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0
      });
  });

  it('should set the count of pages', () => {
    const state = {
      currentPage: START_PAGE,
      camerasPerPage: CAMERAS_PER_PAGE,
      pages: 0
    };

    const camerasCount = 10;
    const pages = Math.ceil((camerasCount / CAMERAS_PER_PAGE));

    expect(ui.reducer(state, setPagesCount({camerasCount})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages
      });
  });
});
