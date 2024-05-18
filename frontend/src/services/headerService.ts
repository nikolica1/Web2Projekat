

const userService = {
  getHttpHeaderWithToken: () => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return { headers };
  },
  getHttpHeaderNoToken: () => {
    const headers = {
      Accept: "application/json",
    };

    return { headers };
  },
};

export default userService;
