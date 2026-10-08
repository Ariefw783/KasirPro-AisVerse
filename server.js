import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Ensure iframe embeddability in AI Studio dev environment
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Serve static assets with correct MIME types
express.static.mime.define({
  "application/manifest+json": ["webmanifest"],
  "application/javascript": ["js", "mjs"],
  "application/json": ["json"],
  "image/svg+xml": ["svg"]
});

app.use(express.static(__dirname, {
  index: "index.html",
  extensions: ["html"]
}));

// Fallback for root / not caught
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`KasirPro V.2 server running at http://${HOST}:${PORT}`);
});
