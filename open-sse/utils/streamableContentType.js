/**
 * True when upstream Content-Type is a streamable LLM body we can pipe.
 * Ollama native /api/chat streams application/x-ndjson (not text/event-stream).
 */
export function isStreamableUpstreamContentType(contentType) {
  const ct = String(contentType || "").toLowerCase();
  if (!ct) return true; // missing type — let the transform try
  return (
    ct.includes("text/event-stream")
    || ct.includes("application/json")
    || ct.includes("application/x-ndjson")
    || ct.includes("ndjson")
  );
}
