const { user_game_history } = require("../models");

// sequelize model:generate --name user_game_history --attributes time_list:integer,score:integer

module.exports = {
  readUserHistory: async (req, res) => {
    try {
      const userGameHistory = await user_game_history.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read All Data",
        data: userGameHistory,
      });
    } catch (err) {
      res.json(err).status(200);
      console.log("Gagal menampilkan data");
    }
  },
  readDetailHistory: async (req, res) => {
    try {
      const { userId } = req.params;
      const userGameHistory = await user_game_history.findOne({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Read Data",
        data: userGameHistory,
      });
    } catch (error) {
      res.json(error).status(422);
    }
  },
  create: async (req, res) => {
    try {
      const { id_user, time_list, score } = req.body;
      const userGameHistory = await user_game_history.create({
        id_user,
        time_list,
        score,
      });
      userGameHistory.save();
      return res.status(200).json({
        status: "success",
        mesage: "Create User Game Success",
        data: userGameHistory,
      });
    } catch (err) {
      res.json(err).status(422);
      console.log("Gagal menambah data");
    }
  },
  update: async (req, res) => {
    try {
      const { id_user, time_list, score } = req.body;
      const { userId } = req.params;
      const userGameHistory = await user_game_history.update(
        {
          id_user,
          time_list,
          score,
        },
        {
          where: { id: userId },
        }
      );
      return res.status(200).json({
        status: "success",
        mesage: "Update data success",
        data: userGameHistory,
      });
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { userId } = req.params;
      const userGameHistory = await user_game_history.destroy({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Delete data success",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
