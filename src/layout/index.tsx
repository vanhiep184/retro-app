import React from "react";
import App from "../pages";
import Navigation from "../components/appBar";
import BoardDetail from "../pages/board/_id";
import PageNotFound from "../pages/not-found";
import Login from "../pages/login";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
// import PrivateRoute from "../routes/private";
import PublishRoute from "../routes/publish";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#222831",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fd7014",
      // dark: will be calculated from palette.secondary.main,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 60,
    height: "100%",
  },
}));
const Layout = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <main className={classes.main}>
        <Switch>
          {/* <PrivateRoute exact path="/">
            {App}
          </PrivateRoute> */}
          <PublishRoute exact path="/" component={App}></PublishRoute>
          <PublishRoute exact path="/login">
            <Login />
          </PublishRoute>
          <PublishRoute exact path="/dashboard" component={App} />
          <PublishRoute exact path="/board/:boardId">
            <BoardDetail id={123}></BoardDetail>
          </PublishRoute>
          <Route component={PageNotFound}></Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
