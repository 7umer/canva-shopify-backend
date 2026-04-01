require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});