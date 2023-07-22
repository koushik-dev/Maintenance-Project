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
  const generateTimeline = (duration: "month" | "year") => {
    const getMonthStr = (month: number) => {
      const date = new Date(new Date().getFullYear(), month);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    };
    if (duration === "month")
      return Array(12)
        .fill(0)
        .map((_, i) => ({ id: i + 4, name: getMonthStr(i + 3) }));
    else
      return Array(5)
        .fill(new Date().getFullYear())
        .map((y, i) => ({
          id: y + (i - 5),
          name: y + (i - 5) + "-" + (y + (i - 5) + 1),
        }));
  };
  return (
    <FormControl sx={{ minWidth: 120, flex: 2 }}>
      <Select size="small" value={value.toString()} onChange={onChange}>
        {generateTimeline(duration).map(({ id, name }) => (
          <MenuItem key={name} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
