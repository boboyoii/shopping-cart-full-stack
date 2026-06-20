export interface OrderSheetRequestItem {
  productId: string;
  quantity: number;
}

interface CreateOrderSheetResponse {
  id: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const createOrderSheet = async (
  items: OrderSheetRequestItem[],
): Promise<CreateOrderSheetResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/order-sheets/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error('주문 정보를 준비하지 못했습니다. 다시 시도해 주세요.');
  }

  return response.json();
};
