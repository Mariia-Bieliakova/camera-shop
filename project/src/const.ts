export const START_PAGE = 1;
export const CAMERAS_PER_PAGE = 9;

export enum AppRoute {
  Root = '/',
  Catalog = 'catalog/:page',
  Basket = '/basket',
  Product = 'cameras/:id'
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
  Ui = 'UI'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo'
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error'
}
