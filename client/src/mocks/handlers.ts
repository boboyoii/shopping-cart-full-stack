import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/cart/', () => {
    return HttpResponse.json({
      items: [
        {
          product: {
            id: 1,
            name: '운동화',
            thumbnail: 'https://placehold.co/211x211?text=Sneakers',
            price: 35000,
          },
          quantity: 2,
        },
        {
          product: {
            id: 2,
            name: '양말',
            thumbnail: 'https://placehold.co/211x211?text=Socks',
            price: 25000,
          },
          quantity: 2,
        },
      ],
    });
  }),
];
