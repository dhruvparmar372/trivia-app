import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "source/store";
import App from "source/containers/app";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
