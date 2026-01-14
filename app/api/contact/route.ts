import { NextRequest, NextResponse } from "next/server";

// Example using Nodemailer for email
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const customHeader = req.headers.get("X-Custom-Header");
    if (customHeader !== "ContactForm") {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 });
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Configure your email transporter (e.g., Gmail, SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} &lt;${email}&gt;</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}