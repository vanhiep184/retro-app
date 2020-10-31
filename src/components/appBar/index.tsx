import React, { useEffect, useState } from "react";
import {
  Typography,
  Toolbar,
  AppBar,
  Button,
  Chip,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { Route, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  })
)(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    account: {
      backgroundColor: "transparent",
      color: theme.palette.common.white,
      "&:hover": {
        color: theme.palette.common.black,
      },
    },
  })
);
const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [authUser, setAuthUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(`currentUser`, firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged((auth: any) => {
      if (auth) {
        console.log("User Exists", auth);
        setAuthUser(auth);
      } else {
        setAuthUser(null);
        console.log("User is not exists");
      }
    });
  }, []);
  const logout = () => {
    setAnchorEl(null);
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography
          variant="h6"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/dashboard")}
        >
          Retro LVH
        </Typography>
        {authUser ? (
          <div>
            <Chip
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleClick}
              avatar={
                <Avatar
                  alt={authUser.displayName}
                  src={authUser.photoURL}
                ></Avatar>
              }
              label={authUser.displayName}
              className={classes.account}
            />
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <AccountBoxRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </StyledMenuItem>
              <StyledMenuItem onClick={logout}>
                <ListItemIcon>
                  <ExitToAppRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </StyledMenuItem>
            </StyledMenu>
          </div>
        ) : (
          <Button color="inherit" href="/login">
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
