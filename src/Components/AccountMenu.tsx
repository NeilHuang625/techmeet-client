import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CircularProgress } from "@mui/material";

export default function AccountMenu() {
  const { user, isAuthenticated, logout, isLoading, loginWithRedirect } =
    useAuth0();
  const profileName = user?.name?.slice(0, 2).toUpperCase();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // for the Avatar Icon
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null); // for the custom button
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={30} />
        </Box>
      ) : isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Button
            color="inherit"
            aria-controls="event-button"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl2(event.currentTarget)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Event
          </Button>
          <Tooltip title="Account">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{profileName}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Button
            color="inherit"
            variant="text"
            onClick={() => loginWithRedirect({ screen_hint: "login" } as any)}
          >
            Login
          </Button>
          <Button
            color="inherit"
            variant="text"
            onClick={() => loginWithRedirect({ screen_hint: "signup" } as any)}
          >
            Sign up
          </Button>
        </Box>
      )}
      <Menu
        id="event-button"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={() => setAnchorEl2(null)}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/create-event");
          }}
        >
          <AddIcon fontSize="inherit" />
          Create
        </MenuItem>
        <MenuItem>
          <VisibilityIcon fontSize="inherit" />
          View Events
        </MenuItem>
        <MenuItem>
          <EditIcon fontSize="inherit" />
          Edit Events
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
