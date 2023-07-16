import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  Theme,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AdminPanelSettings,
  Person,
} from "@mui/icons-material";
import { logOut } from "../firebase";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Providers";
import { Actions } from "../model";
import { AppBarTexts } from "../MetaData";

export const Header = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { removeUser, isAdmin } = useAuth();
  const [, dispatch] = useStore();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logUserOut = () => {
    logOut().then(() => {
      removeUser();
      navigate("/login");
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={matches ? "h-16" : "h-12"}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch({
                type: Actions.SIDEBAR,
              })
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {AppBarTexts.title}
          </Typography>
          <Box display="flex" alignItems="center">
            {matches ? (
              <Typography variant="body2">
                {isAdmin ? AppBarTexts.admin : "user"}
              </Typography>
            ) : null}
            <IconButton sx={{ color: "white" }} onClick={handleMenu}>
              {isAdmin ? <AdminPanelSettings /> : <Person />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="logout-menu"
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logUserOut}>{AppBarTexts.logout}</MenuItem>
      </Menu>
    </>
  );
};
