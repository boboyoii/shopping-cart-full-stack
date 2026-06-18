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
  updateShippingArea: express.RequestHandler<{ id: string }>;
}

interface CreateOrderSheetRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

interface UpdateShippingAreaRequest {
  isRemoteShippingArea: boolean;
}

export function createOrderSheetController(
  storage: Storage,
): OrderSheetController {
  return {
    create: (req, res, next) => {
      try {
        const { items }: CreateOrderSheetRequest = req.body;
        const cart = storage.getItemById<Cart>('cart', USER_ID) as Cart;

        const orderItems = items.map(({ productId, quantity }) => {
          if (!cart.hasItemByProductId(productId)) {
            throw new NotFoundError();
          }

          const product = storage.getItemById<Product>('products', productId);

          if (!product) {
            throw new NotFoundError();
          }

          return {
            product: product.toObject(),
            quantity,
          };
        });

        const orderSheet = new OrderSheet(USER_ID, orderItems);
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

        const { userId, ...orderSheetData } = orderSheet.toObject();

        res.status(200).send({
          orderSheet: orderSheetData,
        });
      } catch (err) {
        next(err);
      }
    },
    updateShippingArea: (req, res, next) => {
      try {
        const { id } = req.params;
        const { isRemoteShippingArea }: UpdateShippingAreaRequest = req.body;
        const orderSheet = storage.getItemById<OrderSheet>('orderSheets', id);

        if (!orderSheet) {
          throw new NotFoundError();
        }

        orderSheet.updateShippingArea(isRemoteShippingArea);
        storage.updateItemById<OrderSheet>('orderSheets', id, orderSheet);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    },
  };
}
