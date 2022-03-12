import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Styled from './OrdersPage.styles';
import * as actions from './actions';
import { selectors } from './reducer';
import Loader from '../../components/Loader';

const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.ordersPageLoading);

  useEffect(() => {
    dispatch(actions.getOrders.request());
  }, [dispatch]);

  return (
    <>
      <Styled.OrdersPageContainer>
        <Styled.OrdersPageTitle>{t('OrdersPage.TITLE')}</Styled.OrdersPageTitle>
      </Styled.OrdersPageContainer>
      {loading && <Loader />}
    </>
  );
};

export default OrdersPage;
