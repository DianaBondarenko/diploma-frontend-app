import { Redirect, Route, Switch } from 'react-router-dom';
import withAuth from '../../global/hocs/withAuth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomePage from '../HomePage';
import ProductsPage from '../ProductsPage';
import ProductPage from '../ProductPage';
import CartPage from '../CartPage';
import * as Styled from './MainPage.styles';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Styled.MainPageContentContainer>
        <Switch>
          <Route exact path="/products" component={ProductsPage} />
          {/*<Redirect to="/products" />*/}
        </Switch>
        <Switch>
          <Route path="/products/:productId" component={ProductPage} />
        </Switch>
        <Switch>
          <Route exact path="/cart" component={CartPage} />
          {/*<Redirect to="/products" />*/}
        </Switch>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/*<Redirect to="/" />*/}
        </Switch>
      </Styled.MainPageContentContainer>
      <Footer />
    </div>
  );
};

export default withAuth(MainPage);
