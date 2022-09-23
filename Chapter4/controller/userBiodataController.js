const { user_game_biodata } = require("../models");

// sequelize model:generate --name user_game_biodata --attributes id_user:integer,name:string,email:string,address:string,phone:string

module.exports = {
  readAllData: async (req, res) => {
    try {
      const userGameBiodata = await user_game_biodata.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read All Data",
        data: userGameBiodata,
      });
    } catch (err) {
      res.json(err).status(200);
      console.log("Gagal menampilkan data");
    }
  },
  readDetailUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const userGameBiodata = await user_game_biodata.findOne({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Read Data",
        data: userGameBiodata,
      });
    } catch (error) {
      res.json(error).status(422);
    }
  },
  createUserBiodata: async (req, res) => {
    try {
      const { id_user, name, email, address, phone } = req.body;
      const userGameBiodata = await user_game_biodata.create({
        id_user,
        name,
        email,
        address,
        phone,
      });
      userGameBiodata.save();
      return res.status(200).json({
        status: "success",
        mesage: "Create User Game Success",
        data: userGameBiodata,
      });
    } catch (err) {
      res.json(err).status(422);
      console.log("Gagal menambah data");
    }
  },
  updateUserBiodata: async (req, res) => {
    try {
      const { id_user, name, email, address, phone } = req.body;
      const { userId } = req.params;
      const user = await user_game_biodata.findAll();
      const userGameBiodata = await user_game_biodata.update(
        {
          id_user,
          name,
          email,
          address,
          phone,
        },
        {
          where: { id: userId },
        }
      );
      return res.status(200).json({
        status: "success",
        mesage: "Update data success",
        data: user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteUserBiodata: async (req, res) => {
    try {
      const { userId } = req.params;
      const userGameBiodata = await user_game_biodata.destroy({
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
