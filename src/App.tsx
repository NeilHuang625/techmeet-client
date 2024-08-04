import Register from "./Register";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from "./Components/ProtectedRoute";
import CreateEvent from "./CreateEvent";
import EditEvents from "./EditEvents";
import { AppContext } from "./Contexts/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";

export interface AppEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  imagePath: string;
  userId: string;
  maxParticipants: string;
}

const domain = "dev-3iua4wp6ipn277tf.us.auth0.com";
const clientId = "qQms35tNWo4lAenciwG0UiZbBE3lqPWP";

function App() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    axios
      .get<AppEvent[]>("http://localhost:5184/api/event")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("there is an error!", err));
  }, []);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AppContext.Provider value={{ events, setEvents }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="create-event"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-events"
              element={
                <ProtectedRoute>
                  <EditEvents />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<Register />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </Auth0Provider>
  );
}

export default App;
