const { getAccessToken } = require("../services/canvaService");

// controllers/canvaController.js
const crypto = require("crypto");

// Generate a random code verifier
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("hex");
}

// Base64-url encode for PKCE
function base64URLEncode(str) {
  return str.toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// SHA256 hash for PKCE
function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest();
}




// STEP 1: Redirect user to Canva
exports.redirectToCanva = (req, res) => {
  // 1️⃣ Generate PKCE code verifier & challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  // 2️⃣ Store codeVerifier temporarily in session (or in-memory for now)
  req.session = req.session || {};
  req.session.codeVerifier = codeVerifier;

  // 3️⃣ Build Canva authorization URL
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CANVA_CLIENT_ID,
    redirect_uri: process.env.CANVA_REDIRECT_URI,
    scope: "profile:read asset:write asset:read",
    code_challenge: codeChallenge,
    code_challenge_method: "s256"
  });

  const url = `${process.env.CANVA_AUTH_URL}?${params.toString()}`;
  console.log("Redirecting to Canva:", url);

  // 4️⃣ Redirect user
  res.redirect(url);
};

// STEP 2: Handle Canva callback
// exports.handleCallback = async (req, res) => {
//   const { code } = req.query;

//   if (!code) {
//     return res.status(400).send("Authorization failed");
//   }

//   try {
//     const tokenData = await getAccessToken(code);

//     // 🔥 Simulated values (real after approval)
//     const designId = "demo-" + Date.now();
//     const downloadUrl = `https://dummy-download.com/${designId}.png`;

//     // Redirect back to frontend (Shopify flow simulation)
//     res.redirect(
//       `${process.env.FRONTEND_URL}?designId=${designId}&downloadUrl=${downloadUrl}`
//     );
//   } catch (error) {
//     res.status(500).send("Error during authentication");
//   }
// };


exports.handleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).send("Authorization failed");

  // Retrieve codeVerifier from session
  const codeVerifier = req.session?.codeVerifier;
  console.log("Received code:", code);
  console.log("Using codeVerifier:", codeVerifier);

  // TODO: Use code + codeVerifier to get access token from Canva
  // For demo, continue with your simulated download URL
  const designId = "demo-" + Date.now();
  const downloadUrl = `https://dummy-download.com/${designId}.png`;

  res.redirect(`${process.env.FRONTEND_URL}?designId=${designId}&downloadUrl=${downloadUrl}`);
};