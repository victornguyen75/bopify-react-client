import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import GlobalStyles from "./components/theme/GlobalStyles";
import { ThemeContext } from "./components/ThemeProvider";
import "./App.css";

const code = new URLSearchParams(window.location.search).get("code");

export default function App() {
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <Fragment>
          <GlobalStyles theme={context.theme} />
          {code ? (
            <Dashboard
              code={code}
              theme={context.theme}
              toggleTheme={context.toggleTheme}
            />
          ) : (
            <Login />
          )}
        </Fragment>
      )}
    </ThemeContext.Consumer>
  );
}
