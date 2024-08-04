import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Input,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavBar from "./Components/NavBar";
import dayjs from "dayjs";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startTime, setStartTime] = useState<string>(
    dayjs().format("YYYY-MM-DDTHH:mm")
  );
  const [endTime, setEndTime] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  // Inputs validation
  const [titleError, setTitleError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [maxParticipantsError, setMaxParticipantsError] = useState(false);

  const validateInput = () => {
    setTitleError(title === "");
    setLocationError(location === "");
    setStartTimeError(startTime === "");
    setEndTimeError(endTime === "");
    setDescriptionError(description === "");
    setMaxParticipantsError(maxParticipants === 0);

    if (
      title === "" ||
      location === "" ||
      startTime === "" ||
      endTime === "" ||
      description === "" ||
      maxParticipants === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    // Send data to the server
    const formData = new FormData();

    if (imageFile) {
      formData.append("File", imageFile);
    }

    formData.append("Title", title);
    formData.append("Location", location);
    formData.append("StartTime", startTime);
    formData.append("EndTime", endTime);
    formData.append("MaxParticipants", maxParticipants.toString());
    formData.append("Description", description);
    if (!isLoading) {
      formData.append("UserId", user?.sub || "");
    }

    console.log("formData", Array.from(formData.entries()));

    try {
      const response = await axios.post(
        "http://localhost:5184/api/event",
        formData
      );
      console.log("response", response.data);

      // Redirect to the edit-events page with the userId
      navigate("/edit-events");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files && e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography fontSize={18} marginBottom={2}>
          Create Event
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            error={titleError}
            helperText={titleError && "Title is required"}
            label="Event Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            error={locationError}
            helperText={locationError && "Location is required"}
            label="Event Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                error={startTimeError}
                helperText={startTimeError && "Start time is required"}
                label="Start Time"
                variant="outlined"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={endTimeError}
                helperText={endTimeError && "End time is required"}
                label="End Time"
                variant="outlined"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={maxParticipantsError}
                helperText={
                  maxParticipantsError && "Max participants is required"
                }
                label="Max Participants"
                variant="outlined"
                type="number"
                value={maxParticipants}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 0) {
                    setMaxParticipants(value);
                  }
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            error={descriptionError}
            helperText={descriptionError && "Description is required"}
            label="Event Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 2,
              height: "220px",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "1em",
            }}
          >
            <Stack spacing={3}>
              <InputLabel htmlFor="input-file">Upload Event Image</InputLabel>
              <Input id="input-file" type="file" onChange={handleImageChange} />
            </Stack>
            {image ? (
              <img
                src={image}
                alt="Event"
                style={{ width: "300px", height: "200px" }}
              />
            ) : (
              <Box
                sx={{
                  width: "300px",
                  height: "200px",
                  border: "1px dashed gray",
                  backgroundColor: "#e2e8f0",
                }}
              />
            )}
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}
          >
            <Button
              variant="contained"
              sx={{ maxWidth: "200px" }}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateEvent;
