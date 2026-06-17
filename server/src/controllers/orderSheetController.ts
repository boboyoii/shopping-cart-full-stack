import express from 'express';

import { USER_ID } from '../constanst.js';
import { NotFoundError } from '../errors.js';
import Cart from '../models/Cart.js';
import { Storage } from '../storages/Storage.js';
import OrderSheet from '../models/OrderSheet.js';
import Product from '../models/Product.js';

export interface OrderSheetController {
  create: express.RequestHandler;
  get: express.RequestHandler<{ id: string }>;
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
    get: (req, res, next) => {
      try {
        const { id } = req.params;
        const orderSheet = storage.getItemById<OrderSheet>('orderSheets', id);

        if (!orderSheet) {
          throw new NotFoundError();
        }

        const {
          userId,
          items: orderItems,
          ...orderSheetData
        } = orderSheet.toObject();
        const items = orderItems.map(({ productId, quantity }) => {
          const product = storage.getItemById<Product>('products', productId);

          if (!product) {
            throw new NotFoundError();
          }

          return {
            product: product.toObject(),
            quantity,
          };
        });

        res.status(200).send({
          orderSheet: {
            ...orderSheetData,
            items,
          },
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
