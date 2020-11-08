import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import AddIcon from "@material-ui/icons/Add";
import CardView from "../../components/card";
import CardCreate from "../../components/card/create";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
const Column = ({ column, cards, onHandler }: IColumn) => {
  const classes = useStyles();
  // const [cards, setCards] = useState<any[]>(cardsColumn);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (card: any) => {
    const columnId = column.id;
    if (card && card.description) {
      const cardDB = Object.assign(
        {
          columnId,
        },
        card
      );
      onHandler("create", cardDB);
    }
  };
  const handleRemove = (card: any) => {
    onHandler("remove", card);
  };
  const handleUpdate = (card: any) => {
    onHandler("update", card);
  };

  useEffect(() => {
    setIsCreating(false);
  }, [cards]);
  return (
    <>
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
      <Droppable droppableId={column.id} key={column.id}>
        {(provided: any, snapshot: any) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                padding: 4,
                height: "100%",
              }}
            >
              {cards &&
                cards
                  .sort((a: any, b: any) => a.index - b.index)
                  .map((card: any, index: any) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided: any, snapshot: any) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 0,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              color: "white",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <CardView
                              key={card.id}
                              card={card}
                              color={column.color}
                              onRemove={(card: any) => handleRemove(card)}
                              onUpdate={(card: any) => handleUpdate(card)}
                            ></CardView>
                          </div>
                        );
                      }}
                    </Draggable>
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
              {snapshot.isDraggingOver && (
                <div
                  style={{
                    height: 6,
                    width: "100%",
                    backgroundColor: column.color,
                    borderRadius: 2,
                  }}
                ></div>
              )}
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

export default Column;
