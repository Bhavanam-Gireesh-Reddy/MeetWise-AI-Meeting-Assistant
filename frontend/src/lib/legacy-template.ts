import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { buildBackendUrl } from "@/lib/backend";

const templatesRoot = path.resolve(process.cwd(), "legacy");

function getBackendWebSocketBase() {
  const backendUrl = buildBackendUrl("/");

  if (backendUrl.startsWith("https://")) {
    return backendUrl.replace("https://", "wss://").replace(/\/$/, "");
  }

  return backendUrl.replace("http://", "ws://").replace(/\/$/, "");
}

export async function loadLegacyTemplate(name: "index.html" | "studio.html") {
  const filePath = path.join(templatesRoot, name);
  return readFile(filePath, "utf8");
}

export async function buildLegacyLiveHtml(authToken: string) {
  const backendWsBase = getBackendWebSocketBase();
  let html = await loadLegacyTemplate("index.html");

  html = html.replace("<head>", '<head><base target="_top">');
  html = html.replace('<script src="/auth-helper.js"></script>', "");
  html = html.replace(
    "const authToken = localStorage.getItem('auth_token') || '';",
    `const authToken = ${JSON.stringify(authToken)};`,
  );
  html = html.replace(
    "const uploadToken = localStorage.getItem('auth_token') || '';",
    `const uploadToken = ${JSON.stringify(authToken)};`,
  );
  html = html.replaceAll(
    "${wsProto}//${location.host}/ws/translate",
    `${backendWsBase}/ws/translate`,
  );
  html = html.replaceAll(
    "${proto}://${location.host}/ws/translate",
    `${backendWsBase}/ws/translate`,
  );
  html = html.replaceAll("window.location.href =", "window.top.location.href =");

  return html;
}

export async function buildLegacyStudioHtml() {
  let html = await loadLegacyTemplate("studio.html");
  html = html.replace("<head>", '<head><base target="_top">');
  html = html.replace('<script src="/auth-helper.js"></script>', "");
  html = html.replaceAll("window.location.href =", "window.top.location.href =");
  return html;
}
