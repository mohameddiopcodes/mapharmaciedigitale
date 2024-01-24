export type UserType = {
  name?: string;
  phone?: string;
  profilePicture?: Buffer;
  password?: string;
  userAgent?: string;
  role?: number;
  initials?: () => string;
};

export const user = {
  name: "",
  initials: function () {
    return this.name
      ? this.name
          .split(" ")
          .reduce((acc, n, i) => (i < 3 ? acc + n[0] : acc), "")
      : "";
  },
};
