import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      margin: theme.spacing(1, 0, 1),
    },
    cardContent: {
      padding: theme.spacing(1, 1, 0),
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
      resize: "none",
      width: "100%",
    },
  })
);
interface IUpdate {
  card: any;
  [key: string]: any;
}

const Update = ({ card, color, onClick }: IUpdate) => {
  const classes = useStyles();
  const [description, setDescription] = useState(card.description);
  const onUpdate = (action: string) => {
    const updatedCard = { ...card };
    updatedCard.description = description;
    onClick({ action, card });
  };
  return (
    <Card
      color="primary"
      className={classes.cardItem}
      style={{
        border: `2px solid ${color}`,
      }}
    >
      <CardContent className={classes.cardContent}>
        <TextareaAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="description"
          rowsMin={1}
          className={classes.input}
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          className={classes.addButton}
          onClick={() => onUpdate("update")}
        >
          Done
        </Button>
        <IconButton
          size="small"
          color="primary"
          aria-label="setting"
          onClick={() => onUpdate("remove")}
        >
          <DeleteForeverRoundedIcon
            fontSize="small"
            color="error"
          ></DeleteForeverRoundedIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Update;
