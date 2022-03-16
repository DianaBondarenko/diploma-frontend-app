import * as Styled from './ProductsTableRow.styles';
import { OrderTableProductData } from '../../../../../../containers/OrdersPage/types';

interface ProductsTableRowProps {
  data: OrderTableProductData;
  itemIndex: number;
}

const ProductsTableRow = ({ data, itemIndex }: ProductsTableRowProps) => {
  return (
    <Styled.ProductsTableRow>
      <td>{itemIndex}</td>
      <td>Test</td>
      <td>{data.vendorCode || '-'}</td>
      <td>{`${data.quantity} шт.`}</td>
      <td>{data.amount}</td>
    </Styled.ProductsTableRow>
  );
};

export default ProductsTableRow;
