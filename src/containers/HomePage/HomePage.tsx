import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={styles.mainContainer}>
      <br />
      <SearchBar value={searchValue} setValue={setSearchValue} />
    </div>
  );
};

export default HomePage;
