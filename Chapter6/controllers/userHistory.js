const { user_game_history } = require("../models");

// sequelize model:generate --time_list user_game_history --attributes time_list:integer,score:integer

module.exports = {
  readUserHistory: async (req, res) => {
    try {
      const userGameHistory = await user_game_history.findAll();
      return res.status(200).json({
        status: true,
        message: "Read All Data history",
      });
    } catch (err) {
      res.json(err).status(200);
      console.log("Gagal menampilkan data");
    }
  },

  //user detail

  //   readDetailHistory: async (req, res) => {
  //     try {
  //       const { userId } = req.params;
  //       const userGameHistory = await user_game_history.findOne({
  //         where: { id: userId },
  //       });
  //       return res.status(200).json({
  //         status: "success",
  //         mesage: "Read Data",
  //         data: userGameHistory,
  //       });
  //     } catch (error) {
  //       res.json(error).status(422);
  //     }
  //   },
  createUserHistory: async (req, res) => {
    try {
      const { id_user, time_list, score } = req.body;
      const userGameHistory = await user_game_history.create({
        id_user,
        time_list,
        score,
      });
      userGameHistory.save();
      return res.status(200).json({
        status: true,
        message: "Create User History Success",
      });
    } catch (err) {
      res.json(err).status(422);
      console.log("Gagal menambah data");
    }
  },

  //update user history
  updateUserHistory: async (req, res) => {
    try {
      const { id_user, time_list, score } = req.body;
      const { userId } = req.params;
      const user = await user_game_history.findAll();
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
        status: true,
        message: "success",
      });
    } catch (err) {
      console.log(err);
    }
  },

  // //delete user history
  deleteUserHistory: async (req, res) => {
    try {
      const { userId } = req.params;
      const userGameHistory = await user_game_history.destroy({
        where: { id: userId },
      });
      return res.status(200).json({
        status: true,
        mesage: "Delete data success",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
