import { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MultipleSelectCheckmarksProps } from "../types";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Wrap the component with forwardRef to forward refs properly
const MultipleSelectCheckmarks = forwardRef<
  HTMLDivElement,
  MultipleSelectCheckmarksProps
>(({ value, onChange, isDisabled = false, options }, ref) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    onChange(selected);
  };

  return (
    <FormControl sx={{ m: 0, width: "100%" }} disabled={isDisabled} ref={ref}>
      <InputLabel>Product Category</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Product Category" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={value.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default MultipleSelectCheckmarks;
