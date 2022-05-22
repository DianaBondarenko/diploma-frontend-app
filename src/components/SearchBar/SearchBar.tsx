import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.scss';
import searchIcon from '../../global/media/search.svg';
import { PRODUCTS_ROUTE } from '../../global/constants';

interface ProductsSearchProps {
  value: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestionsList: {
    [key: string]: string[];
  } | null;
  onSuggestionsClose: () => void;
  isSuggestionListOpen: boolean;
  onInputClick?: () => void;
  onSearchClear: () => void;
}

/**
 * Products search component for Main page
 */
const SearchBar = ({
  value,
  onSearch,
  suggestionsList,
  onSuggestionsClose,
  isSuggestionListOpen,
  onInputClick,
  onSearchClear,
}: ProductsSearchProps) => {
  // const isDesktop = useDesktopSize();
  // const router = useRouter();
  const history = useHistory();
  const { t } = useTranslation();

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const goToProductsPage = () =>
    history.push(`${PRODUCTS_ROUTE}?search=${value}`);

  return (
    <div className={styles.productsSearchWrapper}>
      <ClickAwayListener
        onClickAway={() => {
          onSuggestionsClose();
          setIsSearchActive(false);
        }}
      >
        <div
          onClick={() => {
            onInputClick && onInputClick();
            setIsSearchActive(true);
          }}
          className={styles.productsSearchInputWrapper}
        >
          <div
            className={`${styles.productsSearchInput} ${
              isSearchActive && styles.productsSearchInputActive
            }`}
          >
            <input
              placeholder={t('SearchBar.SEARCH_PLACEHOLDER')}
              value={value}
              onChange={onSearch}
              type="text"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && value) {
                  goToProductsPage();
                }
              }}
            />
            {value.length ? (
              <button
                onClick={onSearchClear}
                className={styles.productSearchClearBtn}
              >
                {t('SearchBar.SEARCH_CLEAR_BTN')}
              </button>
            ) : null}
            {/* {isSuggestionListOpen && suggestionsList && ( */}
            {/*  <SuggestionsList suggestionsList={suggestionsList} searchValue={value} /> */}
            {/* )} */}
          </div>
          <button
            className={styles.productsSearchBtn}
            // onClick={() =>  {}}
            onClick={goToProductsPage}
            // onClick={() => value && router.push(`/products?search=${value}`)}
          >
            <img src={searchIcon} alt="search icon" />
          </button>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
