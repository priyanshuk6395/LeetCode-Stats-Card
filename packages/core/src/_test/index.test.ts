import { beforeEach, describe, expect, test, vi } from "vitest";

const { us, cn } = vi.hoisted(() => ({ us: vi.fn(), cn: vi.fn() }));

vi.mock("../query", () => ({ default: { us, cn } }));

import generate from "../";
import { ActivityExtension } from "../exts/activity";
import { AnimationExtension } from "../exts/animation";
import { FontExtension } from "../exts/font";
import { ThemeExtension } from "../exts/theme";
import type { FetchedData } from "../types";

const fixture: FetchedData = {
    profile: {
        username: "alice",
        realname: "Priyanshu Kumar",
        about: "",
        avatar: "",
        skills: ["TypeScript"],
        country: "Taiwan",
    },
    problem: {
        easy: { solved: 100, total: 500 },
        medium: { solved: 200, total: 1000 },
        hard: { solved: 50, total: 500 },
        ranking: 1234,
    },
    submissions: [
        {
            title: "Two Sum",
            lang: "Python3",
            time: 1700000000000,
            status: "Accepted",
            id: "1",
            slug: "two-sum",
        },
    ],
};

describe("generate", () => {
    beforeEach(() => {
        us.mockReset().mockResolvedValue(fixture);
        cn.mockReset().mockResolvedValue(fixture);
    });

    test("generates an SVG using the requested site and username", async () => {
        const svg = await generate({ username: "alice", site: "us", extensions: [] });

        expect(svg).toContain("<svg");
        expect(svg).toContain("alice");
        expect(svg).toContain("LEETCODE PROFILE");
        expect(svg).toContain("GLOBAL RANK");
        expect(svg).toContain("TOTAL SOLVED");
        expect(svg).toContain("PROBLEM BREAKDOWN");
        expect(us).toHaveBeenCalledWith("alice", {});
        expect(cn).not.toHaveBeenCalled();
    });

    test("uses the fork owner's username by default", async () => {
        await generate({ extensions: [] });

        expect(us).toHaveBeenCalledWith("priyanshuk6395", {});
    });

    test("renders local extensions with the generated SVG", async () => {
        const svg = await generate({
            username: "alice",
            theme: "nord",
            font: "Source_Code_Pro",
            extensions: [FontExtension, AnimationExtension, ThemeExtension, ActivityExtension],
        });

        expect(svg).toContain("#2e3440");
        expect(svg).toContain("Source Code Pro");
        expect(svg).toContain("alice");
    });

    test("applies custom colors via the colors option", async () => {
        const svg = await generate({
            username: "alice",
            extensions: [ThemeExtension],
            colors: [
                "#111111",
                "#222222",
                "#333333",
                "#444444",
                "#aa0000",
                "#00aa00",
                "#0000aa",
                "#ffaa00",
            ],
        });

        expect(svg).toContain("--bg-0:#111111");
        expect(svg).toContain("--bg-1:#222222");
        expect(svg).toContain("--text-0:#333333");
        expect(svg).toContain("--text-1:#444444");
        expect(svg).toContain("--color-0:#aa0000");
        expect(svg).toContain("--color-3:#ffaa00");
        expect(svg).toMatch(/stroke:var\(--color-0\)/);
    });
});
