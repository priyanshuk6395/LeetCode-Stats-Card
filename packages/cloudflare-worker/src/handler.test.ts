import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const { generate } = vi.hoisted(() => ({ generate: vi.fn() }));

vi.mock("leetcode-card", () => ({
    Generator: class {
        verbose = false;
        generate = generate;
    },
    supported: { light: {} },
    ActivityExtension: () => {},
    AnimationExtension: () => {},
    ContestExtension: () => {},
    FontExtension: () => {},
    HeatmapExtension: () => {},
    RemoteStyleExtension: () => {},
    ThemeExtension: () => {},
}));

vi.mock("./demo", () => ({ default: "<!DOCTYPE html><html></html>" }));

import { handle } from "./handler";

describe("worker routes", () => {
    beforeEach(() => {
        generate.mockReset().mockResolvedValue("<svg/>");
        vi.stubGlobal("caches", {
            open: vi.fn().mockResolvedValue({
                match: vi.fn(),
                put: vi.fn(),
            }),
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    test("generates an SVG for a username path", async () => {
        const response = await handle(
            new Request("https://card.example/alice?theme=nord&cache=42"),
        );

        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toBe("image/svg+xml");
        expect(response.headers.get("cache-control")).toBe("public, max-age=42");
        expect(await response.text()).toBe("<svg/>");
        expect(generate).toHaveBeenCalledWith(
            expect.objectContaining({ username: "alice", theme: "nord" }),
        );
    });

    test("generates an SVG for a username query parameter", async () => {
        const response = await handle(new Request("https://card.example/?username=bob"));

        expect(response.status).toBe(200);
        expect(await response.text()).toBe("<svg/>");
        expect(generate).toHaveBeenCalledWith(expect.objectContaining({ username: "bob" }));
    });

    test("serves the demo when no username is supplied", async () => {
        const response = await handle(new Request("https://card.example/"));

        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toBe("text/html");
        expect(await response.text()).toContain("<!DOCTYPE html>");
        expect(generate).not.toHaveBeenCalled();
    });

    test("redirects the favicon request", async () => {
        const response = await handle(new Request("https://card.example/favicon.ico"));

        expect(response.status).toBe(301);
        expect(response.headers.get("location")).toBe(
            "https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico",
        );
    });

    test("returns 404 for unsupported methods", async () => {
        const response = await handle(
            new Request("https://card.example/alice", { method: "POST" }),
        );

        expect(response.status).toBe(404);
        expect(await response.text()).toBe("Not Found.");
    });
});
