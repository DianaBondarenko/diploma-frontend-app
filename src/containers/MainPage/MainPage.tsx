import { Route, Switch } from 'react-router-dom';
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

        <DefaultLayout>
          <Route exact path="/products" component={ProductsPage} />
          <Route path="/products/:productId" component={ProductPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/order" component={OrderPage} />
          <Route exact path="/" component={HomePage} />
        </DefaultLayout>
      </Switch>

      <Footer />
    </>
  );
};

export default MainPage;
