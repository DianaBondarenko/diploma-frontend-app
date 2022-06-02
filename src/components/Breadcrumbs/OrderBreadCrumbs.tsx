import { useTranslation } from 'react-i18next';
import { CART_ROUTE, HOME_ROUTE, SHOPS_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

const OrderBreadCrumbs = () => {
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
      label: t('BreadCrumbs.FIND_IN_PHARMACIES'),
      route: SHOPS_ROUTE,
    },
    {
      label: t('BreadCrumbs.CREATING_ORDER'),
      route: null,
    },
  ];

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
};

export default OrderBreadCrumbs;
