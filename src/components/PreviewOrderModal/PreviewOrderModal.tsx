import { FC, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ClickAwayListener } from '@mui/material';
import { MappedProposalData } from '../../containers/ShopsPage/types';
import { ORDER_ROUTE } from '../../global/constants';
import closeIcon from '../../global/media/modal-close-icon.svg';
import styles from './PreviewOrderModal.module.scss';
import Button from '../Button';
import ProductCard from '../ProductCard';
import { ProductCardVariant } from '../ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import * as actions from '../../containers/OrderPage/actions';
import { orderPageInitialState } from '../../containers/OrderPage/reducer';

// import { PriceHelper } from '@global/helpers';

interface CheckoutModalProps {
  shopId: string;
  products: MappedProposalData[] | null;
  onClose: () => void;
}

const PreviewOrderModal: FC<CheckoutModalProps> = ({
  shopId,
  products,
  onClose,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (products) {
      dispatch(
        actions.setOrderData({
          ...orderPageInitialState.orderPage.order,
          shopId,
          products,
          phoneNumber: '',
        })
      );
      history.push(ORDER_ROUTE);
    }
  };

  const lackOfProductsRef = useRef<HTMLDivElement>(null);

  const isLackOfProducts = products?.find(
    ({ count, countDesired }) => count < countDesired
  );

  const totalPrice =
    products?.reduce((accum, item) => accum + item.price * item.count, 0) || 0;

  // const generalEconomy =
  //   products?.reduce(
  //     (accum, item) => accum + (item.price - item.servicePrice) * item.count,
  //     0,
  //   ) || 0;

  return (
    <>
      <div className={styles.modalBackground} />
      <ClickAwayListener onClickAway={onClose}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <button
              type="button"
              className={styles.closeModelBtn}
              onClick={onClose}
            >
              <img src={closeIcon} alt="Close modal" />
            </button>
          </div>
          <div className={styles.modalTitleContainer}>
            <h2 className={styles.modalTitle}>
              {t('PreviewOrderModal.TITLE')}
            </h2>
          </div>
          {isLackOfProducts && (
            <div
              className={styles.modalLackOfProductBannerContainer}
              ref={lackOfProductsRef}
            >
              <div className={styles.modalLackOfProductBanner}>
                <div className={styles.lackOfProductBannerImageContainer}>
                  <div className={styles.lackBannerImage} />
                </div>
                <div className={styles.lackOfProductBannerTextContainer}>
                  <p className={styles.lackOfProductBannerText}>
                    {t('PreviewOrderModal.LACK_OF_PRODUCTS')}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.modalListOfProductsContainer}
            // style={{
            //   maxHeight: `calc(100vh - ${
            //     238 +
            //     (lackOfProductsRef.current?.clientHeight || 0) +
            //     (isDesktopView ? 110 : 56) +
            //     (isMobileGChrome ? 56 : 0)
            //   }px)`,
            //   minHeight: `calc(100vh - ${
            //     238 +
            //     (lackOfProductsRef.current?.clientHeight || 0) +
            //     (isDesktopView ? 110 : 56) +
            //     (isMobileGChrome ? 56 : 0)
            //   }px)`,
            // }}
          >
            {products?.map((item) => (
              <div key={item.id} className={styles.card}>
                <ProductCard {...item} variant={ProductCardVariant.MODAL} />
              </div>
            ))}
          </div>
          <div className={styles.modalFooterContainer}>
            {products && (
              <div className={styles.footerTotalPriceEconomyContainer}>
                <div className={styles.footerTotalPriceContainer}>
                  <h3 className={styles.totalPriceText}>
                    {t('PreviewOrderModal.TOTAL_PRICE_TEXT')}
                  </h3>
                  <p className={styles.totalPriceValue}>
                    {totalPrice} {t('PreviewOrderModal.CURRENCY')}
                  </p>
                </div>
                {/*{generalEconomy > 0 && (*/}
                {/*  <div className={styles.footerEconomyContainer}>*/}
                {/*    {`Вы экономите ${PriceHelper.stripZeros(generalEconomy)}₸`}*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
            )}
            <Button
              onClick={handleButtonClick}
              text={t('PreviewOrderModal.CHECKOUT_BTN_TEXT')}
            />
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default PreviewOrderModal;
