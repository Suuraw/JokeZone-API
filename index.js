import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));//very import to enable css file to ur code
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs", { joke: false });
});
app.post("/get-joke", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    res.json({
      setup: response.data.setup,
      punchline:response.data.delivery,
    })
  } catch (error) {
    res.render("index.ejs", { joke: error.message });
  }
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
