import React, { useState, useEffect } from "react";
import Board, { CreateBoard } from "../components/board";
import { makeStyles } from "@material-ui/core/styles";
import { boardsRef } from "../misc/firebase";
import firebase from "firebase/app";
import {
  Typography,
  Grid,
  CssBaseline,
  Container,
  Card,
} from "@material-ui/core";

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
  card: {
    minHeight: 20,
    backgroundColor: theme.palette.primary.light,
  },
  headerText: {
    fontWeight: theme.typography.fontWeightMedium,
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
  const user = firebase.auth().currentUser;
  const getBoardsList = async () => {
    try {
      const resp = await boardsRef.get();
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
      console.log(boards);
    } catch (error) {
      console.log("[Error] getting boards", error);
    }
  };
  useEffect(() => {
    getBoardsList();
    // return () => {
    //   cleanup;
    // };
  }, []);
  const onCreateBoard = (nameBoard: string) => {
    const board: IBoard = {
      title: nameBoard,
      type: "default",
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      createdBy: user?.uid,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
      updatedBy: user?.uid,
    };
    boardsRef.add(board).then(() => {
      getBoardsList();
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
          <Card className={classes.card}></Card>
        </Container>
      </div>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <CreateBoard
              onClick={(nameBoard) => onCreateBoard(nameBoard)}
            ></CreateBoard>
          </Grid>
          {Object.keys(boards).map((key: any) => (
            <Grid item key={key} xs={12} sm={6} md={4}>
              <Board board={boards[key]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
