import React, { useState } from "react";
import {
  Card,
  Typography,
  Tooltip,
  ButtonBase,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import AddIcon from "@material-ui/icons/Add";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconCreateButton: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: theme.palette.secondary.main,
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
    card: {
      padding: 30,
      minHeight: 100,
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px dashed #c0d8d8",
      "&:hover": {
        border: "2px dashed #fd7014",
      },
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
export default function CreateBoard({ onClick }: ICreateBoard) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nameBoard, setNameBoard] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNameBoard("");
    setOpen(false);
  };
  const onCreateBoard = () => {
    onClick(nameBoard);
    handleClose();
  };
  return (
    <>
      <Tooltip title="Click here to create a new board">
        <ButtonBase className={classes.buttonBase} onClick={handleClickOpen}>
          <Card aria-label="create" variant="outlined" className={classes.card}>
            <div className={classes.createButton}>
              <div className={classes.iconCreateButton}>
                <AddIcon className={classes.iconCreate} />
              </div>
              <Typography
                style={{ marginTop: 10 }}
                variant="subtitle2"
                color="secondary"
              >
                Create Board
              </Typography>
            </div>
          </Card>
        </ButtonBase>
      </Tooltip>
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
          {"Create Board"}
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
            onClick={onCreateBoard}
            variant="contained"
            color="secondary"
            className={classes.createButtonDialog}
            disabled={!nameBoard}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
interface ICreateBoard {
  onClick: (nameBoard: string) => void;
}
