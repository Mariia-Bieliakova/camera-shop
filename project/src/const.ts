export enum AppRoute {
  Root = '/',
  Basket = '/basket',
  Camera = 'cameras/',
  Product = ':id'
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
  Camera = 'CAMERA'
}

export enum APIRoute {
  Cameras = '/cameras'
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error'
}
