import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as actions from './actions';
import { selectors } from './reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './CartPage.module.scss';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';

const CartPage = () => {
  const { t } = useTranslation();

  return <>Cart</>;
};

export default CartPage;
