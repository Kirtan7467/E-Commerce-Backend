import { transporter } from "../config/mail";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"E-Commerce App" `,
    to,
    subject,
    html,
  });
};
