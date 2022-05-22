import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as actions from './actions';
import { selectors } from './reducer';
import { selectors as cartSelectors } from '../CartPage/reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './ShopsPage.module.scss';
import Loader from '../../components/Loader';

const ShopsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);

  const loading = useSelector(selectors.shopsPageLoading);
  const data = useSelector(selectors.shopsPageData);

  const products = useSelector(cartSelectors.cartPageProducts);

  useEffect(() => {
    dispatch(actions.getShopsProposals.request(products));
  }, [dispatch]);

  const pageContent = <>Shops</>;

  return (
    <div className={styles.main}>
      <div className={styles.breadCrumbs} />
      {loading ? <Loader /> : pageContent}
    </div>
  );
};

export default ShopsPage;
