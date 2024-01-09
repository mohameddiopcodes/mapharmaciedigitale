// import sgMail from "@sendgrid/mail";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const verificationSID = process.env.TWILIO_VERIFICATION_SID as string;

export default function sendConfirmations(
  email: string,
  phone: string,
  send: Array<boolean> = [true, true]
) {
  if (send[0]) {
    sendEmailConfirmation(email);
  }
  if (send[1]) {
    sendPhoneConfirmation(phone);
  }
}

async function sendEmailConfirmation(email: string) {
  try {
    client.verify.v2
      .services(verificationSID)
      .verifications.create({
        to: email,
        channel: "email",
      })
      .then((verification) => console.log(verification));
  } catch (e) {
    console.log(e);
  }
}

function sendPhoneConfirmation(phone: string) {
  try {
    client.verify.v2.services(verificationSID).verifications.create({
      to: phone,
      locale: "fr",
      channel: "sms",
    });
  } catch (e) {
    console.log(e);
  }
}

export async function verificationCheck(to: string, code: string) {
  try {
    console.log("DEBUG #3", to, code);
    const verification = await client.verify.v2
      .services(verificationSID)
      .verificationChecks.create({ to, code });
    return verification.valid;
  } catch (e) {
    return false;
  }
}
