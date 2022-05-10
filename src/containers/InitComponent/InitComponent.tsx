import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from '../MainPage';
import { selectors as loginSelectors } from '../LoginPage/reducer';
import LoginPage from '../LoginPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const InitComponent = () => {
  // const accessToken = useSelector(loginSelectors.accessToken);
  // const refreshToken = useSelector(loginSelectors.refreshToken);

  const selectStartPage = () => {
    // if (accessToken && refreshToken) {
    return <MainPage />;
    // }
    // return (
    //   <div>
    //     <Header />
    //     <Switch>
    //       <Route exact path="/login" component={LoginPage} />
    //       <Redirect to="/login" />
    //     </Switch>
    //     <Footer />
    //   </div>
    // );
  };
  return selectStartPage();
};

export default InitComponent;
