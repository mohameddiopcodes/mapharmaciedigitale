import validator from "validator";

// export const isPhoneNumber = (phone: string) => {
//   return !!phone
//     ? (phone.length === 1 && phone[0] === "+") ||
//         validator.isMobilePhone(phone) ||
//         isSnNumber(phone)
//     : false;
// };

export const isSnNumber = (phone: string) => {
  return (
    !!phone &&
    phone.length === 9 &&
    ["70", "75", "76", "77", "78"].includes(phone.slice(0, 2))
  );
};
