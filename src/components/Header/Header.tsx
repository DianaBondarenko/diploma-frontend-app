import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Styled from './Header.styles';
import * as actions from '../../containers/LoginPage/actions';
import { selectors } from '../../containers/LoginPage/reducer';
import logo from '../../global/media/logo.svg';
import searchIcon from '../../global/media/header-search-icon.svg';
import { setToLocalStorage } from '../../global/helpers/localStorageHelper';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const accessToken = useSelector(selectors.accessToken);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [accessToken]);

  const handleLogout = () => {
    dispatch(actions.logout());
    setToLocalStorage('accessToken', null);
    setToLocalStorage('refreshToken', null);
  };

  const handleSearch = () => {
    console.log('search');
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderContent>
        <Styled.HeaderLogoPharmacyNameContainer>
          <Styled.HeaderLogo onClick={() => history.push('/')}>
            <img src={logo} alt="header logo" />
          </Styled.HeaderLogo>
          {isAuthorized && (
            <Styled.PharmacyNameContainer>
              Аптека Добрая
            </Styled.PharmacyNameContainer>
          )}
        </Styled.HeaderLogoPharmacyNameContainer>
        {isAuthorized && (
          <Styled.HeaderControls>
            <Styled.HeaderSearchButtonContainer onClick={handleSearch}>
              <img src={searchIcon} alt="search icon" />
            </Styled.HeaderSearchButtonContainer>
            <Styled.HeaderLogoutButtonContainer onClick={handleLogout}>
              {t('Header.LOGOUT_BTN_TEXT')}
            </Styled.HeaderLogoutButtonContainer>
          </Styled.HeaderControls>
        )}
      </Styled.HeaderContent>
    </Styled.HeaderContainer>
  );
};

export default Header;
