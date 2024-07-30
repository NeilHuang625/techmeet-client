import "./App.css";
import Register from "./Register";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from "./ProtectedRoute";
import Hello from "./Hello";

const domain = "dev-3iua4wp6ipn277tf.us.auth0.com";
const clientId = "qQms35tNWo4lAenciwG0UiZbBE3lqPWP";

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="hello"
            element={
              <ProtectedRoute>
                <Hello />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
