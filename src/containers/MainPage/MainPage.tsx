import { Redirect, Route, Switch } from 'react-router-dom';
import withAuth from '../../global/hocs/withAuth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomePage from '../HomePage';
import ProductsPage from '../ProductsPage';
import ProductPage from '../ProductPage';
import CartPage from '../CartPage';
import ShopsPage from '../ShopsPage';
import OrderPage from '../OrderPage';
import DefaultLayout from '../../components/DefaultLayout';

const MainPage = () => {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/shops" component={ShopsPage} />
      </Switch>

      <DefaultLayout>
        <Switch>
          <Route exact path="/products" component={ProductsPage} />
        </Switch>
        <Switch>
          <Route path="/products/:productId" component={ProductPage} />
        </Switch>
        <Switch>
          <Route exact path="/cart" component={CartPage} />
        </Switch>
        <Switch>
          <Route exact path="/order" component={OrderPage} />
        </Switch>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </DefaultLayout>

      <Footer />
    </>
  );
};

export default withAuth(MainPage);
