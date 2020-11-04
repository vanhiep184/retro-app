import React, { MouseEvent, useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
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
import { notify } from "../components/toast";
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
export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<any>("");
  const [canUpdate, setCanUpdate] = useState<boolean>(true);
  const onUpdate = (e: MouseEvent) => {
    e.preventDefault();
    const displayName = fullName;
    setIsLoading(true);
    const currentUser = firebase.auth().currentUser;
    currentUser
      ?.updateProfile({
        displayName,
      })
      .then(() => {
        setIsLoading(false);
        notify("Updated success", "success");
        if (phone) {
          // 'recaptcha-container' is the ID of an element in the DOM.
          const applicationVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container"
          );
          const provider = new firebase.auth.PhoneAuthProvider();
          provider
            .verifyPhoneNumber(phone, applicationVerifier)
            .then(function (verificationId) {
              const verificationCode: any = window.prompt(
                "Please enter the verification " +
                  "code that was sent to your mobile device."
              );
              return firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
            })
            .then(function (phoneCredential) {
              return currentUser
                ?.updatePhoneNumber(phoneCredential)
                .catch((err) => {
                  setIsLoading(false);
                  console.error(err);
                  notify(err.message, "error");
                });
            });
          // currentUser
          //   ?.updatePhoneNumber(phone)
          //   .then()
          //   .catch((err) => {
          //     setIsLoading(false);
          //     console.error(err);
          //     notify(err.message, "error");
          //   });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        notify(err.message, "error");
      });
  };
  const checkFullName = (e: any) => {
    setFullName(e.target.value);
    setCanUpdate(e.target.value ? true : false);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth: any) => {
      if (auth) {
        console.log("User Exists", auth.displayName, auth.email, auth.phone);
        setFullName(auth.displayName);
        setEmail(auth.email);
        setPhone(auth.phone ? auth.phone : "");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        // history.push("/login");
        console.log("User is not exists");
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
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
                Information
              </Typography>
            }
          ></CardHeader>
          <CardContent className={classes.cardContent}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={fullName}
                    onChange={checkFullName}
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    placeholder="Full Name"
                    label="Full Name"
                    name="fullName"
                    autoComplete="lname"
                    error={!fullName}
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
                    label="Email"
                    autoComplete="email"
                    disabled
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    name="phone number"
                    placeholder="Phone number"
                    type="number"
                    label="Phone number"
                    id="phone"
                    autoComplete="current-password"
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading || !canUpdate}
                className={classes.submit}
                onClick={onUpdate}
              >
                Update
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail, isEmpty } from "validator";

// const required = (value) => {
//   if (isEmpty(value)) {
//     return (
//       <small className="form-text text-danger">This field is required</small>
//     );
//   }
// };

// const email = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <small className="form-text text-danger">Invalid email format</small>
//     );
//   }
// };

// const minLength = (value) => {
//   if (value.trim().length < 6) {
//     return (
//       <small className="form-text text-danger">
//         Password must be at least 6 characters long
//       </small>
//     );
//   }
// };

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       alert("success");
//     }
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="login-container">
//           <div id="output"></div>
//           <div className="avatar"></div>
//           <div className="form-box">
//             <Form
//               onSubmit={(e) => this.onSubmit(e)}
//               ref={(c) => {
//                 this.form = c;
//               }}
//             >
//               <Input
//                 name="email"
//                 onChange={this.onChangeHandler}
//                 type="text"
//                 placeholder="Email"
//                 className="form-control"
//                 validations={[required, email]}
//               />
//               <Input
//                 name="password"
//                 onChange={this.onChangeHandler}
//                 type="password"
//                 placeholder="Password"
//                 className="form-control"
//                 validations={[required, minLength]}
//               />
//               <button className="btn btn-info btn-block login" type="submit">
//                 Login
//               </button>
//               <CheckButton
//                 style={{ display: "none" }}
//                 ref={(c) => {
//                   this.checkBtn = c;
//                 }}
//               />
//             </Form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;
