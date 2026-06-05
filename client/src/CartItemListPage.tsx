import styled from '@emotion/styled';
import PageLayout from './common/PageLayout';
import { useEffect, useState } from 'react';
import { getCartItems, type CartItemResponse } from './apis/cart';
import CartItem from './CartItem';
import CheckBox from './common/CheckBox';
import NoticeIcon from './Icons/NoticeIcon';

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

  const orderAmount = cartItems.reduce((total, { product, quantity }) => {
    if (selectedProductIds.includes(product.id)) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);
  const shippingFee = orderAmount >= 100000 ? 0 : 3000;
  const totalPaymentAmount = orderAmount + shippingFee;

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
        <ItemWrapper key={product.id}>
          <ItemHeader>
            <CheckBox
              checked={selectedProductIds.includes(product.id)}
              onToggle={() => toggleItemSelection(product.id)}
            />
            <RemoveButton type="button">삭제</RemoveButton>
          </ItemHeader>

          <CartItem
            name={product.name}
            thumbnail={product.thumbnail}
            price={product.price}
            quantity={quantity}
          />
        </ItemWrapper>
      ))}

      <PageDescription>
        <NoticeIcon />총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </PageDescription>

      <SummaryDivider />

      <SummaryRow>
        <SummaryLabel>주문 금액</SummaryLabel>
        <SummaryValue>{orderAmount.toLocaleString()}원</SummaryValue>
      </SummaryRow>

      <SummaryRow>
        <SummaryLabel>배송비</SummaryLabel>
        <SummaryValue>{shippingFee.toLocaleString()}원</SummaryValue>
      </SummaryRow>

      <SummaryDivider />

      <SummaryRow>
        <SummaryLabel>총 결제 금액</SummaryLabel>
        <SummaryValue>{totalPaymentAmount.toLocaleString()}원</SummaryValue>
      </SummaryRow>
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
  display: flex;
  align-items: center;
  gap: 0.25rem;

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

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0 0;
`;

const SummaryLabel = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const SummaryValue = styled.strong`
  font-weight: 700;
  font-style: Bold;
  font-size: 1.5rem;
`;

const SummaryDivider = styled.hr`
  height: 1px;
  margin: 0.75rem 0;
  border: 0;
  background-color: #0000001a;
`;

export default CartItemListPage;
