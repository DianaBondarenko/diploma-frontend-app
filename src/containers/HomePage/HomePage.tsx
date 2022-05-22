import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestionsList, setSuggestionsList] = useState<{
    [key: string]: string[];
  } | null>(null);
  const [isSuggestionsListOpen, setIsSuggestionsListOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.length >= 3) {
        // getSuggestionsData(searchValue).then((res) => setSuggestionsList(res));
      }
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSuggestionsListOpen(true);
    setSearchValue(event.target.value);
  };

  const handleSuggestionsListClose = () => {
    setIsSuggestionsListOpen(false);
  };

  const handleSearchInputClear = () => {
    setSearchValue('');
    setSuggestionsList(null);
  };

  return (
    <div className={styles.mainContainer}>
      <br />
      <SearchBar
        value={searchValue}
        onSearch={handleSearch}
        suggestionsList={suggestionsList}
        onSuggestionsClose={handleSuggestionsListClose}
        isSuggestionListOpen={isSuggestionsListOpen}
        onSearchClear={handleSearchInputClear}
      />
    </div>
  );
};

export default HomePage;
