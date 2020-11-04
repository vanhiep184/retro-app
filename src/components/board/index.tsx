import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateBoard from "./create";
import dayjs from "dayjs";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { red } from "@material-ui/core/colors";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { notify, ToastContainer } from "../toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    iconCreateButton: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: theme.palette.info.dark,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    iconCreate: {
      color: theme.palette.common.white,
    },
    createButton: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    buttonBase: {
      minHeight: 100,
      height: "100%",
      width: "100%",
    },
    createButtonDialog: {
      color: theme.palette.common.white,
    },
    closeButton: {
      fontSize: 20,
      position: "absolute",
      right: 10,
      top: 10,
      cursor: "pointer",
    },
  })
);
interface IBoard {
  board: any;
  [key: string]: any;
  onClick: (action: string, board: any) => void;
}

export default function Board({ board, onClick }: IBoard) {
  const classes = useStyles();
  const history = useHistory();
  const [isRaising, setIsRaising] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [nameBoard, setNameBoard] = useState("");
  const goToDetail = (id: any) => {
    history.push(`/board/${id}`);
  };

  const onClickEdit = () => {
    const nameBoard = board.title;
    setNameBoard(nameBoard);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onUpdateBoard = () => {
    const boardDB = Object.assign(board, { title: nameBoard });
    onClick("update", boardDB);
    handleClose();
  };
  const onRemoveBoard = () => {
    onClick("remove", board);
  };
  const onShare = () => {
    notify("Board URL copied! Share it with people to collaborate.", "success");
  };
  return (
    <>
      <ToastContainer />
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
            onClick={onClickEdit}
            startIcon={<EditIcon color="secondary" fontSize="inherit" />}
          >
            edit
          </Button>
          <CopyToClipboard
            text={`https://retro-lvh.web.app/board/${board.id}`}
            onCopy={onShare}
          >
            <Button
              fullWidth
              size="small"
              color="primary"
              aria-label="share board"
              startIcon={<ShareIcon fontSize="inherit" />}
            >
              share
            </Button>
          </CopyToClipboard>
          <IconButton
            size="small"
            color="primary"
            aria-label="delete"
            onClick={onRemoveBoard}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ textAlign: "center", minWidth: 400 }}
        >
          {"Edit Board"}
          <CloseRoundedIcon
            className={classes.closeButton}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            value={nameBoard}
            onChange={(e) => setNameBoard(e.target.value)}
            autoComplete="nameBoard"
            name="nameBoard"
            variant="outlined"
            required
            fullWidth
            id="nameBoard"
            placeholder="Input name"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            onClick={onUpdateBoard}
            variant="contained"
            color="secondary"
            className={classes.createButtonDialog}
            disabled={!nameBoard}
          >
            update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { CreateBoard };
