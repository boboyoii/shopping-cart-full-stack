import styled from '@emotion/styled';
import PageLayout from './common/PageLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteCartItems,
  getCartItems,
  patchCartItemQuantity,
  type CartItemResponse,
} from './apis/cart';
import CartItem from './CartItem';
import Button from './common/Button';
import CheckBox from './common/CheckBox';
import Stepper from './common/Stepper';
import NoticeIcon from './Icons/NoticeIcon';
import type { OrderItem } from './OrderConfirmPage';
import OrderSummaryRow from './OrderSummaryRow';

const CartPage = () => {
  const navigate = useNavigate();
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

  const removeCartItem = async (productId: number) => {
    await deleteCartItems(productId);

    setCartItems((prevCartItems) =>
      prevCartItems.filter(({ product }) => product.id !== productId),
    );

    setSelectedProductIds((prevSelectedIds) =>
      prevSelectedIds.filter((id) => id !== productId),
    );
  };

  const updateCartItemQuantity = async (
    productId: number,
    quantity: number,
  ) => {
    const updatedCartItem = await patchCartItemQuantity(productId, quantity);

    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.product.id === updatedCartItem.productId
          ? { ...cartItem, quantity: updatedCartItem.quantity }
          : cartItem,
      ),
    );
  };

  const isCartEmpty = cartItems.length === 0;
  const isAllSelected =
    !isCartEmpty && selectedProductIds.length === cartItems.length;

  const orderAmount = cartItems
    .filter(({ product }) => selectedProductIds.includes(product.id))
    .reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0,
    );
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

  const moveToOrderConfirmPage = () => {
    const orderItems: OrderItem[] = cartItems
      .filter(({ product }) => selectedProductIds.includes(product.id))
      .map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity,
      }));

    navigate('/order-confirm', {
      state: {
        orderItems,
        shippingFee,
      },
    });
  };

  return (
    <PageLayout headerContent={<Logo>SHOP</Logo>}>
      <Title>장바구니</Title>

      {isCartEmpty ? (
        <EmptyCartState>장바구니에 담은 상품이 없습니다.</EmptyCartState>
      ) : (
        <>
          <CartItemsSection aria-label="장바구니 상품">
            <ItemCountDescription>
              현재 {cartItems.length}종류의 상품이 담겨있습니다.
            </ItemCountDescription>

            <SelectAllControl>
              <CheckBox
                checked={isAllSelected}
                label="전체선택"
                onToggle={toggleAllItemSelection}
              />
            </SelectAllControl>

            {cartItems.map(({ product, quantity }) => (
              <CartItemContainer key={product.id}>
                <ItemHeader>
                  <CheckBox
                    ariaLabel={`${product.name} 선택`}
                    checked={selectedProductIds.includes(product.id)}
                    onToggle={() => toggleItemSelection(product.id)}
                  />
                  <RemoveButton
                    type="button"
                    onClick={() => removeCartItem(product.id)}
                  >
                    삭제
                  </RemoveButton>
                </ItemHeader>

                <CartItem
                  name={product.name}
                  thumbnail={product.thumbnail}
                  price={product.price}
                >
                  <Stepper
                    value={quantity}
                    onChange={(nextQuantity) =>
                      updateCartItemQuantity(product.id, nextQuantity)
                    }
                  />
                </CartItem>
              </CartItemContainer>
            ))}

            <ShippingNotice>
              <NoticeIcon />총 주문 금액이 100,000원 이상일 경우 무료
              배송됩니다.
            </ShippingNotice>
          </CartItemsSection>

          <OrderSummarySection aria-label="주문 금액 요약">
            <OrderSummaryRow label="주문 금액" amount={orderAmount} />
            <OrderSummaryRow label="배송비" amount={shippingFee} />

            <SummaryDivider />
            <OrderSummaryRow label="총 결제 금액" amount={totalPaymentAmount} />
          </OrderSummarySection>
        </>
      )}

      <BottomButtonWrapper>
        <Button
          fullWidth
          disabled={selectedProductIds.length === 0}
          onClick={moveToOrderConfirmPage}
        >
          주문 확인
        </Button>
      </BottomButtonWrapper>
    </PageLayout>
  );
};

const Logo = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: 1.25rem;
  color: #ffffff;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
`;

const CartItemsSection = styled.section``;

const ItemCountDescription = styled.p`
  margin: 0.5rem 0;
  font-weight: 500;
  font-size: 0.75rem;
`;

const SelectAllControl = styled.div`
  padding-block: 0.75rem;
`;

const ShippingNotice = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.5rem 0;
  font-weight: 500;
  font-size: 0.75rem;
`;

const EmptyCartState = styled.p`
  min-height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  font-weight: 400;
  font-size: 1rem;
`;

const CartItemContainer = styled.div`
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

const OrderSummarySection = styled.section`
  margin-top: 0.75rem;
  border-top: 1px solid #0000001a;
`;

const SummaryDivider = styled.hr`
  height: 1px;
  margin: 0.75rem 0;
  border: 0;
  background-color: #0000001a;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 26rem;
  transform: translateX(-50%);
  z-index: 100;
`;

export default CartPage;
