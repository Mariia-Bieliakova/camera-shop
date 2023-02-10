export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';
  category: 'Фотокамера' | 'Видеокамера';
  description: string;
  level: 'Нулевой' | 'Любительский' | 'Профессиональный';
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
}

export type Promo = {
    id: number;
    name: string;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}
