import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions } from "@mui/material";

export const Modal = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={props.maxWidth || "sm"}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        {props.idForm && (
          <Button type="submit" form={props.idForm} onClick={props.onSubmit}>
            Register
          </Button>
        )}

        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
