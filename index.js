import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/random/anime");
    const name = response.data.data.title;
    const image_url = response.data.data.images.jpg.large_image_url;
    const anime_url = response.data.data.url;
    const desc = response.data.data.synopsis;
    const dic = { anime: name, image: image_url, url: anime_url, about: desc };
    res.render("index.ejs", dic);
  } catch (error) {
    console.log("i face an error");
    console.log(error.message);
    res.render("index.ejs");
  }
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
