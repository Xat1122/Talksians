import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import ChatContextProvider from "./Context/ChatContext";
import { AuthContextProvider } from "./Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <AuthContextProvider>
        <ChatContextProvider>
          <GlobalStyle />
          <App />
        </ChatContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
