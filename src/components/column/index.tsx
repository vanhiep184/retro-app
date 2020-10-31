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
  const columnId = column.id;
  const handleCreate = (card: any) => {
    if (card && card.description) {
      const cardDB = Object.assign(
        {
          columnId,
        },
        card
      );
      cardsRef.add(cardDB).then((doc) => {
        const card = {
          id: doc.id,
          ...cardDB,
        };
        setCards([...cards, card]);
      });
    }
    setIsCreating(false);
  };
  const handleRemove = (card: any) => {
    const cardId = card.id;
    if (!cardId) return;
    cardsRef
      .doc(cardId)
      .delete()
      .then(() => {
        const cardsDB = cards.filter((card) => card.id !== cardId);
        setCards([...cardsDB]);
      })
      .catch((error) => {
        console.error("Error delete documents: ", error);
      });
  };
  const handleUpdate = (card: any) => {
    console.log(`update`, card);
    const cardId = card.id;
    if (!cardId) return;
    cardsRef
      .doc(cardId)
      .update(card)
      .then(() => {
        const cardsDB = cards.map((cardItem) => {
          if (cardItem.id === cardId) return card;
          return cardItem;
        });
        setCards([...cardsDB]);
      });
  };
  const getCardList = () => {
    // TODO: get cards by columnId
    const cardsDB: any[] = [];
    cardsRef
      .where("columnId", "==", columnId)
      .get()
      .then((snapshot) => {
        snapshot.forEach(function (doc) {
          const card = {
            id: doc.id,
            ...doc.data(),
          };
          cardsDB.push(card);
          setCards([...cardsDB]);
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };
  useEffect(getCardList, []);
  return (
    <div>
      <div className={classes.columnTitle}>
        <StopRoundedIcon style={{ color: column.color }} />
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
            color={column.color}
            onRemove={(card: any) => handleRemove(card)}
            onUpdate={(card: any) => handleUpdate(card)}
          ></CardView>
        ))}
      {isCreating && (
        <CardCreate
          color={column.color}
          card={{
            description: ``,
          }}
          onClick={(card: any) => handleCreate(card)}
        ></CardCreate>
      )}
    </div>
  );
};

export default Column;
