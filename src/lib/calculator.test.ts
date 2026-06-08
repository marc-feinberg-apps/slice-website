import { describe, it, expect } from "vitest";
import { calculateSettlement, usd, formatDuration } from "./calculator";

describe("calculateSettlement", () => {
  it("computes settlement, savings, and program length", () => {
    const r = calculateSettlement({ debt: 30000, targetPct: 50, monthlySavings: 500 });
    expect(r.settlementAmount).toBe(15000);
    expect(r.savings).toBe(15000);
    expect(r.months).toBe(30); // 15000 / 500
  });

  it("rounds months up so savings fully fund the settlement", () => {
    const r = calculateSettlement({ debt: 10000, targetPct: 40, monthlySavings: 300 });
    // settlement 4000 / 300 = 13.33 -> 14 months
    expect(r.settlementAmount).toBe(4000);
    expect(r.months).toBe(14);
  });

  it("returns 0 months when no monthly savings are provided", () => {
    const r = calculateSettlement({ debt: 5000, targetPct: 50, monthlySavings: 0 });
    expect(r.months).toBe(0);
  });

  it("clamps negative and out-of-range inputs", () => {
    const r = calculateSettlement({ debt: -100, targetPct: 150, monthlySavings: 50 });
    expect(r.settlementAmount).toBe(0);
    expect(r.savings).toBe(0);
  });
});

describe("formatters", () => {
  it("formats USD without cents", () => {
    expect(usd(15000)).toBe("$15,000");
  });

  it("formats durations in years and months", () => {
    expect(formatDuration(30)).toBe("2 yrs 6 mos");
    expect(formatDuration(0)).toBe("—");
    expect(formatDuration(12)).toBe("1 yr");
  });
});
