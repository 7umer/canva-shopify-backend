const axios = require("axios");
const crypto = require("crypto"); // ➕ ADDED

// ➕ ADDED: PKCE helpers
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
}

function generateCodeChallenge(verifier) {
  return crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
}

// STEP 1: Redirect to Canva
exports.redirectToCanva = (req, res) => {

  // ➕ ADDED
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // ➕ ADDED: store verifier
  req.session = req.session || {};
  req.session.codeVerifier = codeVerifier;

  // 🔁 UPDATED PARAMS
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CANVA_CLIENT_ID,
    redirect_uri: process.env.CANVA_REDIRECT_URI,
    scope: "profile:read asset:read asset:write",
    code_challenge: codeChallenge,            // ➕ ADDED
    code_challenge_method: "S256",            // ➕ ADDED
  });

  const url = `https://www.canva.com/api/oauth/authorize?${params.toString()}`;

  console.log("OAuth URL:", url); // ➕ ADDED (debug)

  res.redirect(url);
};

// 🔁 UPDATED: now takes codeVerifier
async function getAccessToken(code, codeVerifier) {
  const response = await axios.post(
    "https://api.canva.com/oauth/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.CANVA_REDIRECT_URI,
      client_id: process.env.CANVA_CLIENT_ID,
      code_verifier: codeVerifier, // ➕ IMPORTANT
    }),
    {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
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
    // ➕ ADDED
    const codeVerifier = req.session?.codeVerifier;

    const tokenData = await getAccessToken(code, codeVerifier);

    const accessToken = tokenData.access_token;

    // Store token
    req.session.accessToken = accessToken;

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