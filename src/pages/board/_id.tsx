import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import Column from "../../components/column";
import { boardsRef, columnsRef } from "../../misc/firebase";
import { notify, ToastContainer } from "../../components/toast";
import CopyToClipboard from "react-copy-to-clipboard";
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

const BoardDetail = ({ ...props }: IBoard) => {
  const classes = useStyles();
  const [columns, setColumns] = useState<any[]>([]);
  const [board, setBoard] = useState<any>(null);
  useEffect(() => {
    const columnsDB: any[] = [];
    const boardId = props.match?.params?.boardId;
    boardsRef
      .doc(boardId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const boardDB = {
            id: boardId,
            ...doc.data(),
          };
          setBoard(boardDB);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
    // TODO: get columns by boardId
    columnsRef
      .where("boardId", "==", boardId)
      .limit(3)
      .get()
      .then((snapshot) => {
        snapshot.forEach(function (doc) {
          const column = {
            id: doc.id,
            ...doc.data(),
          };
          columnsDB.unshift(column);
          setColumns([...columnsDB]);
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);
  const onShare = () => {
    notify("Board URL copied! Share it with people to collaborate.", "success");
  };
  return (
    <div className={classes.root}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.boardTitle}>
          <Typography variant="body1" className={classes.title}>
            {board && board.title}
          </Typography>
          {board && (
            <CopyToClipboard
              text={`https://retro-lvh.web.app/board/${board.id}`}
              onCopy={onShare}
            >
              <Button size="small" className={classes.shareButton}>
                share
              </Button>
            </CopyToClipboard>
          )}

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
