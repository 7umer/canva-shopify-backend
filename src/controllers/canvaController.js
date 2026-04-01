const axios = require("axios");

// STEP 1: Redirect to Canva (OAuth already done)
exports.redirectToCanva = (req, res) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CANVA_CLIENT_ID,
    redirect_uri: process.env.CANVA_REDIRECT_URI,
    scope: "profile:read asset:read asset:write",
  });

  const url = `https://www.canva.com/api/oauth/authorize?${params.toString()}`;
  res.redirect(url);
};

// STEP 2: Exchange code → access token
async function getAccessToken(code) {
  const response = await axios.post(
    "https://api.canva.com/rest/v1/oauth/token",
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.CANVA_REDIRECT_URI,
      client_id: process.env.CANVA_CLIENT_ID,
      client_secret: process.env.CANVA_CLIENT_SECRET,
    }
  );

  return response.data;
}

// STEP 3: Handle callback
exports.handleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization failed");
  }

  try {
    const tokenData = await getAccessToken(code);

    const accessToken = tokenData.access_token;

    // Store token temporarily (you can store in DB later)
    req.session = req.session || {};
    req.session.accessToken = accessToken;

    // Redirect to frontend to open Canva editor
    res.redirect(`${process.env.FRONTEND_URL}/design`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Token exchange failed");
  }
};

// STEP 4: Export design
exports.exportDesign = async (req, res) => {
  const { designId } = req.query;
  const accessToken = req.session?.accessToken;

  if (!designId) {
    return res.status(400).send("Missing designId");
  }

  try {
    const response = await axios.post(
      `https://api.canva.com/rest/v1/designs/${designId}/export`,
      {
        format: "png",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const downloadUrl = response.data.download_url;

    res.json({ downloadUrl });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Export failed");
  }
};