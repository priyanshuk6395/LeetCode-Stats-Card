import { supported as themes } from "leetcode-card";
import html from "./demo.html";
import { fonts } from "./google-fonts";

const selected_font = fonts.findIndex((font) => font.toLowerCase() === "baloo 2");

export default html
    .replace(
        "${theme_options}",
        Object.keys(themes)
            .map(
                (theme) =>
                    `<option value="${theme}" ${
                        theme === "light" ? "selected" : ""
                    }>${theme}</option>`,
            )
            .join(""),
    )
    .replace(
        "${font_options}",
        fonts
            .map(
                (font, i) =>
                    `<option value="${font}" ${
                        i === selected_font ? "selected" : ""
                    }>${font}</option>`,
            )
            .join(""),
    );
