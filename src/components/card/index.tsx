import React, { useState } from "react";
import { Card, Typography, IconButton } from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Update from "./update";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardItem: {
      minHeight: theme.spacing(8),
      backgroundColor: theme.palette.common.white,
      margin: theme.spacing(0, 0, 1),
    },
    cardContentView: {
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      fontFamily: "Times New Roman, Times, serif",
    },
  })
);
interface IView {
  card: any;
  [key: string]: any;
}

const View = ({ card, color, onRemove, onUpdate }: IView) => {
  const classes = useStyles();
  const [isEditMode, setIsEditMode] = useState(false);
  const handleUpdate = (data: any) => {
    if (data.action === "remove") {
      onRemove(data.card);
      return;
    }
    // Do update
    onUpdate(data.card);
    setIsEditMode(false);
  };
  return (
    <>
      {isEditMode ? (
        <Update
          card={card}
          color={color}
          onClick={(card: any) => handleUpdate(card)}
        ></Update>
      ) : (
        <Card
          color="primary"
          className={classes.cardItem}
          style={{
            backgroundColor: color,
            color: "white",
          }}
        >
          <div className={classes.cardContentView}>
            <Typography
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {card.description}
            </Typography>
            <IconButton
              size="small"
              color="primary"
              aria-label="setting"
              onClick={() => setIsEditMode(true)}
            >
              <EditTwoToneIcon
                style={{ fontSize: 16, color: "white" }}
              ></EditTwoToneIcon>
            </IconButton>
          </div>
        </Card>
      )}
    </>
  );
};

export default View;
