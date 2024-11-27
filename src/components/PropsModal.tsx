import React, { useEffect } from "react";
import { Post } from "../types";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Button, // Import Button for Save
} from "@mui/material";

interface PropsModalProps {
  rowData: Post;
  onClose: () => void;
  open: boolean;
  modalData: Post;
  setModalData: React.Dispatch<React.SetStateAction<Post>>;
  mode: "view" | "edit" | "toggleActive";
  onSave: (updatedPost: Post) => void; // onSave prop for saving the post
}

// Convert MM/DD/YYYY string to YYYY-MM-DD format
const formatDate = (date: string): string => {
  const dateParts = date.split("/");
  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]);
  const day = Number(dateParts[2]);
  return new Date(year, month - 1, day).toISOString().split("T")[0]; // Returns YYYY-MM-DD
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
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveChanges = () => {
    onSave(modalData); // Save the updated data by calling onSave
    onClose(); // Close the modal after saving
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

        {/* Date field */}
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

        {/* Active checkbox */}
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
        <Button onClick={handleSaveChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
