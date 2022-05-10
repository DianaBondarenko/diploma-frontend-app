import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
      Main
      <SearchBar
        value={searchValue}
        onSearch={handleSearch}
        suggestionsList={suggestionsList}
        onSuggestionsClose={handleSuggestionsListClose}
        isSuggestionListOpen={isSuggestionsListOpen}
        onSearchClear={handleSearchInputClear}
      />
    </>
  );
};

export default HomePage;
