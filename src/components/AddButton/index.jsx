import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddButton = ({ onAdd }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "1.5rem" }}
        onClick={onAdd}
      >
        <AddIcon />
      </Button>
    </>
  );
};
