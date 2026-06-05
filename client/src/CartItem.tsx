import styled from '@emotion/styled';

interface CartItemProps {
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

const CartItem = ({ name, thumbnail, price, quantity }: CartItemProps) => {
  return (
    <Content>
      <Thumbnail src={thumbnail} alt={name} />

      <ProductInfo>
        <Name>{name}</Name>
        <Price>{price.toLocaleString()}원</Price>

        <QuantityControl>
          <QuantityButton type="button">-</QuantityButton>
          <Quantity>{quantity}</Quantity>
          <QuantityButton type="button">+</QuantityButton>
        </QuantityControl>
      </ProductInfo>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  gap: 1.4rem;
  margin-top: 0.75rem;
`;

const Thumbnail = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 0.5rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Price = styled.strong`
  margin-top: 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const QuantityButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #0000001a;
  border-radius: 0.5rem;
  background-color: #ffffff;
`;

const Quantity = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
`;

export default CartItem;
