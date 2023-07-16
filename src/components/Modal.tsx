import { Close } from "@mui/icons-material";
import { Dialog, DialogProps, DialogTitle, IconButton } from "@mui/material";
import React from "react";

export const Modal: React.FC<
  DialogProps & {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
> = ({ open, onClose, title, children }) => {
  return (
    <Dialog {...{ open, onClose }} fullWidth>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};
