import Redis from "ioredis";
import { createTransport } from "nodemailer";

const redis = new Redis(process.env.REDIS_URL ?? "");
const RATE_LIMIT = 10;
const TIME_WINDOW = 60 * 60 * 24;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("remote-addr") ||
    "unknown";
  const redisKey = `rate-limit:${ip}`;

  const requestCount = await redis.get(redisKey);

  if (requestCount && parseInt(requestCount) >= RATE_LIMIT) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  await redis.multi().incr(redisKey).expire(redisKey, TIME_WINDOW).exec();

  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Please fill out all fields." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const content = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Portfolio Feedback</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 1rem !important;
      }
    }
    body {
      background-color: black;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 1rem;
    }
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #1f2937;
      border-radius: 0.5rem;
    }
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .sender-info {
      color: #9ca3af;
      margin-bottom: 1rem;
    }
    .divider {
      border: 0;
      border-top: 1px solid #1f2937;
      margin: 1.5rem 0;
    }
    .message-label {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }
    .message-content {
      color: #d1d5db;
      margin-bottom: 2rem;
    }
    .footer {
      color: #9ca3af;
      font-size: 0.875rem;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div style="display: none;">
    New message from ${name} &lt;${email}&gt;:
  </div>
  <div class="container">
    <div class="title">Portfolio Feedback</div>
    
    <div class="sender-info">
      From: ${name} &lt;${email}&gt;
    </div>
    
    <hr class="divider">
    
    <div class="message-label">Message:</div>
    <div class="message-content">
      ${message}
    </div>
    
    <hr class="divider">
    
    <div class="footer">
      This email was sent from your portfolio contact form. Please do not reply directly to this email.
    </div>
  </div>
</body>
</html>`;

  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    inReplyTo: email,
    subject: "Portfolio Feedback",
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({
        message:
          "Your message has been sent successfully. I'll get back to you soon!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        error:
          "An error occurred while sending your message. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
