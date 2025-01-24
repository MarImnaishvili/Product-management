/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IcategoryInProduct, Product, ProductModalProps } from "../types";
import { ProductService } from "../services/ProductService";
import { useSnackbar } from "notistack";
import MultipleSelectCheckmarks from "./CheckProductCategories";

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
      productCategories: [],
      productVendor: "",
      productDescription: "",
      productQtyInStock: 0,
      productPrice: 0,
      msrp: 0,
      isAvailable: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  // let categories: string[];

  const isFieldDisabled = mode === "view";
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      reset(rowData || {});
      setGeneralError(null); // Clear general error when modal opens
    }
  }, [open, rowData, reset]);

  const onSubmit = async (data: Product) => {
    setIsLoading(true);
    setGeneralError(null); // Clear previous errors
    try {
      if (mode === "edit") {
        await ProductService.updateProduct(data);
      } else {
        await ProductService.addNewProduct(data);
      }
      onSave(data);
      enqueueSnackbar("Product saved successfully!", { variant: "success" });
      onClose();
    } catch (error: any) {
      const message =
        error.details || "An unexpected error occurred. Please try again.";

      // Handle field-specific errors
      if (error.type === "ProductCodeExist") {
        setError("productCode", { type: "server", message });
      } else if (error.type === "ProductPriceInValid") {
        setError("productPrice", { type: "server", message });
      } else {
        // Set general error message
        setGeneralError(message);
      }
      enqueueSnackbar("Failed to save product. Please try again.", {
        variant: "error", // Error notification
      });
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const result: string[] = await ProductService.getAllProductCategories();
  //       console.log(result);
  //       // Ensure the categories are unique
  //       categories = result;
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await ProductService.getAllProductCategories();
        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {generalError && (
            <p style={{ color: "red", marginBottom: "1em" }}>{generalError}</p>
          )}
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
                disabled={isFieldDisabled}
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
                disabled={isFieldDisabled}
              />
            )}
          />

          {/* Dropdown for Product Category */}
          <Controller
            name="productCategories"
            control={control}
            rules={{ required: "Product Category is required." }}
            render={({ field }) => (
              <div>
                <MultipleSelectCheckmarks
                  value={(field.value as IcategoryInProduct[]).map(
                    (cat) => cat.name
                  )}
                  onChange={(event) => {
                    // Map the selected category names back to IcategoryInProduct objects if necessary
                    field.onChange(
                      event.map((category: string) => ({
                        id: category,
                        name: category, // Set the name as the category string
                      }))
                    );
                  }}
                  isDisabled={isFieldDisabled}
                  options={categories} // Assuming categories are just strings
                />
                {errors.productCategories && (
                  <FormHelperText error>
                    {errors.productCategories?.message}
                  </FormHelperText>
                )}
              </div>
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
                disabled={isFieldDisabled}
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
                disabled={isFieldDisabled}
              />
            )}
          />
          <Controller
            name="productQtyInStock"
            control={control}
            rules={{
              required: "Product QtyInStock is required.",
              min: { value: 0, message: "Price must be a positive number." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity in Stock"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productQtyInStock}
                helperText={errors.productQtyInStock?.message}
                disabled={isFieldDisabled}
              />
            )}
          />
          <Controller
            name="productPrice"
            control={control}
            rules={{
              required: "Product Price is required.",
              min: { value: 0, message: "Price must be a positive number." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Price"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.productPrice}
                helperText={errors.productPrice?.message}
                disabled={isFieldDisabled}
              />
            )}
          />
          <Controller
            name="msrp"
            control={control}
            rules={{
              required: "Product msrp is required.",
              min: { value: 0, message: "Price must be a positive number." },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="MSRP"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.msrp}
                helperText={errors.msrp?.message}
                disabled={isFieldDisabled}
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
                    disabled={isFieldDisabled}
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
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircularProgress size={20} style={{ marginRight: 8 }} />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
