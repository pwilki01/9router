import { DefaultExecutor } from "./default.js";
import { resolveOllamaLocalHost } from "../config/providers.js";

export class OllamaLocalExecutor extends DefaultExecutor {
  constructor() {
    super("ollama-local");
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    return `${resolveOllamaLocalHost(credentials)}/api/chat`;
  }

  buildHeaders(credentials, stream = true, url, model) {
    const headers = super.buildHeaders(credentials, stream, url, model);
    // Native Ollama streams NDJSON, not SSE. Asking for event-stream alone made
    // some proxies/gateways pick the wrong reader path; accept both.
    if (stream) {
      headers["Accept"] = "application/x-ndjson, application/json, text/event-stream";
    }
    // Local Ollama ignores auth; never send "Bearer undefined".
    const token = credentials?.apiKey || credentials?.accessToken;
    if (!token) {
      delete headers["Authorization"];
    }
    return headers;
  }
}

export default OllamaLocalExecutor;
