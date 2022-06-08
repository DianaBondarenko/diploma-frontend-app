import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClickAwayListener } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { MappedCategoryData } from './types';
import * as actions from './actions';
import { selectors } from './reducer';
import { PRODUCTS_ROUTE } from '../../global/constants';
import { capitalizeFirstLetter, sortByAlphabet } from '../../global/helpers';
import { ReactComponent as ArrowBackIcon } from '../../global/media/arrow-back.svg';
import closeIcon from '../../global/media/close-dark.svg';
import styles from './CatalogModal.module.scss';

interface CatalogModalProps {
  onModalClose: () => void;
}

const CatalogModal = ({ onModalClose }: CatalogModalProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector(selectors.categoriesPageLoading);
  const data = useSelector(selectors.categoriesPageData) || [];

  const [currentCategoriesData, setCurrentCategoriesData] = useState<
    MappedCategoryData[]
  >([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const DISPLAYED_CATEGORIES_COUNT = 8;

  const getChildrenCategories = (parentId: string | null) => {
    return data.filter((el) => el.parentId === parentId);
  };

  const getPreviousCategory = (currentId: string | null) => {
    return data.find((el) => el.id === currentId)?.parentId || null;
  };

  useEffect(() => {
    dispatch(actions.getCategories.request());
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      setCurrentCategoriesData(getChildrenCategories(null));
    }
    // eslint-disable-next-line
  }, [setCurrentCategoriesData, data]);

  const currentCategoryId = currentCategoriesData[0]?.parentId;
  const isRootCategory = currentCategoryId ? currentCategoryId === null : true;

  const handleCategorySelection = (
    categoryId: string,
    categoryName: string
  ) => {
    const childrenCategories = getChildrenCategories(categoryId);
    if (childrenCategories.length) {
      setCurrentCategoriesData(childrenCategories);
      return;
    }
    onModalClose();
    history.push(
      `${PRODUCTS_ROUTE}?categoryId=${categoryId}&categoryName=${categoryName}`
    );
  };

  const handleBackClick = () => {
    setShowAll(false);
    const previousCategory = getPreviousCategory(currentCategoryId);
    setCurrentCategoriesData(getChildrenCategories(previousCategory));
  };

  const renderCategories = () => {
    const displayedData = showAll
      ? currentCategoriesData
      : currentCategoriesData?.slice(0, DISPLAYED_CATEGORIES_COUNT);
    return displayedData.sort(sortByAlphabet).map((el) => (
      <div
        className={styles.categoriesItem}
        key={el.id}
        onClick={() => handleCategorySelection(el.id, el.name)}
      >
        {capitalizeFirstLetter(el.name)}
      </div>
    ));
  };

  return (
    <>
      <div className={styles.modalBackground} />
      <ClickAwayListener onClickAway={onModalClose}>
        <div className={styles.modalContainer}>
          <div
            className={`${styles.modalHeader} ${
              isRootCategory && styles.reversedRow
            }`}
          >
            {isRootCategory ? (
              <button
                type="button"
                className={styles.closeModalBtn}
                onClick={onModalClose}
              >
                <img src={closeIcon} alt="Close modal" />
              </button>
            ) : (
              <div className={styles.backContainer} onClick={handleBackClick}>
                <ArrowBackIcon />
                <div className={styles.backText}>{t('CatalogPage.BACK')}</div>
              </div>
            )}
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>
              {t('CatalogPage.HEADER_TEXT')}
            </div>
            {loading ? (
              <div className={styles.loader}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <div className={styles.categoriesContainer}>
                  {renderCategories()}
                </div>
                {currentCategoriesData.length > DISPLAYED_CATEGORIES_COUNT &&
                  !showAll && (
                    <div
                      className={styles.showAll}
                      onClick={() => setShowAll(true)}
                    >
                      {t('CatalogPage.SHOW_ALL')}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CatalogModal;
