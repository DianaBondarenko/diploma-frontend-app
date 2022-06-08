import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.scss';
import { ReactComponent as SearchIcon } from '../../../../global/media/search.svg';
import { PRODUCTS_ROUTE } from '../../../../global/constants';

interface ProductsSearchProps {
  value: string;
  setValue: (value: string) => void;
}

/**
 * Products search component for Main page
 */
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
    <ClickAwayListener
      onClickAway={() => {
        setIsSearchActive(false);
      }}
    >
      <div
        className={styles.mainContainer}
        onClick={() => setIsSearchActive(true)}
      >
        <SearchIcon
          className={`${styles.searchIcon} ${
            isSearchActive && styles.searchIconActive
          }`}
        />
        <input
          value={value}
          type="text"
          className={styles.searchField}
          placeholder={t('Header.SearchBar.PLACEHOLDER_TEXT')}
          onChange={handleSearch}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && value) {
              goToProductsPage();
              setIsSearchActive(false);
            }
          }}
        />
        {value.length > 0 && (
          <div onClick={handleSearchClear} className={styles.searchClearButton}>
            {t('Header.SearchBar.CLEAR_BTN_TITLE')}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
