import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.scss';
import searchIcon from '../../global/media/search.svg';
import { PRODUCTS_ROUTE } from '../../global/constants';

interface ProductsSearchProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar = ({ value, setValue }: ProductsSearchProps) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearchClear = () => {
    setValue('');
  };

  const goToProductsPage = () => {
    if (value.length) {
      history.push(`${PRODUCTS_ROUTE}?search=${value}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <ClickAwayListener
        onClickAway={() => {
          setIsSearchActive(false);
        }}
      >
        <div
          onClick={() => {
            setIsSearchActive(true);
          }}
          className={styles.searchInputContainer}
        >
          <div
            className={`${styles.searchInput} ${
              isSearchActive && styles.searchInputActive
            }`}
          >
            <input
              placeholder={t('SearchBar.SEARCH_PLACEHOLDER')}
              value={value}
              onChange={handleSearch}
              type="text"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && value) {
                  goToProductsPage();
                }
              }}
            />
            {value.length ? (
              <button
                onClick={handleSearchClear}
                className={styles.searchClearButton}
                type="button"
              >
                {t('SearchBar.SEARCH_CLEAR_BTN')}
              </button>
            ) : null}
          </div>
          <button
            className={styles.searchButton}
            onClick={goToProductsPage}
            type="button"
          >
            <img src={searchIcon} alt="search icon" />
          </button>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
