import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProductOrder } from './components/ProductOrder';
import { ProductsList } from './components/ProductsList';
import { OrderInvoice } from './components/OrderInvoice';
import { ProductDetails } from './components/ProductDetails';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        
        <Route path='/OrderInvoice/:OrderData' component={OrderInvoice} />
        <Route path='/ProductOrder' component={ProductOrder} />
        <Route path='/ProductDetails/:productId' component={ProductDetails} />
        <Route exact path='/' component={ProductsList} />
       
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
