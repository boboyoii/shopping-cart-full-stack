export interface OrderSheetItem {
  productId: string;
  quantity: number;
}

export interface OrderSheetType {
  id: string;
  userId: string;
  items: OrderSheetItem[];
  selectedCoupons: string[];
  isRemoteShippingArea: boolean;
}

class OrderSheet {
  #id: string;
  #userId: string;
  #items: OrderSheetItem[];
  #selectedCoupons: string[];
  #isRemoteShippingArea: boolean;

  constructor(userId: string, items: OrderSheetItem[]) {
    this.#id = crypto.randomUUID();
    this.#userId = userId;
    this.#items = items;
    this.#selectedCoupons = [];
    this.#isRemoteShippingArea = false;
  }

  getId() {
    return this.#id;
  }

  toObject(): OrderSheetType {
    return {
      id: this.#id,
      userId: this.#userId,
      items: this.#items,
      selectedCoupons: this.#selectedCoupons,
      isRemoteShippingArea: this.#isRemoteShippingArea,
    };
  }
}

export default OrderSheet;
