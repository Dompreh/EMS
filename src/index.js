import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./context/ContextProvider";
import { store } from "./app/store";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider>
      <Helmet>
        <title>Employee Management System</title>
      </Helmet>
      <App />
    </ContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
