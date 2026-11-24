import { describe, expect, test } from "vitest";
import { Icon, Ranking, Solved, TotalSolved, Username } from "../elements";

describe("elements", () => {
    test("Icon", () => {
        const icon = Icon();
        expect(icon.stringify().length).toBeGreaterThan(100);
    });

    test("Username", () => {
        const username = Username("username", "us");
        expect(username.stringify().length).toBeGreaterThan(100);
    });

    test("Username fits long names to the available header width", () => {
        const username = Username("a-very-long-leetcode-username", "us", 360);

        expect(username.stringify()).toContain('textLength="185"');
        expect(username.stringify()).toContain('lengthAdjust="spacingAndGlyphs"');
    });

    test("Ranking", () => {
        const ranking = Ranking(1234);
        expect(ranking.stringify().length).toBeGreaterThan(10);
    });

    test("TotalSolved", () => {
        const total_solved = TotalSolved(1234, 123);
        expect(total_solved.stringify().length).toBeGreaterThan(100);
    });

    test("TotalSolved handles an empty problem set", () => {
        const total_solved = TotalSolved(0, 0).stringify();

        expect(total_solved).not.toContain("NaN");
        expect(total_solved).not.toContain("Infinity");
    });

    test("Solved", () => {
        const solved = Solved({
            easy: { solved: 100, total: 200 },
            medium: { solved: 100, total: 200 },
            hard: { solved: 100, total: 200 },
            ranking: 0,
        });
        expect(solved.stringify().length).toBeGreaterThan(100);
    });
});
