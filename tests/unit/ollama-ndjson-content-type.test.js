import { describe, expect, it } from "vitest";

import { isStreamableUpstreamContentType } from "../../open-sse/utils/streamableContentType.js";

describe("isStreamableUpstreamContentType", () => {
  it("allows SSE and JSON", () => {
    expect(isStreamableUpstreamContentType("text/event-stream")).toBe(true);
    expect(isStreamableUpstreamContentType("application/json; charset=utf-8")).toBe(true);
  });

  it("allows Ollama native NDJSON streams", () => {
    expect(isStreamableUpstreamContentType("application/x-ndjson")).toBe(true);
    expect(isStreamableUpstreamContentType("Application/X-NDJSON")).toBe(true);
  });

  it("blocks HTML error pages", () => {
    expect(isStreamableUpstreamContentType("text/html; charset=utf-8")).toBe(false);
  });

  it("treats missing content-type as allowable", () => {
    expect(isStreamableUpstreamContentType("")).toBe(true);
    expect(isStreamableUpstreamContentType(null)).toBe(true);
  });
});
