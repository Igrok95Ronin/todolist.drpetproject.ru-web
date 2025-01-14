import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function BasicTextFields() {
  // Состояние для хранения значения из поля ввода
  const [note, setNote] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      note: note,
    };

    try {
      await axios.post("http://localhost:8080/addpost", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Данные успешно отправлены!");
      setNote('')
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке данных.");
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", gap: "10px", marginTop: "10px" }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        label="what needs to be done?"
        id="fullWidth"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button sx={{ backgroundColor: "#499cc1" }} variant="contained" type="submit">
        +
      </Button>
    </Box>
  );
}
