import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { PropsActionComponentProps, Product } from "../types";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";

export const PropsActionComponent: React.FC<PropsActionComponentProps> = ({
  data,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const openModal = (mode: "view" | "edit") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };
  const handleView = () => openModal("view");
  const handleEdit = () => openModal("edit");

  if (!data) {
    // If `data` is undefined, do not render the modal actions
    return null;
  }

  return (
    <>
      <DialogActions>
        <Tooltip title="View Details">
          <IconButton
            onClick={handleView} // Pass `data` as the second argument
            color="primary"
            aria-label="View details"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={handleEdit} // Pass `data` as the second argument
            color="secondary"
            aria-label="Edit"
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </DialogActions>

      {isModalOpen && (
        <ProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={onSave}
          rowData={data as Product}
          mode={modalMode}
        />
      )}
    </>
  );
};

/*<Tooltip title={data.active ? "Deactivate" : "Activate"}>
  <IconButton
    onClick={() => onSave({ ...data, active: !data.active })} // Directly toggle active
    color={data.active ? "default" : "success"}
    aria-label="Toggle active status"
  >
    {data.active ? <Cancel /> : <CheckCircle />}
  </IconButton>
</Tooltip>;*/
