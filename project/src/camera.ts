import dayjs from 'dayjs';
import { Review } from './types/review';
require('dayjs/locale/ru');

dayjs.locale('ru');
export const humanizeDate = (date: string) => dayjs(date).format('D MMMM');

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) => dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
