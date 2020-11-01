import React, { useState, useEffect } from "react";
import Board, { CreateBoard } from "../components/board";
import { makeStyles } from "@material-ui/core/styles";
import { boardsRef, columnsRef } from "../misc/firebase";
import firebase from "firebase/app";

import {
  Typography,
  Grid,
  CssBaseline,
  Container,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    marginTop: 56,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 1),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    minHeight: 20,
    backgroundColor: theme.palette.primary.light,
  },
  headerText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

interface IBoard {
  id?: string;
  title: string;
  type: "default";
  createdAt?: any;
  createdBy?: any;
  updatedAt?: any;
  updatedBy?: any;
  [key: string]: any;
}
export default function Home() {
  const classes = useStyles();
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = firebase.auth().currentUser;
  const getBoardsList = async () => {
    setIsLoading(true);
    try {
      const resp = await boardsRef.where("createdBy", "==", user?.uid).get();
      let boardsResp: IBoard[] = [];
      resp.forEach((board: any) => {
        const data = board.data();
        const boardEntity: IBoard = {
          id: board.id,
          ...data,
        };
        boardsResp.push(boardEntity);
      });
      setBoards(boardsResp);
      setIsLoading(false);
    } catch (error) {
      console.log("[Error] getting boards", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBoardsList();
    // return () => {
    //   cleanup;
    // };
  }, []);
  const onCreateBoard = (nameBoard: string) => {
    setIsLoading(true);
    const board: IBoard = {
      title: nameBoard,
      type: "default",
      createdAt: new Date().toISOString(),
      createdBy: user?.uid ? user.uid : "unknown",
      updatedAt: new Date().toISOString(),
      updatedBy: user?.uid ? user.uid : "unknown",
    };
    boardsRef.add(board).then((board) => {
      // Do create columns
      const columns = [
        {
          boardId: board.id,
          name: "Went Well",
          order: 1,
          color: "#8E44AD",
        },
        {
          boardId: board.id,
          name: "To Improve",
          order: 2,
          color: "#27AE60",
        },
        {
          boardId: board.id,
          name: "Actions Item",
          order: 3,
          color: "#E67E22",
        },
      ];
      columns.map((column) => columnsRef.add(column));
      getBoardsList();
      setIsLoading(false);
    });
  };
  const receiveAction = (action: string, board: any) => {
    if (action === "update") {
      // TODO: Update board
      onUpdateBoard(board);
      return;
    }
    if (action === "remove") {
      // TODO Remove board
      onRemoveBoard(board);
    }
  };
  const onUpdateBoard = (board: any) => {
    const boardId = board.id;
    if (!boardId) return;
    boardsRef
      .doc(boardId)
      .update(board)
      .catch((error) => {
        console.error("Error delete documents: ", error);
      });
    console.log("update", board);
  };
  const onRemoveBoard = (board: any) => {
    const boardId = board.id;
    if (!boardId) return;
    boardsRef
      .doc(boardId)
      .delete()
      .then(() => {
        const cardsDB = boards.filter((board) => board.id !== boardId);
        setBoards([...cardsDB]);
      })
      .catch((error) => {
        console.error("Error delete documents: ", error);
      });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            color="textPrimary"
            className={classes.headerText}
          >
            My boards
          </Typography>
          <Card className={classes.divider}></Card>
        </Container>
      </div>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <CreateBoard
              onClick={(nameBoard) => onCreateBoard(nameBoard)}
            ></CreateBoard>
          </Grid>
          {isLoading ? (
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Skeleton variant="rect" width="50%" />
                  <Skeleton variant="rect" width="50%" />
                </CardActions>
              </Card>
            </Grid>
          ) : (
            boards &&
            Object.keys(boards).map((key: any) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Board
                  board={boards[key]}
                  onClick={(action, board) => receiveAction(action, board)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
