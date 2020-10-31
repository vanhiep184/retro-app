import React, { MouseEvent } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  SvgIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Facebook } from "../static/facebook.svg";
import { ReactComponent as Google } from "../static/google.svg";
import { auth, usersRef } from "../misc/firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.white,
  },
  cardTitleHeader: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 700,
  },
  cardHeader: {
    padding: theme.spacing(6, 2, 0),
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
  googleButton: {},
  facebookButton: {
    color: "#3B5998",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const signIn = async (provider: any) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      console.log(additionalUserInfo?.username, user);
      if (additionalUserInfo?.isNewUser) {
        // Do create new user then save to db
        const userData: any = {
          uid: user?.uid,
          email: user?.email,
          name: user?.displayName,
          phone: user?.phoneNumber,
          avatar: user?.photoURL,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        };
        // console.log(userData);
        usersRef.add(userData).then((res: any) => {
          console.log(res);
        });
      }
      history.push("/dashboard");
      // Alert.success("Signed in successful", 4000);
    } catch (err) {
      // Alert.info(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signIn(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signIn(new firebase.auth.GoogleAuthProvider());
  };

  const onSignIn = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Typography
                className={classes.cardTitleHeader}
                component="h1"
                variant="h5"
              >
                Log in
              </Typography>
            }
          ></CardHeader>
          <CardContent className={classes.cardContent}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                className={classes.submit}
                onClick={onSignIn}
              >
                Sign In
              </Button>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              color="secondary"
              className={classes.googleButton}
              startIcon={
                <SvgIcon>
                  <Google />
                </SvgIcon>
              }
              onClick={onGoogleSignIn}
            >
              Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              className={classes.facebookButton}
              startIcon={
                <SvgIcon>
                  <Facebook />
                </SvgIcon>
              }
              onClick={onFacebookSignIn}
            >
              facebook
            </Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}
