import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import AboutUs from './components/AboutUs';
import OrderSteps from './components/OrderSteps';
import styles from './HomePage.module.scss';
import { HOME_PAGE } from './constants';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>{HOME_PAGE.title}</div>
      <div className={styles.searchBarContainer}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </div>
      <AboutUs />
      <OrderSteps />
    </div>
  );
};

export default HomePage;
