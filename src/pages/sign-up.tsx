import React, { MouseEvent, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import firebase from "firebase/app";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
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
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[600],
    },
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
    paddingTop: theme.spacing(2),
  },
  googleButton: {},
  facebookButton: {
    color: "#3B5998",
  },
}));
export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onSignUp = (e: MouseEvent) => {
    e.preventDefault();
    const displayName = firstName + " " + lastName;
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        firebase.auth().currentUser?.updateProfile({
          displayName,
          photoURL:
            "https://i.pinimg.com/564x/3c/3c/68/3c3c68eda2c46e48792faf6879a4441e.jpg",
        });
        notify("Sign up success!", "success");
        history.push("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        notify(err.message, "error");
      });
  };
  const notify = (message: any, type: string) => {
    const option = {
      autoClose: 3000,
    };
    if (type === "error") {
      toast.error(message, option);
      return;
    }
    if (type === "success") {
      toast.success(message, option);
      return;
    }
    toast(message, option);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
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
                Sign up
              </Typography>
            }
          ></CardHeader>
          <CardContent className={classes.cardContent}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                className={classes.submit}
                onClick={onSignUp}
              >
                Register
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
