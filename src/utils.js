import {adjectives, nouns} from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const upgradeBase64crypto = password => {
  const buffer = crypto.randomBytes(64);
  const salt = buffer.toString('hex');
  const key = crypto.pbkdf2Sync(password, salt, 85689, 64,'sha512');
  return {
    generateSalt:salt,
    generatePW:key.toString('base64')
  };
}

export const checkBase64crypto = (salt, password) => {
  const key = crypto.pbkdf2Sync(password, salt, 85689, 64,'sha512');
  return key.toString('base64');
}

//console.log(`${process.env.SENDGRID_USERNAME} ${process.env.SENDGRID_PASSWORD}`)

const sendMail = email => {
    const options = {
      auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
      }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
  };

export const sendSecretMail = (address, secret)=> {
    const email = {
        from : "apps@trizcorp.com",
        to : address,
        subject:"Login Secret for Prismagram",
        html:`Hello! Your login secret it <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
}

export const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}