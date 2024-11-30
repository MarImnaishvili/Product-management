import { useState } from "react";
import { PropsModal } from "./PropsModal";
import { Post, PropsActionComponentProps } from "../types";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import { Visibility, Edit, CheckCircle, Cancel } from "@mui/icons-material";

export function PropsActionComponent({
  data,
  onSave,
}: PropsActionComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Post>(data);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "toggleActive">(
    "view"
  );

  const openModal = (mode: "view" | "edit" | "toggleActive", data: Post) => {
    setModalData(data);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleEdit = () => openModal("edit", data);
  const handleView = () => openModal("view", data);
  const handleToggleActive = () =>
    openModal("toggleActive", { ...data, active: !data.active });

  const handleClick = () => {
    console.log("Calling onSave from PropsActionComponent:", onSave);
    onSave(data);
  };

  return (
    <>
      <DialogActions>
        <button onClick={handleClick}>Save</button>;
        <Tooltip title="View Details">
          <IconButton
            onClick={handleView}
            color="primary"
            aria-label="View details"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={handleEdit} color="secondary" aria-label="Edit">
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={data.active ? "Deactivate" : "Activate"}>
          <IconButton
            onClick={handleToggleActive}
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
          modalData={modalData}
          setModalData={setModalData}
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
        />
      )}
    </>
  );
}
