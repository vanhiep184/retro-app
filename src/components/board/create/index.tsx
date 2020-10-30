import React from "react";
import { Card, Typography, Tooltip, ButtonBase } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  card: {
    minHeight: 100,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBase: {
    minHeight: 100,
    height: "100%",
    width: "100%",
  },
}));
export default function CreateBoard({ onClick }: ICreateBoard) {
  const classes = useStyles();

  return (
    <Tooltip title="Click here to create a new board">
      <ButtonBase className={classes.buttonBase} onClick={() => onClick()}>
        <Card aria-label="create" variant="outlined" className={classes.card}>
          <div className={classes.createButton}>
            <div className={classes.iconCreateButton}>
              <AddIcon className={classes.iconCreate} />
            </div>
            <Typography
              style={{ marginTop: 10 }}
              variant="subtitle2"
              color="textSecondary"
            >
              Create Board
            </Typography>
          </div>
        </Card>
      </ButtonBase>
    </Tooltip>
  );
}
interface ICreateBoard {
  onClick: () => void;
}
