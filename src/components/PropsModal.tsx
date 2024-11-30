import React, { useEffect } from "react";
import { PropsModalProps } from "../types";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { parse, format, isValid } from "date-fns";

// Simplified date formatting function
const formatDate = (date: string): string => {
  // Try to parse the input date directly in 'yyyy-MM-dd' format
  const parsedDate = isValid(parse(date, "yyyy-MM-dd", new Date()))
    ? parse(date, "yyyy-MM-dd", new Date())
    : parse(date, "MM/dd/yyyy", new Date());

  if (!parsedDate) {
    console.error("Invalid date format:", date);
    return "";
  }

  // Format the date as YYYY-MM-DD
  return format(parsedDate, "yyyy-MM-dd");
};

export const PropsModal: React.FC<PropsModalProps> = ({
  rowData,
  onClose,
  open,
  modalData,
  setModalData,
  mode,
  onSave,
}) => {
  useEffect(() => {
    if (open && rowData) {
      setModalData({ ...rowData });
    }
  }, [open, rowData, setModalData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = () => {
    console.log(onSave);
    if (onSave) {
      console.log("Calling onSave with modalData:", modalData);
      onSave(modalData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        <TextField
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="id"
          value={modalData?.id || ""}
          onChange={handleInputChange}
          disabled={mode === "view"}
        />

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={modalData?.title || ""}
          onChange={handleInputChange}
          disabled={mode === "view"}
        />

        <TextField
          label="Views"
          variant="outlined"
          fullWidth
          margin="normal"
          name="views"
          value={modalData?.views || ""}
          onChange={handleInputChange}
          disabled={mode === "view"}
          type="number"
        />

        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="date"
          value={modalData?.date ? formatDate(modalData?.date) : ""}
          onChange={handleInputChange}
          disabled={mode === "view"}
          type="date"
        />

        {mode !== "view" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={modalData?.active || false}
                onChange={handleInputChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {mode !== "view" && (
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
