import { CameraLevel, CAMERAS_PER_PAGE, CameraType, Category, OrderData, SortData, START_PAGE } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import { changePage, setCameraLevel, setCameraType, setCategory, setFromPrice, setMinAndMaxPrice, setOrderType, setPagesCount, setSortType, setToPrice, UI, ui } from './ui';

const fakeCameras = [makeFakeCamera(), makeFakeCamera()];

describe('Reducer: ui', () => {
  let state: UI;

  beforeEach(() => {
    state = {
      currentPage: START_PAGE,
      camerasPerPage: CAMERAS_PER_PAGE,
      pages: 0,
      sort: SortData.Idle,
      order: OrderData.Idle,
      categories: [],
      cameraTypes: [],
      cameraLevels: [],
      minimalPrice: 0,
      maximumPrice: 0,
      fromPrice: undefined,
      toPrice: undefined
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(ui.reducer(undefined, { type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set current page as given', () => {
    const page = 4;

    expect(ui.reducer(state, changePage({page})))
      .toEqual({
        currentPage: page,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set the count of pages', () => {
    const camerasCount = 10;
    const pages = Math.ceil((camerasCount / CAMERAS_PER_PAGE));

    expect(ui.reducer(state, setPagesCount({camerasCount})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set the sort type', () => {

    expect(ui.reducer(state, setSortType({sortType: SortData.Price})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Price,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set the order type', () => {

    expect(ui.reducer(state, setOrderType({orderType: OrderData.Descending})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Descending,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should add category to array', () => {

    expect(ui.reducer(state, setCategory({category: Category.Photocamera})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [Category.Photocamera],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should add type to types array', () => {

    expect(ui.reducer(state, setCameraType({cameraType: CameraType.Film})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [CameraType.Film],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should add level to levels array', () => {

    expect(ui.reducer(state, setCameraLevel({cameraLevel: CameraLevel.Professional})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [CameraLevel.Professional],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set minimal and maximum price', () => {

    expect(ui.reducer(state, setMinAndMaxPrice({cameras: fakeCameras})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: fakeCameras[0].price > fakeCameras[1].price ? fakeCameras[1].price : fakeCameras[0].price,
        maximumPrice: fakeCameras[0].price > fakeCameras[1].price ? fakeCameras[0].price : fakeCameras[1].price,
        fromPrice: undefined,
        toPrice: undefined
      });
  });

  it('should set from Price', () => {

    expect(ui.reducer(state, setFromPrice({fromPrice: 2000})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: 2000,
        toPrice: undefined
      });
  });

  it('should set to price', () => {

    expect(ui.reducer(state, setToPrice({toPrice: 5000})))
      .toEqual({
        currentPage: START_PAGE,
        camerasPerPage: CAMERAS_PER_PAGE,
        pages: 0,
        sort: SortData.Idle,
        order: OrderData.Idle,
        categories: [],
        cameraTypes: [],
        cameraLevels: [],
        minimalPrice: 0,
        maximumPrice: 0,
        fromPrice: undefined,
        toPrice: 5000
      });
  });
});
