import { useTranslation } from 'react-i18next';
import { HOME_ROUTE } from '../../global/constants';
import BreadCrumbs from './BreadCrumbs';

interface ProductsBreadCrumbsProps {
  categoryName?: string | null;
}

const ProductsBreadCrumbs = ({ categoryName }: ProductsBreadCrumbsProps) => {
  const { t } = useTranslation();

  const breadCrumbs = [
    {
      label: t('BreadCrumbs.HOME'),
      route: HOME_ROUTE,
    },
    {
      label: categoryName ? categoryName : t('BreadCrumbs.RESULT_OF_SEARCH'),
      route: null,
    },
  ];

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
};

export default ProductsBreadCrumbs;
