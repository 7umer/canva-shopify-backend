const axios = require("axios");

exports.getAccessToken = async (code) => {
  try {
    const response = await axios.post(
      process.env.CANVA_TOKEN_URL,
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.CANVA_REDIRECT_URI,
      },
      {
        auth: {
          username: process.env.CANVA_CLIENT_ID,
          password: process.env.CANVA_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    throw error;
  }
};