import sdkProvider from "../../../utils/sdk";
const createUser = (payload) => {
  return sdkProvider.currentUser
    .create(
      {
        email: payload?.email,
        password: payload?.password,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        publicData: {
          email: payload?.email,
        },
        protectedData: {
          phoneNumber: payload?.phone,
        },
      },
      {
        expand: true,
      }
    )
    .then((res) => {
      console.log("response", res);
    });
};

export default createUser;
