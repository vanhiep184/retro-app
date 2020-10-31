import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CreateBoard from "./create";
import dayjs from "dayjs";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitleContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
  },
  cardActions: {
    padding: theme.spacing(0),
    display: "flex",
    justifyContent: "flex-end",
  },
  timer: {
    display: "flex",
    alignItems: "center",
  },
}));
interface IBoard {
  board: any;
}

export default function Board({ board }: IBoard) {
  const classes = useStyles();
  const history = useHistory();
  const [isRaising, setIsRaising] = useState<boolean>(false);
  const goToDetail = (id: any) => {
    history.push(`/board/${id}`);
  };
  return (
    <Card
      className={classes.card}
      raised={isRaising}
      onMouseEnter={() => setIsRaising(true)}
      onMouseLeave={() => setIsRaising(false)}
    >
      <CardContent
        className={classes.cardContent}
        onClick={() => goToDetail(board.id)}
      >
        <div className={classes.cardTitleContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {board.title}
          </Typography>
          <IconButton
            edge="end"
            size="small"
            color="primary"
            aria-label="share board"
            onClick={() => {
              alert("Clicked Icon share board");
            }}
          ></IconButton>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.timer}
        >
          <QueryBuilderIcon style={{ fontSize: 12, marginRight: 4 }} />
          {dayjs(board.createdAt).format("DD MMMM")}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          fullWidth
          size="small"
          color="secondary"
          aria-label="share board"
          onClick={() => {
            alert("Clicked Icon share board");
          }}
          startIcon={<EditIcon color="secondary" fontSize="inherit" />}
        >
          edit
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          aria-label="share board"
          onClick={() => {
            alert("Clicked Icon share board");
          }}
          startIcon={<ShareIcon fontSize="inherit" />}
        >
          share
        </Button>
        <IconButton
          size="small"
          color="primary"
          aria-label="delete"
          onClick={() => {}}
        >
          <DeleteRoundedIcon
            style={{
              fontSize: 20,
              color: red[500],
              cursor: "pointer",
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export { CreateBoard };
