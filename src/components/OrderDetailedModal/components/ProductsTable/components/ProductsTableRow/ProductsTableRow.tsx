import { useTranslation } from 'react-i18next';
import * as Styled from './ProductsTableRow.styles';
import { OrderTableProductData } from '../../../../../../containers/OrdersPage/types';

interface ProductsTableRowProps {
  data: OrderTableProductData;
  itemIndex: number;
}

const ProductsTableRow = ({ data, itemIndex }: ProductsTableRowProps) => {
  const { t } = useTranslation();

  return (
    <Styled.ProductsTableRow>
      <td className="table-cell item-number">{itemIndex}</td>
      <td className="table-cell table-cell__info">
        <div className="name">{data.name}</div>
        <div className="packing">{data.packing}</div>
        <div className="manufacturer">{data.manufacturer}</div>
        {data.needsRecipe && (
          <div className="needs-recipe">
            {t('OrdersPage.OrderDetailedModal.ProductsTable.NEEDS_RECIPE')}
          </div>
        )}
      </td>
      <td className="table-cell">{data.vendorCode || '-'}</td>
      <td className="table-cell">{`${data.quantity} шт.`}</td>
      <td className="table-cell">{data.amount}</td>
    </Styled.ProductsTableRow>
  );
};

export default ProductsTableRow;
