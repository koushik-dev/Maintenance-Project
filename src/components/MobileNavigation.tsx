import { Paper, BottomNavigationAction, BottomNavigation } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigationTexts } from "../MetaData";
import * as MuiIcon from "@mui/icons-material";

const generateIcon = (variation: keyof typeof MuiIcon, props = {}) => {
  const IconName = MuiIcon[variation];
  return IconName ? <IconName {...props} /> : <>...</>;
};
export const MobileNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={BottomNavigationTexts.options.findIndex(
          (v) => v.route === pathname
        )}
        onChange={(_, index) => {
          navigate(BottomNavigationTexts.options[index].route);
        }}
      >
        {BottomNavigationTexts.options.map(({ name, icon }) => (
          <BottomNavigationAction
            key={name}
            label={name}
            icon={generateIcon(icon as keyof typeof MuiIcon)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
