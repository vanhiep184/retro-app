import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import AddIcon from "@material-ui/icons/Add";
import CardView from "../../components/card";
import CardCreate from "../../components/card/create";
import { cardsRef } from "../../misc/firebase";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: 4,
      flexGrow: 1,
      fontWeight: "bold",
      fontFamily: "Arial, Helvetica, sans-serif",
    },
    columnTitle: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      margin: theme.spacing(1, 0, 1),
      backgroundColor: theme.palette.grey[400],
    },
  })
);
interface IColumn {
  column: {
    id: any;
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}
const Column = ({ column }: IColumn) => {
  const classes = useStyles();
  const [cards, setCards] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const handleCreate = (card: any) => {
    console.log(card);
    if (card && card.description) {
      setCards([...cards, card]);
    }
    setIsCreating(false);
  };
  const handleRemove = (card: any) => {
    console.log(card);
    // setCards([...cards, card]);
  };
  useEffect(() => {
    const cardsDefault: any[] = [
      {
        id: 1,
        description: `Content is showed in there. Content is showed in there.`,
      },
      {
        id: 2,
        description: `Content is showed in there. Content is showed in there.`,
      },
      {
        id: 3,
        description: `Content is showed in there. Content is showed in there.`,
      },
    ];
    setCards([...cardsDefault]);
  }, []);
  return (
    <div>
      <div className={classes.columnTitle}>
        <StopRoundedIcon color="secondary" />
        {column.name}
      </div>
      <Button
        variant="contained"
        color="default"
        fullWidth
        disableElevation
        className={classes.button}
        startIcon={<AddIcon style={{ fontSize: 15 }} />}
        onClick={() => setIsCreating(true)}
      ></Button>
      {cards &&
        cards.map((card) => (
          <CardView
            key={card.id}
            card={card}
            onRemove={(card: any) => handleRemove(card)}
          ></CardView>
        ))}
      {isCreating && (
        <CardCreate
          card={{
            description: `Content is showed in there. Content is showed in there.`,
          }}
          onClick={(card: any) => handleCreate(card)}
        ></CardCreate>
      )}
    </div>
  );
};

export default Column;
