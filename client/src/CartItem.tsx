import styled from '@emotion/styled';

interface CartItemProps {
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

const CartItem = ({ name, thumbnail, price, quantity }: CartItemProps) => {
  return (
    <ItemWrapper>
      <ItemHeader>
        <SelectCheckbox type="checkbox" aria-label={`${name} 선택`} />
        <RemoveButton type="button">삭제</RemoveButton>
      </ItemHeader>

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
    </ItemWrapper>
  );
};

const ItemWrapper = styled.article`
  padding-block: 0.75rem;
  border-top: 1px solid #0000001a;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectCheckbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #0000001a;
  border-radius: 0.5rem;
  margin: 0;
  accent-color: #000000;
`;

const RemoveButton = styled.button`
  padding: 0.3rem 0.55rem;
  border: 1px solid #0000001a;
  border-radius: 0.25rem;
  background-color: #ffffff;
  font-size: 0.625rem;
`;

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
