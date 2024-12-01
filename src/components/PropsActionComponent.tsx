import { useState } from "react";
import { PropsModal } from "./PropsModal";
import { PropsActionComponentProps } from "../types";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import { Visibility, Edit, CheckCircle, Cancel } from "@mui/icons-material";

export const PropsActionComponent: React.FC<PropsActionComponentProps> = ({
  data,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "toggleActive">(
    "view"
  );

  const openModal = (mode: "view" | "edit" | "toggleActive") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  if (!data) {
    // If `data` is undefined, do not render the modal actions
    return null;
  }

  return (
    <>
      <DialogActions>
        <Tooltip title="View Details">
          <IconButton
            onClick={() => openModal("view")} // Pass `data` as the second argument
            color="primary"
            aria-label="View details"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => openModal("edit")} // Pass `data` as the second argument
            color="secondary"
            aria-label="Edit"
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={data.active ? "Deactivate" : "Activate"}>
          <IconButton
            onClick={() => onSave({ ...data, active: !data.active })} // Directly toggle active
            color={data.active ? "default" : "success"}
            aria-label="Toggle active status"
          >
            {data.active ? <Cancel /> : <CheckCircle />}
          </IconButton>
        </Tooltip>
      </DialogActions>

      {isModalOpen && (
        <PropsModal
          open={isModalOpen}
          rowData={data}
          modalData={data} // Directly pass `data` as `modalData`
          setModalData={() => {}} // Optional, leave if modal modifies it
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
        />
      )}
    </>
  );
};
