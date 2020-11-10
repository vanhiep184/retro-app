import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import Column from "../../components/column";
import { boardsRef, columnsRef, cardsRef } from "../../misc/firebase";
import { notify, ToastContainer } from "../../components/toast";
import { DragDropContext } from "react-beautiful-dnd";
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
  const [isRealtime, setIsRealtime] = useState<boolean>(false);
  const onDragEnd = (results: any, columns: any, setColumns: any) => {
    setIsRealtime(false);
    if (!results.destination) return;
    const { source, destination, draggableId } = results;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column: any) => column.id === source.droppableId
      );
      const destColumn = columns.find(
        (column: any) => column.id === destination.droppableId
      );
      const sourceCards = [...sourceColumn.cards];
      const destCards = [...destColumn.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column: any) => {
          if (column.id === source.droppableId) {
            const column = {
              ...sourceColumn,
              cards: sourceCards,
            };
            return column;
          }
          if (column.id === destination.droppableId) {
            const column = {
              ...destColumn,
              cards: destCards.map((card) => {
                return Object.assign(card, {
                  columnId: destination.droppableId,
                });
              }),
            };
            return column;
          }
          return column;
        })
      );
      const cardId = draggableId;
      if (!cardId) return;
      const card = {
        columnId: destination.droppableId,
      };
      cardsRef.doc(cardId).update(card);
    } else {
      console.log("iam moving index", results);
      const sourceColumn = columns.find(
        (column: any) => column.id === source.droppableId
      );
      const copiedCards = [...sourceColumn.cards];
      const [removed] = copiedCards.splice(source.index, 1);
      copiedCards.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column: any) => {
          if (column.id === source.droppableId) {
            const column = {
              ...sourceColumn,
              cards: copiedCards.map((card, index) => {
                cardsRef.doc(card.id).update({ index });
                const cardTemp = {
                  ...card,
                  index,
                };
                return cardTemp;
              }),
            };
            return column;
          }
          return column;
        })
      );
    }
  };
  const onHandler = (action: string, card: any) => {
    setIsRealtime(false);
    console.log("onHanlder", isRealtime);
    if (action === "create") {
      handleCreate(card);
    }
    if (action === "update") {
      handleUpdate(card);
    }
    if (action === "remove") {
      handleRemove(card);
    }
  };
  const handleCreate = (card: any) => {
    const columnId = card.columnId;
    if (!columnId) return;
    const column = columns.find((column: any) => column.id === columnId);
    const cardTemp = {
      ...card,
      index: column.cards.length,
    };
    cardsRef.add(cardTemp);
    // .then((doc) => {
    // const cardDB = {
    //   id: doc.id,
    //   ...card,
    // };
    // const cardsDB = [...column.cards, cardDB];
    // setColumns(
    //   columns.map((column: any) => {
    //     if (column.id === columnId) {
    //       const columnTemp = {
    //         ...column,
    //         cards: cardsDB,
    //       };
    //       return columnTemp;
    //     }
    //     return column;
    //   })
    // );
    // });
  };
  const add = (card: any) => {
    const columnId = card.columnId;
    const cardId = card.id;
    if (!columnId) return;
    const column = columns.find((column: any) => column.id === columnId);
    if (!column) return;
    let cards: any[] = [];
    if (column.cards) cards = [...column.cards];
    const cardIndex = cards.find((card: any) => card.id === cardId);
    if (cardIndex) {
      console.log("replace", cardIndex, cards, column);
    } else {
      cards = [...cards, card];
    }
    setColumns(
      columns.map((column: any) => {
        if (column.id === columnId) {
          const columnTemp = Object.assign(column, { cards });
          return columnTemp;
        }
        return column;
      })
    );
  };
  const handleRemove = (card: any) => {
    const cardId = card.id;
    if (!cardId) return;
    // remove(card);
    cardsRef
      .doc(cardId)
      .delete()
      .catch((error) => {
        console.error("Error delete documents: ", error);
      });
  };
  const remove = (card: any) => {
    console.log("no api", "remove");
    const cardId = card.id;
    if (!cardId) return;
    const columnId = card.columnId;
    const column = columns.find((column: any) => column.id === columnId);
    if (!column) return;
    const cardsDB = column.cards.filter((card: any) => card.id !== cardId);
    setColumns(
      columns.map((column: any) => {
        if (column.id === columnId) {
          const columnTemp = Object.assign(column, { cards: cardsDB });
          return columnTemp;
        }
        return column;
      })
    );
  };
  const handleUpdate = (card: any) => {
    const cardId = card.id;
    if (!cardId) return;
    cardsRef.doc(cardId).update(card);
  };
  const update = (card: any) => {
    console.log("no api", "update");
    const cardId = card.id;
    if (!cardId) return;
    const columnId = card.columnId;
    const column = columns.find((column: any) => column.id === columnId);
    if (!column) return;
    const cardsDB = column.cards.map((cardItem: any) => {
      if (cardItem.id === cardId) return card;
      return cardItem;
    });
    setColumns(
      columns.map((column: any) => {
        if (column.id === columnId) {
          const columnTemp = Object.assign(column, { cards: cardsDB });
          return columnTemp;
        }
        return column;
      })
    );
  };
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
          const columnId = doc.id;
          const column = {
            id: columnId,
            ...doc.data(),
            cards: [],
          };
          columnsDB.unshift(column);
          setColumns([...columnsDB]);
          // getCardList(columnId);
          // getCardList(columnId).then((cards) => {
          //   const column = {
          //     id: columnId,
          //     ...doc.data(),
          //     cards,
          //   };
          //   columnsDB.unshift(column);
          //   setColumns([...columnsDB]);
          // });
        });
      })
      .then(() => setIsRealtime(true))
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);
  useEffect(() => {
    if (isRealtime) {
      console.log(11, `iam ready for update`, columns);
      columns.forEach((column) => getCardList(column.id));
    }
  }, [isRealtime]);

  const getCardList = (columnId: string) => {
    cardsRef.where("columnId", "==", columnId).onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          const card = { id: change.doc.id, ...change.doc.data() };
          add(card);
          // console.log(columnId, "New city: ", columns, change.doc.data());
        }
        if (change.type === "modified") {
          const card = { id: change.doc.id, ...change.doc.data() };
          update(card);
          console.log(columnId, "Modified city: ", columns, change.doc.data());
        }
        if (change.type === "removed") {
          const card = { id: change.doc.id, ...change.doc.data() };
          remove(card);
          console.log(columnId, "Removed city: ", columns, change.doc.data());
        }
      });
    });
  };

  // const getCardList = (columnId: string) => {
  //   // TODO: get cards by columnId
  //   const cardsDB: any[] = [];
  //   return new Promise((resolve, reject) => {
  //     cardsRef
  //       .where("columnId", "==", columnId)
  //       .get()
  //       .then((snapshot) => {
  //         snapshot.forEach(function (doc) {
  //           const card = {
  //             id: doc.id,
  //             ...doc.data(),
  //           };
  //           cardsDB.push(card);
  //         });
  //         resolve(cardsDB);
  //       })
  //       .catch((error) => {
  //         console.error("Error getting documents: ", error);
  //         reject(error);
  //       });
  //   });
  // };
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
        <DragDropContext
          onDragEnd={(results: MouseEvent) =>
            onDragEnd(results, columns, setColumns)
          }
        >
          {columns &&
            columns.map((column) => (
              <Grid
                key={"column-" + column.id}
                item
                xs={12}
                sm={4}
                className={classes.column}
              >
                <Column
                  column={column}
                  cards={column.cards}
                  onHandler={(action: string, card: any) =>
                    onHandler(action, card)
                  }
                ></Column>
              </Grid>
            ))}
        </DragDropContext>
      </Grid>
    </div>
  );
};

export default BoardDetail;
