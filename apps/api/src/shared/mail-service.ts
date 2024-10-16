import nodemailer from 'nodemailer';
import { logger } from './logger/logger';
import { APP_SETTINGS } from './app-settings';

const nodemailerTransporter = nodemailer.createTransport({
  host: APP_SETTINGS.SENDER_EMAIL_HOST,
  port: APP_SETTINGS.SENDER_EMAIL_PORT,
  secure: true,
  auth: {
    user: APP_SETTINGS.SENDER_EMAIL_ID,
    pass: APP_SETTINGS.SENDER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (mailData: any) => {
  try {
    if (!mailData) {
      return false;
    }

    const mailOptions = {
      from: APP_SETTINGS.SENDER_EMAIL_ID,
      ...mailData,
    };

    const res = await nodemailerTransporter.sendMail(mailOptions);
    logger.email({
      res,
      mailOptions,
    });
    return res;
  } catch (error: any) {
    logger.email({
      type: 'error',
      error,
      mailData,
    });
    throw error;
  }
};
