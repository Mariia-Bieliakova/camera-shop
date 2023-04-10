export const START_PAGE = 1;
export const CAMERAS_PER_PAGE = 9;
export const TOTAL_COUNT_HEADER = 'x-total-count';
export const MODAL_OPEN_CLASS = 'scroll-lock';
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const TIME_FOR_DEBOUNCE = 1000;

export enum AppRoute {
  Root = '/',
  Catalog = 'catalog/:page',
  Basket = '/basket',
  Product = 'cameras/:id',
  NotFound = '*'
}

export enum Category {
  Photocamera = 'Фотоаппарат',
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

export type CamerasParams = {
  start: number;
  limit: number;
  sort?: SortData;
  order?: OrderData;
  categories?: Category[];
  types?: CameraType[];
  levels?: CameraLevel[];
  fromPrice?: number;
  toPrice?: number;
};

export enum SortData {
  Idle = '',
  Price = 'price',
  Rating = 'rating'
}

export enum OrderData {
  Idle = '',
  Ascending = 'asc',
  Descending = 'desc'
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
