import React from "react";

import Layout from "../layouts/blank";

export default class extends React.PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    let data = {
      "email": form[0].value,
      "Email": form[0].value,
      "Liked Elements": form[1].value,
      "Usefulness": form[2].value,
    };

    fetch("https://usebasin.com/f/71436ab3ce6c.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  render = () => (
    <Layout>
      <h1>Feedback for Utsav { new Date().getFullYear() }</h1>
      <form
        // acceptCharset="UTF-8"
        // action="https://usebasin.com/f/71436ab3ce6c"
        // enctype="multipart/form-data"
        // method="POST"
        onSubmit={ this.handleSubmit }
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="user@example.com" required />
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="elements">Which elements of Utsav 2019 did you like the most?</label>
          <textarea id="elements" rows="4" name="Liked Elements" placeholder="Feedback" required>
          </textarea>
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="android-app">How useful was Utsav Android App?</label>
          <input type="number" min="0" max="5" id="android-app" name="Android App Usefulness" placeholder="Ratings" required />
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="android-app">How were the quality of events?</label>
          <input type="number" min="0" max="5" id="android-app" name="Android App Usefulness" placeholder="Ratings" required />
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="android-app">How would you rate the organization of Utsav?</label>
          <input type="number" min="0" max="5" id="android-app" name="Android App Usefulness" placeholder="Ratings" required />
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="elements">Is there anything that would have made experience of Utsav better?</label>
          <textarea id="elements" rows="4" name="Liked Elements" placeholder="Feedback" required>
          </textarea>
        </div>

        <div css={{ display: "flex", flexDirection: "column", }}>
          <label htmlFor="android-app">How likely are you to recommend Utsav to your friends/acquaintances?</label>
          <input type="number" min="0" max="5" id="android-app" name="Android App Usefulness" placeholder="Ratings" required />
        </div>

        <input type="hidden" id="gotcha" name="_gotcha" />

        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};
