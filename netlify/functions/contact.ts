import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  if (!event.body) {
    return { statusCode: 400, body: "Missing body" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.VITE_CONTACT_EMAIL!,
      pass: process.env.VITE_CONTACT_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.VITE_CONTACT_EMAIL!,
      replyTo: email,
      subject: `[Contact Form] - ${subject || "No Subject"}`,
      text: message,
      html: `<p>${(message || "").replace(/\n/g, "<br/>")}</p>`,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Error sending email:", err);
    return { statusCode: 500, body: JSON.stringify({ success: false }) };
  }
};
