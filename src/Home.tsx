import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log(user);
  console.log(isAuthenticated);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
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
