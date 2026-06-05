import styled from '@emotion/styled';
import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { getCartItems, type CartItemResponse } from './apis/cart';
import CartItem from './CartItem';

const CartItemListPage = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getCartItems();

      setCartItems(items);
    };

    loadCartItems();
  }, []);

  return (
    <PageLayout headerContent={<Logo>SHOP</Logo>}>
      <PageTitle>장바구니</PageTitle>
      <PageDescription>
        현재 {cartItems.length}종류의 상품이 담겨있습니다.
      </PageDescription>

      {cartItems.map(({ product, quantity }) => (
        <CartItem
          key={product.id}
          name={product.name}
          thumbnail={product.thumbnail}
          price={product.price}
          quantity={quantity}
        />
      ))}
    </PageLayout>
  );
};

const Logo = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: 1.25rem;
  color: #ffffff;
`;

const PageTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
`;

const PageDescription = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  margin: 0.5rem 0;
`;

export default CartItemListPage;
