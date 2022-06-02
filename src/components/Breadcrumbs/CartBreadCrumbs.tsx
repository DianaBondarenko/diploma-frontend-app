import { useTranslation } from 'react-i18next';
import { HOME_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

const CartBreadCrumbs = () => {
  const { t } = useTranslation();

  const breadCrumbs = [
    {
      label: t('BreadCrumbs.HOME'),
      route: HOME_ROUTE,
    },
    {
      label: t('BreadCrumbs.CART'),
      route: null,
    },
  ];

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
};

export default CartBreadCrumbs;
