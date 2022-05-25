import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

const ProductPage = ({ match }: RouteComponentProps) => {
  const { t } = useTranslation();
  console.log(match.params);

  return <>Product</>;
};

export default ProductPage;
