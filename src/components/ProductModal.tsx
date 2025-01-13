/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Product, ProductModalProps } from "../types";
import { useEffect } from "react";
import { ProductService } from "../services/ProductService";

const categoryOptions = ["Electronics", "Smartphone"];

export const ProductModal = ({
  rowData,
  onClose,
  open,
  onSave,
  mode,
}: ProductModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      id: undefined,
      productCode: "",
      productName: "",
      productCategory: "",
      productVendor: "",
      productDescription: "",
      productQtyInStock: 0,
      productPrice: 0,
      msrp: 0,
      isAvailable: false,
    },
  });

  useEffect(() => {
    if (open) {
      reset(rowData || {});
    }
  }, [open, rowData, reset]);

  const onSubmit = async (data: Product) => {
    try {
      if (mode === "edit") {
        await ProductService.updateProduct(data);
      } else {
        await ProductService.addNewProduct(data);
      }
      onSave(data);
      onClose();
    } catch (error: any) {
      // Handle server validation errors
      if (error.type === "ProductCodeExist") {
        setError("productCode", { type: "server", message: error.details });
      } else if (error.type === "ProductPriceInValid") {
        setError("productPrice", { type: "server", message: error.details });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="productCode"
            control={control}
            rules={{ required: "Product Code is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Code"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productCode}
                helperText={errors.productCode?.message}
              />
            )}
          />
          <Controller
            name="productName"
            control={control}
            rules={{ required: "Product Name is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productName}
                helperText={errors.productName?.message}
                disabled={mode === "view"}
              />
            )}
          />

          {/* Dropdown for Product Category */}
          <Controller
            name="productCategory"
            control={control}
            rules={{ required: "Product Category is required." }}
            render={({ field }) => (
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.productCategory}
              >
                <InputLabel>Product Category</InputLabel>
                <Select {...field} label="Product Category">
                  {categoryOptions.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.productCategory && (
                  <FormHelperText>
                    {errors.productCategory?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="productVendor"
            control={control}
            rules={{ required: "Product Vendor is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Vendor"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productVendor}
                helperText={errors.productVendor?.message}
                disabled={mode === "view"}
              />
            )}
          />
          <Controller
            name="productDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Description"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productDescription}
                helperText={errors.productDescription?.message}
                disabled={mode === "view"}
              />
            )}
          />
          <Controller
            name="productQtyInStock"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity in Stock"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productQtyInStock}
                helperText={errors.productQtyInStock?.message}
                disabled={mode === "view"}
              />
            )}
          />
          <Controller
            name="productPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Price"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productPrice}
                helperText={errors.productPrice?.message}
                disabled={mode === "view"}
              />
            )}
          />
          <Controller
            name="msrp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="MSRP"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.msrp}
                helperText={errors.msrp?.message}
                disabled={mode === "view"}
              />
            )}
          />

          {/* Checkbox for Is Available */}
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    disabled={mode === "view"} // Disable if in 'view' mode
                  />
                }
                label="Is Available"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          {mode !== "view" && (
            <Button type="submit" color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
