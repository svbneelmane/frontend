import React from "react";
import { Link } from "gatsby";

import Layout from "../layouts/default";

export default () => (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>
      You are in the wrong place. You should head back <Link to="/">home</Link>.
    </p>
  </Layout>
);
