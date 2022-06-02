import { useTranslation } from 'react-i18next';
import { HOME_ROUTE, PRODUCTS_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

interface ProductBreadCrumbsProps {
  productName: string;
}

const ProductBreadCrumbs = ({ productName }: ProductBreadCrumbsProps) => {
  const { t } = useTranslation();
  const searchValue = 'sessionStorageSearchValue';
  const categoryValue = {
    id: '123',
    name: 'category',
  };

  const breadCrumbs = [
    {
      label: t('BreadCrumbs.HOME'),
      route: HOME_ROUTE,
    },
    {
      label: t('BreadCrumbs.RESULT_OF_SEARCH'),
      route: searchValue
        ? `${PRODUCTS_ROUTE}?search=${searchValue}`
        : `${PRODUCTS_ROUTE}?categoryId=${categoryValue.id}&categoryName=${categoryValue.name}`,
    },
    {
      label: productName,
      route: null,
    },
  ];

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
};

export default ProductBreadCrumbs;
