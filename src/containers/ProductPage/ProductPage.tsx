import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import ProductBreadCrumbs from '../../components/Breadcrumbs/ProductBreadCrumbs';

const ProductPage = ({ match }: RouteComponentProps) => {
  const { t } = useTranslation();
  console.log(match.params);

  return (
    <>
      <ProductBreadCrumbs productName="Product name" />
      Product
    </>
  );
};

export default ProductPage;
