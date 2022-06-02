import { useTranslation } from 'react-i18next';
import { CART_ROUTE, HOME_ROUTE, SHOPS_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

const ShopsBreadCrumbs = () => {
  const { t } = useTranslation();

  const breadCrumbs = [
    {
      label: t('BreadCrumbs.HOME'),
      route: HOME_ROUTE,
    },
    {
      label: t('BreadCrumbs.CART'),
      route: CART_ROUTE,
    },
    {
      label: t('BreadCrumbs.SEARCH_IN_PHARMACIES'),
      route: SHOPS_ROUTE,
    },
  ];

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
};

export default ShopsBreadCrumbs;
