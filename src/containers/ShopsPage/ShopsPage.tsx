import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as actions from './actions';
import { selectors } from './reducer';
import { selectors as cartSelectors } from '../CartPage/reducer';
import { getProductsCount, getProposalsCount } from '../../global/helpers';
import styles from './ShopsPage.module.scss';
import Loader from '../../components/Loader';
import ShopCard from '../../components/ShopCard';
import { ILayoutProps } from '../../components/DefaultLayout/types';

const ShopsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.shopsPageLoading);
  const data = useSelector(selectors.shopsPageData);

  const products = useSelector(cartSelectors.cartPageProducts);

  useEffect(() => {
    dispatch(actions.getShopsProposals.request(products));
  }, [dispatch]);

  const handleShopClick = (item: any) => {
    // setActiveShop(item);
  };

  const pageContent = (
    <div className={styles.pharmaciesContentContainer}>
        <div className={styles.pharmaciesContent}>
          <div className={styles.leftBlock}>
            <div className={styles.title}>{t('ShopsPage.TITLE_TEXT')}</div>
            {data && (
              <>
                {/* <FilterSortOptions */}
                {/*    isAscendingOption={isAscendingOption} */}
                {/*    onSortingDirectionChange={handleSortingDirectionChange} */}
                {/*    selectedSortOption={selectedSortOption} */}
                {/*    isPopoverShow={isSortPopoverShow} */}
                {/*    onSortOptionChange={handleSortOptionChange} */}
                {/*    onPopoverOpen={handleSortPopoverOpen} */}
                {/*    onPopoverClose={handleSortPopoverClose} */}
                {/*    filterByAvailability={filterByAvailability} */}
                {/*    onFilterByAvailabilityChange={handleFilterByAvailabilityChange} */}
                {/* /> */}
                <div className={styles.pharmaciesCount}>
                  {getProposalsCount(data.length)}
                </div>
                <div className={styles.cards}>
                  {data.map((item) => (
                    <div
                      className={styles.card}
                      key={item.name}
                      // onClick={() => handleShopClick(getMapInfo([item])[0])}
                    >
                      <ShopCard
                        {...item}
                        // onCheckout={handleCheckoutMedicines}
                        onCheckout={() => {}}
                        isSelected={false}
                        // isSelected={isPharmacySelected(getMapInfo([item])[0])}
                      />
                      <div className={styles.cardDivider} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={styles.map}>
            {/* <Map */}
            {/*    activePlaceMark={activePharmacy} */}
            {/*    userLocation={userLocation && [userLocation.lat, userLocation.lng]} */}
            {/*    zoom={mapZoom} */}
            {/*    placeMarksInfo={placeMarksInfo} */}
            {/* /> */}
          </div>
        </div>
      </div>
  );

  return (
    <div className={styles.main}>
      <div className={styles.breadCrumbs} />
      {loading ? <Loader /> : pageContent}
    </div>
  );
};

const ShopsPageLayout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.pharmaciesContentContainer}>
      <div className={styles.pharmaciesContent}>{children}</div>
    </div>
  );
};

ShopsPage.Layout = ShopsPageLayout;

export default ShopsPage;
