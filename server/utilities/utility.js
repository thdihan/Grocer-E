const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

function sendEmail(receiver_email, subject, message) {
  //sending the token
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: process.env.APP_MAIL,
      to: receiver_email,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Email sending failed" });
      } else {
        return res.status(200).json({ status: "Success" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

function scheduleEmail(receiver_email, subject, message, specifiedTime) {
  const job = schedule.scheduleJob(specifiedTime, function () {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_MAIL,
          pass: process.env.APP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: process.env.APP_MAIL,
        to: receiver_email,
        subject: subject,
        text: message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
          // Handle error appropriately
        } else {
          console.log("Email sent");
          // Handle success if needed
        }
      });
    } catch (error) {
      console.log(error.message);
      // Handle error appropriately
    }

    job.cancel(); // Cancel job after executing once
  });
}

module.exports = {
  scheduleEmail,
  sendEmail,
};
