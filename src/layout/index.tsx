import React from "react";
import App from "../pages";
import Navigation from "../components/appBar";
import BoardDetail from "../pages/board/_id";
import PageNotFound from "../pages/not-found";
import Login from "../pages/login";
import Profile from "../pages/profile";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "../components/toast";
// import PrivateRoute from "../routes/private";
import PublishRoute from "../routes/publish";
import SignUp from "../pages/sign-up";

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
  },
});
const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
  },
}));
const Layout = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <ToastContainer />
      <main className={classes.main}>
        <Switch>
          {/* <PrivateRoute exact path="/">
            {App}
          </PrivateRoute> */}
          <PublishRoute exact path="/" component={App}></PublishRoute>
          <PublishRoute exact path="/login">
            <Login />
          </PublishRoute>
          <PublishRoute exact path="/signup">
            <SignUp />
          </PublishRoute>
          <PublishRoute exact path="/profile">
            <Profile />
          </PublishRoute>
          <PublishRoute exact path="/dashboard" component={App} />
          <PublishRoute
            exact
            path="/board/:boardId"
            render={(props: any) => <BoardDetail {...props} />}
          ></PublishRoute>
          <Route component={PageNotFound}></Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
