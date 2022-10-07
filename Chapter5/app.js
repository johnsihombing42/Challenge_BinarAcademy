//challenge_chapter 4
//Binar Academy X Kampus Merdeka
//Mentor : Kak Tatang
//Student : John Tri Putra Sihombing

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const app = express();
const biodataRouter = require("./routes/userBiodata");

const { HTTP_PORT = 3000 } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

app.listen(HTTP_PORT, () => console.log("listening on port", HTTP_PORT));

// sequelize model:generate --name user_game --attributes username:string,password:string
// sequelize model:generate --name user_game_biodata --attributes id_user:integer,name:string,email:string,address:string,phone:string
// sequelize model:generate --name user_game_history --attributes id_user:integer,time_list:integer,score:integer
