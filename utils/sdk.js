const shareTribeSdk = require("sharetribe-flex-sdk");
const sdkProvider = () => {
  const clientId = process.env.NEXT_PUBLIC_FLEX_MARKETPLACE_API_CLIENT_ID;
  const sdk = shareTribeSdk.createInstance({
    clientId: clientId,
    baseUrl: "https://flex-api.sharetribe.com/",
  });
  return sdk;
};

export default sdkProvider;
