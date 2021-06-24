import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeContext } from "./components/ThemeProvider";
import GlobalStyles from "./components/theme/GlobalStyles";
import { Fragment } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
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

export default App;
