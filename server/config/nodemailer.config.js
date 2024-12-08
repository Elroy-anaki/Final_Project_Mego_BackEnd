import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: "msedetisrel@gmail.com",
    pass: "qhyajtfvfvapdnyf",
  },
});

export default transporter;