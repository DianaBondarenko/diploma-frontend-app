import { useTranslation } from 'react-i18next';
import * as Styled from './ProductsTable.styles';
import { OrderTableProductData } from '../../../../containers/OrdersPage/types';
import ProductsTableRow from './components/ProductsTableRow';

interface ProductsTableProps {
  products: OrderTableProductData[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const { t } = useTranslation();

  const TableHeader = (
    <thead>
      <Styled.ProductsTableHeaderRow>
        <th className="table__header-cell item-number">
          {t('OrdersPage.OrderDetailedModal.ProductsTable.headerTitles.NUM')}
        </th>
        <th className="table__header-cell product-info">
          {t(
            'OrdersPage.OrderDetailedModal.ProductsTable.headerTitles.PRODUCT_INFO'
          )}
        </th>
        <th className="table__header-cell vendor-code">
          {t(
            'OrdersPage.OrderDetailedModal.ProductsTable.headerTitles.VENDOR_CODE'
          )}
        </th>
        <th className="table__header-cell quantity">
          {t(
            'OrdersPage.OrderDetailedModal.ProductsTable.headerTitles.QUANTITY'
          )}
        </th>
        <th className="table__header-cell amount">
          {t(
            'OrdersPage.OrderDetailedModal.ProductsTable.headerTitles.TOTAL_AMOUNT'
          )}
        </th>
      </Styled.ProductsTableHeaderRow>
    </thead>
  );

  return (
    <Styled.ProductsTableContainer>
      {TableHeader}
      <tbody>
        {products.map((product, index) => (
          <ProductsTableRow
            key={product.sku}
            data={product}
            itemIndex={index + 1}
          />
        ))}
      </tbody>
    </Styled.ProductsTableContainer>
  );
};

export default ProductsTable;
