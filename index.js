const express = require("express")
const connectToDatabase = require("./db");
const cron = require('node-cron');
const mailer = require('nodemailer');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config();

// Creating a transporter
const transporter = mailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

function sendEmail(message) {
  //sending the email
  transporter.sendMail({
    from: process.env.FROM,
    to: process.env.TO,
    subject: process.env.SUBJECT,
    html: message
  })
    .then(_ => { console.log("Email sent on " + new Date()) })
    .catch(error => { console.log(error) });
}

// Job scheduling - 1 second interval
cron.schedule('1 * * * * *', () => {
  sendEmail('<h4>Hi!</h4><p>Have a nice day :)</p>');
});

app.get("/", (req, res) => {
  res.send("Hello! I'm a health checker :)")
});

app.post("/create-user", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const { Users } = await connectToDatabase();
    await Users.create({ name, email, age });
    return res.status(200).send({ message: "User Creation Success", data: null });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "User Creation Fail", data: null });
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const { Users } = await connectToDatabase();
    const users = await Users.findAll();

    return res.status(200).send({ message: "Users Fetch Success", data: users });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Users Fetch Fail", data: null });
  }
});

app.get("/get-user/:id", async (req, res) => {
  try {
    const param = req.params;

    const { Users } = await connectToDatabase();
    const users = await Users.findOne({ where: { id: param.id } });

    return res.status(200).send({ message: "User Fetch Success", data: users });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "User Fetch Fail", data: null });
  }
});

app.post("/update-user", async (req, res) => {
  const { id, name, email, age } = req.body;

  try {
    let options = {};
    const { Users } = await connectToDatabase();

    name ? options.name = name : null;
    email ? options.email = email : null;
    age ? options.age = age : null;

    if (name || email || age) {
      await Users.update(options, { where: { id } });
    }

    const user = await Users.findOne({
      attributes: ["id", "name", "email", "age"],
      where: { id }
    });

    return res.status(200).send({ message: "User Update Success", user });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "User Update Fail", data: null });
  }
});

app.delete("/delete-user", async (req, res) => {
  const { id } = req.body;

  try {
    const { Users } = await connectToDatabase();

    await Users.destroy({ where: { id } });

    return res.status(200).send({ message: "User Delete Success", data: null });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "User Delete Fail", data: null });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`)
});