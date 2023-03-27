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

const Answers = () => {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [opencorrect, setOpencorrect] = useState(false);
  const [openwrong, setOpenwrong] = useState(false);

  const handleOpen = () => setOpencorrect(true);
  const handleClosecorrect = () => setOpencorrect(false);
  const handleClosewrong = () => setOpenwrong(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("answers")
      .add({
        name: name,
        answer: answer,
      })
      .then(() => {
        if (answer === "Vibhava") {
          setOpencorrect(true);
        } else if (answer !== "Vibhava") {
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

  return (
    <div className="main-container">
      {/* wrong modal */}
      <Modal open={openwrong} onClose={handleClosewrong}>
        <Box sx={style}>
          <Grid container direction="column" alignItems="center">
            <Typography align="center">Wrong Answer</Typography>
            <Button
              onClick={handleClosewrong}
              variant="contained"
              sx={{ maxWidth: "10rem", mt: "2rem", mb: "1rem" }}
            >
              Try Again
            </Button>
          </Grid>
        </Box>
      </Modal>
      {/* right modal */}
      <Modal open={opencorrect} onClose={handleClosecorrect}>
        <Box sx={style}>
          <Grid container direction="column" alignItems="center">
            <Typography align="center">
              Congratulations...Your answer is correct
            </Typography>
            <Button
              onClick={handleClosecorrect}
              variant="contained"
              sx={{ maxWidth: "10rem", mt: "2rem", mb: "1rem" }}
            >
              Ok
            </Button>
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
                  defaultValue=""
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
                  defaultValue=""
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
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Answers;
