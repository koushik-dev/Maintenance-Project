import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Backdrop open sx={{ zIndex: 1 }}>
      <CircularProgress />
    </Backdrop>
  );
};
