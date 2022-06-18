import { useTranslation } from 'react-i18next';
import { CART_ROUTE, HOME_ROUTE, PRODUCTS_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

interface ProductBreadCrumbsProps {
  productName: string;
  isFromCart: boolean;
}

const ProductBreadCrumbs = ({
  productName,
  isFromCart,
}: ProductBreadCrumbsProps) => {
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
      label: isFromCart
        ? t('BreadCrumbs.CART')
        : t('BreadCrumbs.RESULT_OF_SEARCH'),
      route: isFromCart
        ? CART_ROUTE
        : searchValue
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
