import React from "react";
import { Provider } from 'react-redux'
import configureStore from '../store';
import App from '../App';

import Layout from "../layouts/app";

export default () => (
  <Layout>
    <h1>404: Page Not Found</h1>
  </Layout>
);
