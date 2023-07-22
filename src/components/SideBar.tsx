import * as MuiIcon from "@mui/icons-material";
import {
  Box,
  CSSObject,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SideBarTexts } from "../MetaData";
import { Actions } from "../model";
import { useStore } from "../Providers";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const generateIcon = (variation: keyof typeof MuiIcon, props = {}) => {
  const IconName = MuiIcon[variation];
  return IconName ? <IconName {...props} /> : <>...</>;
};

export const Sidebar: React.FC = () => {
  const [{ isSideBarOpen }, dispatch] = useStore();
  const { pathname } = useLocation();
  return (
    <Drawer
      variant="permanent"
      open={isSideBarOpen}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          {SideBarTexts.options.map(({ name, icon, route }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSideBarOpen ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() =>
                  window.innerWidth <= 900
                    ? dispatch({ type: Actions.SIDEBAR, payload: false })
                    : null
                }
                component={Link}
                to={route}
                selected={pathname === route}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSideBarOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {generateIcon(icon as keyof typeof MuiIcon)}
                </ListItemIcon>
                <ListItemText
                  className="whitespace-break-spaces"
                  primary={name}
                  sx={{ display: isSideBarOpen ? "block" : "none" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
