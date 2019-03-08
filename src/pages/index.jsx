import React from "react";
import { Provider } from 'react-redux'
import configureStore from '../store';
import App from '../App';

import Layout from "../layouts/app";
export default () => <Provider store={configureStore()}><Layout><App /></Layout></Provider>;
