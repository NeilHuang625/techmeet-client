import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Typography, Box } from "@mui/material";
import AccountMenu from "./AccountMenu";
import ToggleThemeButton from "./ToggleThemeButton";
import { useTheme } from "../Contexts/ThemeProvider";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  return (
    <Box borderBottom={1} borderColor="#bdbdbd" boxShadow={1} borderRadius={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="h4" paddingLeft={2}>
            TechMeet
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Events"
              inputProps={{ "aria-label": "search events" }}
              value={search}
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs>
          {/* This is an empty Grid item to take up the remaining space */}
        </Grid>
        <Grid item xs={2}>
          <AccountMenu />
        </Grid>
        <Grid item xs={2}>
          <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
