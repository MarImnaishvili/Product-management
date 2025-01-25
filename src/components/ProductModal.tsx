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
import { Product, ProductModalProps, TcategoryObject } from "../types";
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      ...rowData,
      productCategories: rowData?.productCategories || [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [categories, setCategories] = useState<TcategoryObject>([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    []
  );

  const isFieldDisabled = mode === "view";
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch categories when modal opens
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

  useEffect(() => {
    if (open) {
      // Reset the form fields when modal opens
      reset(rowData || {}); // Reset form with the rowData if available

      setGeneralError(null); // Clear general error when modal opens

      if (mode === "New") {
        // In "new" mode, reset selected categories to an empty array
        setSelectedCategoryNames([]);
        setValue("productCategories", []); // Clear productCategories
      } else if (rowData?.productCategories) {
        // If rowData exists (edit mode), set the selected categories
        const selectedNames = rowData.productCategories.map(
          (category) => category.name
        );
        setSelectedCategoryNames(selectedNames);
        setValue("productCategories", rowData.productCategories); // Set productCategories in form
      }
    }
  }, [open, rowData, reset, mode, setValue]);

  const onSubmit = async (data: Product) => {
    setIsLoading(true);
    setGeneralError(null); // Clear previous errors
    try {
      // Map productCategories to the expected format with id, name, and code
      const categoriesWithDetails = data.productCategories
        .map((category) => {
          const categoryDetail = categories.find(
            (cat) => cat.name === category.name // Match category by name
          );
          return categoryDetail
            ? {
                id: categoryDetail.id,
                name: categoryDetail.name,
                code: categoryDetail.code,
              } // Ensure id is '1'
            : null;
        })
        .filter((item) => item !== null); // Remove any null values

      // Update the productCategories field with the mapped data
      const updatedData = { ...data, productCategories: categoriesWithDetails };

      onSave(updatedData);
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
                  {...field}
                  value={selectedCategoryNames} // Value should be an array of category names
                  onChange={(selectedNames) => {
                    setSelectedCategoryNames(selectedNames); // Update selected category names
                    console.log("Setting productCategories:", selectedNames);
                    setValue(
                      "productCategories",
                      selectedNames
                        .map((name) => {
                          const category = categories.find(
                            (cat) => cat.name === name
                          );
                          if (category) {
                            return {
                              name: category.name,
                              id: category.id,
                              code: category.code,
                            };
                          }
                          return null;
                        })
                        .filter((item) => item !== null) // Remove null values
                    );
                    console.log(
                      "Updated productCategories:",
                      getValues("productCategories")
                    );
                  }}
                  options={categories.map((category) => category.name)} // Display category names
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
                multiline
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
                type="number"
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
                type="number"
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
                type="number"
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
                    onChange={(e) => field.onChange(e.target.checked)}
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
