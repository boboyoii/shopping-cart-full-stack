import styled from '@emotion/styled';
import PageLayout from './common/PageLayout';
import { useEffect, useState } from 'react';
import { getCartItems, type CartItemResponse } from './apis/cart';
import CartItem from './CartItem';
import CheckBox from './common/CheckBox';

const CartItemListPage = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getCartItems();

      setCartItems(items);
      setSelectedProductIds(items.map((item) => item.product.id));
    };

    loadCartItems();
  }, []);

  const isAllSelected =
    cartItems.length > 0 && selectedProductIds.length === cartItems.length;

  const toggleItemSelection = (productId: number) => {
    setSelectedProductIds((prevSelectedIds) =>
      prevSelectedIds.includes(productId)
        ? prevSelectedIds.filter((id) => id !== productId)
        : [...prevSelectedIds, productId],
    );
  };

  const toggleAllItemSelection = () => {
    if (isAllSelected) return setSelectedProductIds([]);
    setSelectedProductIds(cartItems.map((item) => item.product.id));
  };

  return (
    <PageLayout headerContent={<Logo>SHOP</Logo>}>
      <PageTitle>장바구니</PageTitle>
      <PageDescription>
        현재 {cartItems.length}종류의 상품이 담겨있습니다.
      </PageDescription>

      <CheckBox checked={isAllSelected} onToggle={toggleAllItemSelection} />

      {cartItems.map(({ product, quantity }) => (
        <ItemWrapper>
          <ItemHeader>
            <CheckBox
              checked={selectedProductIds.includes(product.id)}
              onToggle={() => toggleItemSelection(product.id)}
            />
            <RemoveButton type="button">삭제</RemoveButton>
          </ItemHeader>

          <CartItem
            key={product.id}
            name={product.name}
            thumbnail={product.thumbnail}
            price={product.price}
            quantity={quantity}
          />
        </ItemWrapper>
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

const ItemWrapper = styled.article`
  padding-block: 0.75rem;
  border-top: 1px solid #0000001a;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  padding: 0.3rem 0.55rem;
  border: 1px solid #0000001a;
  border-radius: 0.25rem;
  background-color: #ffffff;
  font-size: 0.625rem;
`;

export default CartItemListPage;
