import express from 'express';

import { USER_ID } from '../constanst.js';
import { NotFoundError } from '../errors.js';
import Cart from '../models/Cart.js';
import { Storage } from '../storages/Storage.js';
import OrderSheet from '../models/OrderSheet.js';

export interface OrderSheetController {
  create: express.RequestHandler;
}

interface CreateOrderSheetRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export function createOrderSheetController(
  storage: Storage,
): OrderSheetController {
  return {
    create: (req, res, next) => {
      try {
        const { items }: CreateOrderSheetRequest = req.body;
        const cart = storage.getItemById<Cart>('cart', USER_ID) as Cart;

        items.forEach(({ productId }) => {
          if (!cart.hasItemByProductId(productId)) {
            throw new NotFoundError();
          }

          if (!storage.hasItemById('products', productId)) {
            throw new NotFoundError();
          }
        });

        const orderSheet = new OrderSheet(USER_ID, items);
        storage.addItemById('orderSheets', orderSheet.getId(), orderSheet);

        res.status(201).send({ id: orderSheet.getId() });
      } catch (err) {
        next(err);
      }
    },
  };
}
