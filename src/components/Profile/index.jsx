// TODO: This is just a temporary component to test login.

import React from "react";
import { getUser } from "../../services/auth";

export default () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().name}</li>
      <li>E-mail: {getUser().email}</li>
    </ul>
  </>
);
