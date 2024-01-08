export async function verifyPhone(
  codes: Array<string>,
  phone?: string,
  email?: string
) {
  return fetch("/api/verify_phone", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      phone: phone,
      emailCode: codes[0],
      phoneCode: codes[1],
    }),
  });
}

export async function sendPhone(phone: string) {
  const body = {
    email: "",
    phone,
    send: [false, true],
  };

  return fetch("/api/otp", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
