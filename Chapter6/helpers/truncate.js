const { User, userBiodata, userHistory } = require("../models");

module.exports = {
  user: async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
  },
  userBiodata: async () => {
    await userBiodata.destroy({ truncate: true, restartIdentity: true });
  },
  userHistory: async () => {
    await userHistory.destroy({ truncate: true, restartIdentity: true });
  },
};
