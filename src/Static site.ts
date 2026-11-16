
import express from "express";
import path from "node:path";
import { renderHtmlContent } from "./server/RenderHtml";

const app = express();
const staticDir = path.resolve("static");

const html = await renderHtmlContent(
  path.join(staticDir, "index.html"),
  { perServer: false }
);

app.get("/healthz", (_req, res) => res.send("OK"));
app.get("/index.html", (_req, res) => res.type("html").send(html));

app.use(express.static(staticDir, { index: false }));

app.get(/.*/, (_req, res) => {
  res.type("html").send(html);
});

const port = Number(process.env.PORT || 3000);
app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend listening on ${port}`);
});
