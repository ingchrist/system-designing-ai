import { describe, it, expect, beforeEach } from "vitest"
import { readFileSync } from "fs"
import { resolve } from "path"

describe(".stylelintrc.json", () => {
  const configPath = resolve(__dirname, "../.stylelintrc.json")
  let config: {
    rules?: {
      "at-rule-no-unknown"?: [boolean, { ignoreAtRules?: string[] }]
    }
  }

  beforeEach(() => {
    const raw = readFileSync(configPath, "utf-8")
    config = JSON.parse(raw)
  })

  it("is valid JSON that can be parsed", () => {
    expect(() => {
      const raw = readFileSync(configPath, "utf-8")
      JSON.parse(raw)
    }).not.toThrow()
  })

  it("contains a 'rules' property at the top level", () => {
    expect(config).toHaveProperty("rules")
  })

  it("configures the at-rule-no-unknown rule", () => {
    expect(config.rules).toHaveProperty("at-rule-no-unknown")
  })

  it("enables the at-rule-no-unknown rule (first element is true)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(Array.isArray(rule)).toBe(true)
    expect(rule?.[0]).toBe(true)
  })

  it("provides ignoreAtRules configuration", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(rule?.[1]).toHaveProperty("ignoreAtRules")
    expect(Array.isArray(rule?.[1].ignoreAtRules)).toBe(true)
  })

  it("ignores the 'theme' at-rule (required for Tailwind v4)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(rule?.[1].ignoreAtRules).toContain("theme")
  })

  it("ignores the 'utility' at-rule (required for Tailwind v4)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(rule?.[1].ignoreAtRules).toContain("utility")
  })

  it("ignores the 'variant' at-rule (required for Tailwind v4)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(rule?.[1].ignoreAtRules).toContain("variant")
  })

  it("ignores the 'source' at-rule (required for Tailwind v4)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    expect(rule?.[1].ignoreAtRules).toContain("source")
  })

  it("ignores exactly the four Tailwind v4 at-rules (no extras, no missing)", () => {
    const rule = config.rules?.["at-rule-no-unknown"]
    const ignoreAtRules = rule?.[1].ignoreAtRules
    expect(ignoreAtRules).toEqual(
      expect.arrayContaining(["theme", "utility", "variant", "source"])
    )
    expect(ignoreAtRules).toHaveLength(4)
  })

  it("has no extra top-level properties beyond 'rules'", () => {
    const keys = Object.keys(config)
    expect(keys).toEqual(["rules"])
  })
})