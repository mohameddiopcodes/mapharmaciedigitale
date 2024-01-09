import axios from "axios";

export async function verifyPhone(
  codes: Array<string>,
  phone?: string,
  email?: string
) {
  return axios.post("/api/verify_phone", {
    email: email,
    phone: phone,
    emailCode: codes[0],
    phoneCode: codes[1],
  });
}

export async function sendPhone(phone: string) {
  const body = {
    email: "",
    phone,
    send: [false, true],
  };

  return axios.post("/api/otp", body);
}
