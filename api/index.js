import express from "express";
import { Wrapper } from "enkanetwork.js";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(express.json());


//  enka netowork api
const { genshin} = new Wrapper({
  cache: true
});

app.get("/genshin/player/:id",(req,res) => {
  genshin
  .getPlayer(req.params.id)
  .then((player) => res.json(player))
  .catch((err) => res.json(err));
})