import sum from "./sum";

describe("sum()", () => {
  it("should be defined", () => {
    expect(sum).toBeDefined();
  });
  it("should return 3 given 1 and 2", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
  it("should return 7 given 3 and 4", () => {
    const result = sum(3, 4);
    expect(result).toBeCloseTo(7);
  });
  it("should return 3.3 given 1.1 and 2.2", () => {
    const result = sum(1.1, 2.2);
    expect(result).toBeCloseTo(3.3);
  });
  it("should throw an error given 'abc' and 'def'", () => {
    const stringParameters = () => sum("abc" as any, "def" as any);
    expect(stringParameters).toThrow();
  });
  it("should return the sum given 2 numbers", () => {
    let result = sum(5, 6);
    expect(result).toBe(11);

    result = sum(5.1, 6.1);
    expect(result).toBeCloseTo(11.2);

    result = sum(1.5, 6.5);
    expect(result).toBe(8);

    result = sum(100, 200);
    expect(result).toBe(300);

    result = sum(123.4, 567.8);
    expect(result).toBeCloseTo(691.2);
  });
  it("should sum negative numbers", () => {
    let result = sum(-3, -2);
    expect(result).toBe(-5);
  });
});
