import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Styled from './MainPage.styles';
import Footer from '../../components/Footer';
import OrdersPage from '../OrdersPage';
import withAuth from '../../global/hocs/withAuth';
import Header from '../../components/Header';

const MainPage = () => (
  <div>
    <Header />
    <Styled.MainPageContentContainer>
      <Switch>
        <Route exact path="/orders" component={OrdersPage} />
        <Redirect to="/orders" />
      </Switch>
    </Styled.MainPageContentContainer>
    <Footer />
  </div>
);

export default withAuth(MainPage);
