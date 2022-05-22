import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as actions from './actions';
import { selectors } from './reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './ProductsPage.module.scss';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';
import { ProductCardVariant } from '../../components/ProductCard/ProductCard';

const ProductsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);
  const searchValue = params.get('search');
  const categoryId = params.get('categoryId');
  const categoryName = params.get('categoryName');

  const loading = useSelector(selectors.productsPageLoading);
  const data = useSelector(selectors.productsPageData);

  useEffect(() => {
    dispatch(actions.getProductsBySearchValue.request(searchValue));
  }, [dispatch]);

  const pageContent = (
    <>
      {data && (
        <>
          <div className={styles.topBlock}>
            <div className={styles.header}>
              <div className={styles.headerText}>
                {searchValue ? (
                  <>
                    {data.length
                      ? t('ProductsPage.TITLE_TEXT')
                      : t('ProductsPage.NOTHING_FOUND')}{' '}
                    <br />“{searchValue}”
                  </>
                ) : (
                  <>
                    {categoryId && categoryName && (
                      <>
                        {!data.length &&
                          t('ProductsPage.NOTHING_FOUND_IN_CATEGORY')}{' '}
                        {categoryName}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className={styles.subheaderText}>
                {getProductsCount(data.length)}{' '}
                {t('ProductsPage.SUBTITLE_TEXT')}
              </div>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            {data.map((product) => (
              <div key={product.id} className={styles.card}>
                <ProductCard variant={ProductCardVariant.SEARCH} {...product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={styles.main}>
      <div className={styles.breadCrumbs} />
      {loading ? <Loader /> : pageContent}
    </div>
  );
};

export default ProductsPage;
