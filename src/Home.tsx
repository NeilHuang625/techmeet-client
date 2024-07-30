import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "./ThemeProvider";
import ToggleThemeButton from "./ToggleThemeButton";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Home</h1>

      <p>Welcome to the home page!</p>
      <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
      <p>
        {isAuthenticated ? (
          <button onClick={() => logout()}>Log out</button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        )}
      </p>
    </div>
  );
};

export default Home;
