const { user_game_biodata } = require("../models");

// sequelize model:generate --name user_game_biodata --attributes id_user:integer,name:string,email:string,address:string,phone:string

module.exports = {
  readAllData: async (req, res) => {
    try {
      const userGameBiodata = await user_game_biodata.findAll();
      return res.status(200).json({
        status: true,
        message: "success",
      });
    } catch (err) {
      res.json(err).status(404);
      console.log("Gagal menampilkan data");
    }
  },
  //   readDetailUser: async (req, res) => {
  //     try {
  //       const { userId } = req.params;
  //       const userGameBiodata = await user_game_biodata.findOne({
  //         where: { id: userId },
  //       });
  //       return res.status(200).json({
  //         status: "success",
  //         mesage: "Read Data",
  //         data: {
  //           id_user: userGameBiodata.id_user,
  //           name: userGameBiodata.name,
  //           email: userGameBiodata.email,
  //           addres: userGameBiodata.addres,
  //           phone: userGameBiodata.phone,
  //         },
  //       });
  //     } catch (error) {
  //       res.json(error).status(422);
  //     }
  //   },
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

      return res.status(200).json({
        status: true,
        message: "Create User Game Success",
        data: {
          id_user: userGameBiodata.id_user,
          name: userGameBiodata.name,
          email: userGameBiodata.email,
          address: userGameBiodata.address,
          phone: userGameBiodata.phone,
        },
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
      return res.status(201).json({
        status: true,
        message: "Update data success",
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteUserBiodata: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await user_game_biodata.findOne({ where: { id: id } });
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "Not found!",
        });
      }

      await user_game_biodata.destroy({ where: { id: id } });
      return res.status(200).json({
        status: "success",
        message: "Delete data success",
      });
    } catch (err) {
      next(err);
    }
  },
};
