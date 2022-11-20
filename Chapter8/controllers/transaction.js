const { Transaction } = require("../models");

module.exports = {
  paymentStatus: async (req, res, next) => {
    try {
      const { email, amount } = req.body;

      const user = await user_game.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "email not found",
        });
      }

      if (amount) {
        const Payment = await Transaction.create({
          user_id: user.id,
          amount: amount,
          status: true,
        });
      }
      const token = jwt.sign(payload, JWT_SECRET_KEY);
      const link = `http://localhost:3000/transaction/success?token=${token}`;

      htmlEmail = await util.email.getHtml("transactionSuccess.ejs", {
        name: user.name,
        link: link,
      });

      await util.email.sendEmail(user.email, "Transaction Success", htmlEmail);

      return res.status(201).json({
        status: true,
        message: "Transaction success",
      });
    } catch (error) {
      next(error);
    }
  },
};
