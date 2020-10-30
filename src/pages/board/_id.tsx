import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    boardTitle: {
      margin: theme.spacing(0, 2, 1),
      padding: theme.spacing(1, 1, 1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    title: {
      marginLeft: 4,
      flexGrow: 1,
      fontWeight: "bold",
      fontFamily: "Arial, Helvetica, sans-serif",
    },
    column: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.grey[100],
    },
    columnTitle: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      margin: theme.spacing(1, 0, 1),
      backgroundColor: theme.palette.grey[400],
    },
    shareButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
      marginRight: theme.spacing(1),
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    addButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.success.main,
      marginRight: theme.spacing(1),
      height: theme.spacing(3),
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    cardItem: {
      minHeight: theme.spacing(8),
      backgroundColor: theme.palette.common.white,
    },
    cardContent: {
      padding: theme.spacing(1, 1, 0),
    },
    cardContentView: {
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      fontFamily: "Times New Roman, Times, serif",
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between",
    },
    input: {
      "&:focus": {
        border: "none",
      },
      border: "none",
      width: "100%",
    },
  })
);
interface IBoard {
  id: any;
  [key: string]: any;
}

const BoardDetail = ({ id, props }: IBoard) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.boardTitle}>
          <Typography variant="body1" className={classes.title}>
            Board Title
          </Typography>
          <Button size="small" className={classes.shareButton}>
            share
          </Button>
          <IconButton size="small" color="primary" aria-label="setting">
            <SettingsRoundedIcon color="secondary"></SettingsRoundedIcon>
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={6} sm={4} className={classes.column}>
          <div className={classes.columnTitle}>
            <StopRoundedIcon color="primary" />
            Went Well
          </div>
          <Button
            variant="contained"
            color="default"
            fullWidth
            disableElevation
            className={classes.button}
            startIcon={<AddIcon style={{ fontSize: 15 }} />}
          ></Button>
          <Card
            color="primary"
            className={classes.cardItem}
            style={{
              border: "2px solid red",
            }}
          >
            <CardContent className={classes.cardContent}>
              <input type="text" className={classes.input} />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" className={classes.addButton}>
                add
              </Button>
              <IconButton size="small" color="primary" aria-label="setting">
                <DeleteForeverRoundedIcon
                  fontSize="small"
                  color="error"
                ></DeleteForeverRoundedIcon>
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} className={classes.column}>
          <div className={classes.columnTitle}>
            <StopRoundedIcon color="secondary" />
            To Improve
          </div>
          <Button
            variant="contained"
            color="default"
            fullWidth
            disableElevation
            className={classes.button}
            startIcon={<AddIcon style={{ fontSize: 15 }} />}
          ></Button>
          <Card
            color="primary"
            className={classes.cardItem}
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            <div className={classes.cardContentView}>
              <Typography>
                Content is showed in there. Content is showed in there . Content
                is showed in there . Content is showed in thereContent is showed
                in there. Content is showed in there . Content is showed in
                there . Content is showed in thereContent is showed in there.
                Content is showed in there . Content is showed in there .
                Content is showed in there
              </Typography>
              <IconButton size="small" color="primary" aria-label="setting">
                <EditTwoToneIcon
                  style={{ fontSize: 16, color: "white" }}
                ></EditTwoToneIcon>
              </IconButton>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} className={classes.column}>
          <div className={classes.columnTitle}>
            <StopRoundedIcon color="action" />
            Actions Item
          </div>
          <Button
            variant="contained"
            color="default"
            fullWidth
            disableElevation
            className={classes.button}
            startIcon={<AddIcon style={{ fontSize: 15 }} />}
          ></Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default BoardDetail;
