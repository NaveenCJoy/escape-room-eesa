import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { pink, red } from "@mui/material/colors";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import AlarmIcon from "@mui/icons-material/Alarm";

import { db } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const styleTimeout = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

let checking = "none";
let cardDisplay = "block";

const Answers = () => {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [opencorrect, setOpencorrect] = useState(false);
  const [openwrong, setOpenwrong] = useState(false);
  const [opentimeout, setOpentimeout] = useState(false);

  const handleOpen = () => setOpencorrect(true);
  const handleClosecorrect = () => setOpencorrect(false);
  const handleClosewrong = () => setOpenwrong(false);
  const opentimeoutModal = () => {
    setOpentimeout(true);
    cardDisplay = "none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checking = "block";
    db.collection("answers")
      .add({
        name: name,
        answer: answer,
      })
      .then(() => {
        checking = "none";
        if (answer === "Vibhava") {
          setOpencorrect(true);
        } else if (answer === "vibhava") {
          setOpencorrect(true);
        } else {
          setOpenwrong(true);
        }
        // alert("Your answer was submitted");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setAnswer("");
  };

  setTimeout(opentimeoutModal, 900000);

  return (
    <div className="main-container">
      {/* wrong modal */}
      <Modal open={openwrong} onClose={handleClosewrong}>
        <Box sx={style}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <DangerousIcon sx={{ color: red[500], fontSize: 80 }} />
            </Grid>
            <Grid item>
              <Typography align="center" sx={{ fontWeight: "bold" }}>
                Wrong Answer
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClosewrong}
                variant="contained"
                sx={{ maxWidth: "10rem", mt: "2rem", mb: "1rem" }}
              >
                Try Again
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* timeout modal */}
      <Modal open={opentimeout} onClose={setOpentimeout}>
        <Box sx={styleTimeout}>
          <Grid container direction="column">
            <Grid item align="center">
              <AlarmIcon sx={{ color: red[500], fontSize: 80 }} />
            </Grid>
            <Grid item>
              <Typography align="center" justifyContent="center">
                Your time is over.
              </Typography>
            </Grid>
            <Grid item sx={{ mt: "2rem", mx: "3rem" }}>
              <Typography align="center">
                Thank you for participating. Please follow the instructions of
                organizers and leave the room
              </Typography>
            </Grid>

            {/* <Button
              onClick={handleClosecorrect}
              variant="contained"
              sx={{ maxWidth: "10rem", mt: "2rem", mb: "1rem" }}
            >
              Ok
            </Button> */}
          </Grid>
        </Box>
      </Modal>
      {/* Timeout Modal */}
      <Modal open={opencorrect} onClose={handleClosecorrect}>
        <Box sx={style}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item sx={{ mt: "1rem" }}>
              <Typography align="center" sx={{ fontWeight: "bold" }}>
                Good job !
              </Typography>
              <Typography sx={{ mt: "1rem" }}>
                Your answer is correct
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClosecorrect}
                variant="contained"
                sx={{ maxWidth: "10rem", mt: "2rem", mb: "1rem" }}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item align="center" sx={{ mt: "3rem" }}>
          <Card
            sx={{
              color: "white",
              width: "50rem",
              height: "30rem",
              borderRadius: 5,
              display: cardDisplay,
            }}
          >
            <form id="submit-form" onSubmit={handleSubmit}>
              <CardContent>
                <Typography sx={{ color: "black", fontSize: "5rem" }}>
                  ESCAPE ROOM
                </Typography>
                <Typography sx={{ color: "black" }}>
                  Submit your answer here
                </Typography>
              </CardContent>
              <CardContent>
                <TextField
                  required
                  id="name"
                  label="Name of Team"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ width: "20rem" }}
                />
              </CardContent>
              <CardContent>
                <TextField
                  required
                  id="answer"
                  label="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  sx={{ width: "20rem" }}
                />
              </CardContent>
              <CardContent>
                <Button type="Submit" variant="contained">
                  Submit
                </Button>
              </CardContent>
              <CardContent>
                <Typography
                  sx={{
                    color: "black",
                    fontStyle: "Italic",
                    display: checking,
                  }}
                >
                  Checking your answer...Please wait
                </Typography>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Answers;
