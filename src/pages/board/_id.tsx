import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import Column from "../../components/column";
import { columnsRef } from "../../misc/firebase";
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
    shareButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
      marginRight: theme.spacing(1),
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
);
interface IBoard {
  id: any;
  [key: string]: any;
}

const BoardDetail = ({ id, props }: IBoard) => {
  const classes = useStyles();
  const [columns, setColumns] = useState<any[]>([]);
  useEffect(() => {
    const columnsDefault: any[] = [
      {
        id: 1,
        name: "Went Well",
      },
      {
        id: 2,
        name: "To Improve",
      },
      {
        id: 3,
        name: "Actions Item",
      },
    ];
    setColumns([...columnsDefault]);
  }, []);
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
        {columns &&
          columns.map((column) => (
            <Grid
              key={"column-" + column.id}
              item
              xs={12}
              sm={4}
              className={classes.column}
            >
              <Column column={column}></Column>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default BoardDetail;
