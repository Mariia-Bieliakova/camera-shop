import { Review } from '../types/review';
import {random, name, lorem, date, datatype, commerce, image} from 'faker';
import { MAX_RATING, MIN_RATING } from '../const';
import { Camera, Promo } from '../types/camera';

const getRandomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const makeFakePastReview = (): Review => ({
  id: random.alphaNumeric(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentences(),
  rating: getRandomInteger(MIN_RATING, MAX_RATING),
  createAt: String(date.past()),
  cameraId: datatype.number()
} as Review);

export const makeFutureReview = (): Review => ({
  id: random.alphaNumeric(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentences(),
  rating: getRandomInteger(MIN_RATING, MAX_RATING),
  createAt: String(date.future()),
  cameraId: datatype.number()
} as Review);

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: 'DA4IU67AD5',
  type: 'Плёночная',
  category: 'Видеокамера',
  description: commerce.productDescription(),
  level: 'Профессиональный',
  rating: getRandomInteger(MIN_RATING, MAX_RATING),
  price: Number(commerce.price()),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
  reviewCount: datatype.number()
} as Camera);

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
} as Promo);
