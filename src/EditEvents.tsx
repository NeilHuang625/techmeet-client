import NavBar from "./Components/NavBar";
import { Container, Stack } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Contexts/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import EditEventCard from "./Components/EditEventCard";
import axios from "axios";

const EditEvents = () => {
  const { events, setEvents } = useContext(AppContext);
  const { user, isLoading } = useAuth0();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      console.log(user);
      setUserId(user?.sub);
    }
  }, [isLoading, user]);

  const userEvents = events.filter((event) => event.userId === userId);

  const handleDelete = async (eventId: string) => {
    console.log("delete event", eventId);
    try {
      // Delete the event
      const response = await axios.delete(
        `http://localhost:5184/api/event/${eventId}`
      );
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }

    // Update the events
    const updatedEvents = events.filter((event) => event.eventId !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <h2>Your Posted Events</h2>
        <Stack spacing={3}>
          {userEvents.map((event, index) => (
            <EditEventCard key={index} event={event} onDelete={handleDelete} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default EditEvents;
