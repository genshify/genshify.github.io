import express from "express";
import { Wrapper } from "enkanetwork.js";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//enka-network-api

app.use(express.json());

const { genshin} = new Wrapper({
  cache: true
});
genshin
  .getPlayer(738081787)
  .then((player) => console.log(player.characters))
  .catch((err) => console.log(err));

// const showDetails = () => {
// try {
//   const enka = new EnkaClient();
//   enka.fetchUser(825436941).then((user) => {
//     console.log(hi);;
//   });
// } catch (error) {
//     console.log(error);
// }
// }

// app.get("/",(req,res) => {

//   res.send(showDetails());
// });
