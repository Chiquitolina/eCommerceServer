import { text } from "express";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aleig.906@gmail.com",
    pass: "bkun ffzm jubs omvk",
  },
});

export async function sendEmail(req, res) {
  const { from, subject, mail } = req.body;
  console.log(req.body);

  const emailOpts = {
    from: "aleig.906@gmail.com",
    to: from,
    subject: "NORA CONTACT",
    text: mail,
  };

  transporter.sendMail(emailOpts, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
}
