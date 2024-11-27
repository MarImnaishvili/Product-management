import { useState } from "react";
import { PropsModal } from "./PropsModal";
import { Post } from "../types";
import { DialogActions, IconButton } from "@mui/material";
import { Visibility, Edit, CheckCircle, Cancel } from "@mui/icons-material";

interface PropsActionComponentProps {
  data: Post;
  onSave: (updatedPost: Post) => void; // onSave is passed from PostComponent
}

export function PropsActionComponent({
  data,
  onSave,
}: PropsActionComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Post>(data);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "toggleActive">(
    "view"
  );

  const handleEdit = () => {
    setModalData(data);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleView = () => {
    setModalData(data);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleToggleActive = () => {
    setModalData({ ...data, active: !data.active });
    setModalMode("toggleActive");
    setIsModalOpen(true);
  };

  return (
    <>
      <DialogActions>
        <IconButton onClick={handleView} color="primary">
          <Visibility />
        </IconButton>

        <IconButton onClick={handleEdit} color="secondary">
          <Edit />
        </IconButton>

        <IconButton
          onClick={handleToggleActive}
          color={data.active ? "default" : "success"}
        >
          {data.active ? <Cancel /> : <CheckCircle />}
        </IconButton>
      </DialogActions>

      {isModalOpen && (
        <PropsModal
          open={isModalOpen}
          rowData={data}
          onClose={() => setIsModalOpen(false)}
          modalData={modalData}
          setModalData={setModalData}
          mode={modalMode}
          onSave={onSave} // Pass onSave to PropsModal
        />
      )}
    </>
  );
}
