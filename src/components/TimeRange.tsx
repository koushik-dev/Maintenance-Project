import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export const TimeRange: React.FC<{
  value: string | number;
  onChange: (e: SelectChangeEvent) => void;
  duration: "month" | "year";
}> = ({ value, onChange, duration }) => {
  return (
    <FormControl sx={{ minWidth: 120, flex: 2 }}>
      <Select size="small" value={value.toString()} onChange={onChange}>
        {[
          { id: 7, name: "July 2023" },
          { id: 8, name: "August 2023" },
        ].map(({ id, name }) => (
          <MenuItem key={name} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
