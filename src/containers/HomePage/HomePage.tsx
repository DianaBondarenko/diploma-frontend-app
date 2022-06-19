import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import AboutUs from './components/AboutUs';
import OrderSteps from './components/OrderSteps';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>{t('HomePage.TITLE_TEXT')}</div>
      <div className={styles.searchBarContainer}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </div>
      <AboutUs />
      <OrderSteps />
    </div>
  );
};

export default HomePage;
