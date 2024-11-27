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
  // Check if the date is in the 'YYYY-MM-DD' format (ISO format)
  if (date.includes("-")) {
    const parsedDate = new Date(date);

    // Check if the date is a valid date object
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid Date object:", parsedDate);
      return ""; // Return empty string if the date is invalid
    }

    // If it's a valid date, return the date in 'YYYY-MM-DD' format
    return parsedDate.toISOString().split("T")[0];
  }

  // Otherwise, assume the date is in 'MM/DD/YYYY' format
  const dateParts = date.split("/");
  if (dateParts.length !== 3) {
    console.error("Invalid date format:", date);
    return ""; // Return an empty string if the format is incorrect
  }

  const [month, day, year] = dateParts.map(Number);

  // Validate the individual parts
  if (
    isNaN(month) ||
    isNaN(day) ||
    isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    console.error("Invalid date values:", { month, day, year });
    return ""; // Return an empty string if the values are invalid
  }

  // Create a new Date object
  const formattedDate = new Date(year, month - 1, day);

  // Check if the Date object is valid
  if (isNaN(formattedDate.getTime())) {
    console.error("Invalid Date object:", formattedDate);
    return ""; // Return an empty string if the Date object is invalid
  }

  // Return the formatted date as 'YYYY-MM-DD'
  return formattedDate.toISOString().split("T")[0];
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
