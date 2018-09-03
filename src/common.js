export const titles = ['Дата', 'Выручка', 'серебро, руб.', 'Индекс ММВБ Last'];

export const formatDate = (date) => `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${(date.getFullYear() % 100) < 10 ? `0${date.getFullYear() % 100}` : date.getFullYear() % 100}`;
