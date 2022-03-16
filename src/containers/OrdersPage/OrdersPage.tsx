import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Styled from './OrdersPage.styles';
import * as actions from './actions';
import { selectors } from './reducer';
import Loader from '../../components/Loader';
import OrdersTable from './components/OrdersTable';
import useRefresh from '../../global/hooks/useRefresh';

const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.ordersPageLoading);
  const data = useSelector(selectors.ordersPageData);

  useEffect(() => {
    dispatch(actions.getOrders.request());
  }, [dispatch]);

  useRefresh(() => {
    dispatch(actions.getOrdersRefresh.request());
  }, [dispatch]);

  return (
    <>
      <Styled.OrdersPageContainer>
        <Styled.OrdersPageTitle>{t('OrdersPage.TITLE')}</Styled.OrdersPageTitle>
        {data && (
          <Styled.OrdersPageTableContainer>
            <OrdersTable data={data} />
          </Styled.OrdersPageTableContainer>
        )}
      </Styled.OrdersPageContainer>
      {loading && <Loader />}
    </>
  );
};

export default OrdersPage;
