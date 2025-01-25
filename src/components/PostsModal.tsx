/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
  onSave,
  mode,
}) => {
  const [modalData, setModalData] = useState(rowData);

  useEffect(() => {
    if (open) {
      setModalData(rowData); // Reset modal data on open
    }
  }, [open, rowData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setModalData((prevData: any) => {
      if (prevData) {
        return {
          ...prevData,
          [name]:
            type === "checkbox"
              ? checked
              : type === "number"
              ? Number(value)
              : value,
        };
      }
      return null;
    });
  };

  const handleSaveChanges = () => {
    if (modalData) {
      onSave(modalData); // Ensure modalData is passed correctly
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "edit" ? "Edit Post" : "View Post"}</DialogTitle>
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
