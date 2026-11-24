import { beforeEach, describe, expect, test, vi } from "vitest";

const { graphql } = vi.hoisted(() => ({ graphql: vi.fn() }));

vi.mock("leetcode-query", () => ({
    LeetCode: class {
        graphql = graphql;
    },
    LeetCodeCN: class {
        graphql = graphql;
    },
}));

import query from "../query";

describe("query", () => {
    beforeEach(() => {
        graphql.mockReset();
    });

    test("maps US profile, problem, submission, and contest data", async () => {
        graphql.mockResolvedValueOnce({
            data: {
                problems: [
                    { difficulty: "Easy", count: 100 },
                    { difficulty: "Medium", count: 200 },
                    { difficulty: "Hard", count: 300 },
                ],
                user: {
                    username: "alice",
                    profile: {
                        realname: "Alice",
                        about: "Hello",
                        avatar: "avatar.png",
                        skills: ["TypeScript"],
                        country: "Canada",
                        ranking: 42,
                    },
                    submits: {
                        ac: [
                            { difficulty: "Easy", count: 10 },
                            { difficulty: "Medium", count: 20 },
                            { difficulty: "Hard", count: 30 },
                        ],
                    },
                },
                submissions: [
                    {
                        id: "1",
                        title: "Two Sum",
                        slug: "two-sum",
                        time: "1700000000",
                        status: "Accepted",
                        lang: "Python3",
                    },
                ],
                contest: {
                    rating: 1800,
                    ranking: 100,
                    badge: { name: "Knight" },
                },
            },
        });

        await expect(query.us("alice")).resolves.toEqual({
            profile: {
                username: "alice",
                realname: "Alice",
                about: "Hello",
                avatar: "avatar.png",
                skills: ["TypeScript"],
                country: "Canada",
            },
            problem: {
                easy: { solved: 10, total: 100 },
                medium: { solved: 20, total: 200 },
                hard: { solved: 30, total: 300 },
                ranking: 42,
            },
            submissions: [
                {
                    id: "1",
                    title: "Two Sum",
                    slug: "two-sum",
                    time: 1700000000000,
                    status: "Accepted",
                    lang: "Python3",
                },
            ],
            contest: { rating: 1800, ranking: 100, badge: "Knight" },
        });
        expect(graphql).toHaveBeenCalledWith(
            expect.objectContaining({ variables: { username: "alice" } }),
        );
    });

    test("maps CN progress and submission values", async () => {
        graphql.mockResolvedValueOnce({
            data: {
                progress: {
                    ac: [
                        { difficulty: "EASY", count: 1 },
                        { difficulty: "MEDIUM", count: 4 },
                        { difficulty: "HARD", count: 7 },
                    ],
                    wa: [
                        { difficulty: "EASY", count: 2 },
                        { difficulty: "MEDIUM", count: 5 },
                        { difficulty: "HARD", count: 8 },
                    ],
                    un: [
                        { difficulty: "EASY", count: 3 },
                        { difficulty: "MEDIUM", count: 6 },
                        { difficulty: "HARD", count: 9 },
                    ],
                },
                user: {
                    username: "alice-cn",
                    ranking: 24,
                    profile: {
                        realname: "Alice",
                        about: "",
                        avatar: "",
                        skills: [],
                        country: "",
                    },
                },
                submissions: [
                    {
                        id: 2,
                        question: { title: "两数之和", slug: "two-sum" },
                        time: 1700000000,
                        status: "A_10",
                        lang: "A_2",
                    },
                ],
            },
        });

        await expect(query.cn("alice-cn")).resolves.toEqual({
            profile: {
                username: "alice-cn",
                realname: "Alice",
                about: "",
                avatar: "",
                skills: [],
                country: "",
            },
            problem: {
                easy: { solved: 1, total: 6 },
                medium: { solved: 4, total: 15 },
                hard: { solved: 7, total: 24 },
                ranking: 24,
            },
            submissions: [
                {
                    id: 2,
                    title: "两数之和",
                    slug: "two-sum",
                    time: 1700000000000,
                    status: "Accepted",
                    lang: "Python",
                },
            ],
        });
        expect(graphql).toHaveBeenCalledWith(
            expect.objectContaining({ variables: { username: "alice-cn" } }),
        );
    });

    test("rejects a missing user", async () => {
        graphql.mockResolvedValueOnce({ data: { user: null } });

        await expect(query.us("missing")).rejects.toThrow("User Not Found");
    });
});
