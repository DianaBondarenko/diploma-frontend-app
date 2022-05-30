import { useEffect, useState } from 'react';
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
import Map from '../../components/Map';
import { ProductData } from '../ProductsPage/types';
import { MappedProposalData, MappedShopData, ProposalData } from './types';
import { Coordinate } from '../../global/types';
import PreviewOrderModal from '../../components/PreviewOrderModal';

const ShopsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.shopsPageLoading);
  const shopsData = useSelector(selectors.shopsPageData);

  const products = useSelector(cartSelectors.cartPageProducts);

  const [activeShop, setActiveShop] = useState<MappedShopData | null>(null);
  const [chosenShop, setChosenShop] = useState<MappedShopData | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);

  useEffect(() => {
    dispatch(actions.getShopsProposals.request(products));
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handleShopClick = (item: any) => {
    setActiveShop(item);
  };

  const getTotalPrice = (productData: MappedProposalData[] | null) => {
    return (
      productData?.reduce((prev, cur) => prev + cur.price * cur.count, 0) || 0
    );
  };

  const getTotalCount = (
    productData: MappedProposalData[] | null,
    count: 'count' | 'countDesired'
  ) => {
    return productData?.reduce((prev, cur) => prev + cur[count], 0) || 0;
  };

  const handleProductsModal = (chosenShop: MappedShopData) => {
    setChosenShop(chosenShop);
  };

  const shopsPlaceMarkInfo = shopsData
    ? shopsData.map((shop) => ({
        ...shop,
        totalCount: getTotalCount(shop.proposal, 'count'),
        totalCountDesired: getTotalCount(shop.proposal, 'countDesired'),
      }))
    : null;

  const pageContent = (
    <div className={styles.shopsContentContainer}>
      <div className={styles.shopsContent}>
        <div className={styles.leftBlock}>
          <div className={styles.title}>{t('ShopsPage.TITLE_TEXT')}</div>
          {shopsData && (
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
              <div className={styles.shopsCount}>
                {getProposalsCount(shopsData.length)}
              </div>
              <div className={styles.cards}>
                {shopsData.map((shop) => (
                  <div
                    className={styles.card}
                    key={shop.name}
                    onClick={() => handleShopClick(shop)}
                  >
                    <ShopCard
                      {...shop}
                      price={getTotalPrice(shop.proposal)}
                      count={getTotalCount(shop.proposal, 'count')}
                      countDesired={getTotalCount(
                        shop.proposal,
                        'countDesired'
                      )}
                      onShopChoice={() => {
                        console.log('choice');
                        handleProductsModal(shop);
                      }}
                      // onCheckout={() => {}}
                      isSelected={shop.id === activeShop?.id}
                    />
                    <div className={styles.cardDivider} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={styles.map}>
          <Map
            shopsData={shopsPlaceMarkInfo}
            userLocation={userLocation}
            activeShop={activeShop}
          />
        </div>
      </div>
      {chosenShop && (
        <PreviewOrderModal
          shopId={chosenShop.id}
          products={chosenShop.proposal}
          onClose={() => setChosenShop(null)}
        />
      )}
    </div>
  );

  return <div>{loading ? <Loader /> : pageContent}</div>;
};

export default ShopsPage;
