import { useEffect, useState } from 'react';
import { getOrderSheet, type OrderSheet } from '../../apis/orderSheet';

export const useOrderSheet = (orderSheetId: string | undefined) => {
  const [orderSheet, setOrderSheet] = useState<OrderSheet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!orderSheetId) return;

    const fetchOrderSheet = async () => {
      try {
        const fetchedOrderSheet = await getOrderSheet(orderSheetId);

        setOrderSheet(fetchedOrderSheet);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error('주문 목록을 불러오지 못했습니다.'),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderSheet();
  }, [orderSheetId]);

  return { orderSheet, isLoading, error };
};
