import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import { USER_ID } from "./constanst.js";
import OrderSheet from "./models/OrderSheet.js";

export const INITIAL_DATA = {
  products: new Map<string, Product>(),
  cart: new Map<string, Cart>([[USER_ID, new Cart()]]),
  orderSheets: new Map<string, OrderSheet>(),
};
