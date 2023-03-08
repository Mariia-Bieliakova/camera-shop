export const START_PAGE = 1;
export const CAMERAS_PER_PAGE = 9;
export const TOTAL_COUNT_HEADER = 'x-total-count';
export const MODAL_OPEN_CLASS = 'scroll-lock';
export const MIN_RATING = 1;
export const MAX_RATING = 5;

export enum AppRoute {
  Root = '/',
  Catalog = 'catalog/:page',
  Basket = '/basket',
  Product = 'cameras/:id',
  NotFound = '*'
}

export enum Category {
  Photocamera = 'Фотокамера',
  Videocamera = 'Видеокамера'
}

export enum CameraType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
}

export enum CameraLevel {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный'
}

export enum SortType {
  SortPrice = 'по цене',
  SortPopular = 'по популярности'
}

export const SortOrder = {
  Ascending: {name: 'up', value: 'По возрастанию'},
  Descending: {name: 'down', value: 'По убыванию'}
} as const;

export enum NameSpace {
  Camera = 'CAMERA',
  Ui = 'UI',
  Modals = 'MODALS',
  Reviews = 'REVIEWS'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews'
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error'
}

export enum TabType {
  Description = 'description',
  Characteristic = 'characteristic'
}
