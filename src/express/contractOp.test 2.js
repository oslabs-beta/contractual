const {
  contract2string,
  string2constract,
  checkInput,
} = require("./contractOp.js");

describe("checkInput function except array functionality test", () => {
  const contracts = {
    "Req@POST@/login": { username: "string", age: "number" },
    "Res@POST@/login": { success: "boolean" },
    "Req@POST@/habits": { habitname: "string", target: "number" },
    "Res@POST@/habits": { currentHabits: "array" },
  };

  it("should return false if input is not an object", () => {
    const condition = "Res@POST@/habits";
    expect(checkInput([1, 2], contracts, condition).pass).toBe(false);
    expect(checkInput(null, contracts, condition).pass).toBe(false);
    expect(checkInput(2, contracts, condition).pass).toBe(false);
    expect(checkInput("req", contracts, condition).pass).toBe(false);
  });

  it("should return false if no such condition found in contract", () => {
    const input = { username: "Yankun", age: 26 };
    expect(checkInput(input, contracts, "Res@GET@/habits").pass).toBe(false);
    expect(checkInput(input, contracts, "Res@GET@/habits").error[0]).toBe(
      "The endpoint or the fetch method do not exist!"
    );
  });

  it("should return false if the other types don't match", () => {
    const input = { username: "Yankun", age: "26" };
    expect(checkInput(input, contracts, "Req@POST@/login").pass).toBe(false);
    expect(checkInput(input, contracts, "Req@POST@/login").error[0]).toBe(
      `type of "age" do not match! It should be number!`
    );
  });

  it("should return true if the everything matches", () => {
    const input = { username: "Yankun", age: 26 };
    expect(checkInput(input, contracts, "Req@POST@/login").pass).toBe(true);
    expect(checkInput(input, contracts, "Req@POST@/login").error.length).toBe(
      0
    );
  });
});

describe("checkInput function array functionality test", () => {
  const contracts = {
    "Res@POST@/res1": { calendar: "array-number-30", date: "string" },
    "Res@POST@/res2": { currentHabits: "array-string-any", date: "string" },
    "Res@POST@/res3": { books: "array-any-30", date: "string" },
    "Res@POST@/res4": { currentHabits: "array-any-any", date: "string" },
  };

  it("should return false if input is not an array", () => {
    const condition = "Res@POST@/res1";
    expect(
      checkInput({ calendar: "array", date: "0516" }, contracts, condition).pass
    ).toBe(false);
    expect(
      checkInput({ calendar: "array", date: "0516" }, contracts, condition)
        .error[0]
    ).toBe(`type of "calendar" do not match! It should be an array!`);
  });

  describe("check element types", () => {
    it("should return false if element types don't match", () => {
      const condition = "Res@POST@/res1";
      expect(
        checkInput(
          { calendar: Array(30).fill("a"), date: "0516" },
          contracts,
          condition
        ).pass
      ).toBe(false);
      expect(
        checkInput(
          { calendar: Array(30).fill("a"), date: "0516" },
          contracts,
          condition
        ).error[0]
      ).toBe(
        `type of array elements for "calendar" do not match! It should only contain "number"!`
      );
    });

    it("should return true if element type set to any", () => {
      const condition = "Res@POST@/res3";
      expect(
        checkInput(
          { books: Array(30).fill(2), date: "0516" },
          contracts,
          condition
        ).pass
      ).toBe(true);
      expect(
        checkInput(
          { books: Array(30).fill("a"), date: "0516" },
          contracts,
          condition
        ).error.length
      ).toBe(0);
    });
  });

  describe("check array length", () => {
    it("should return false if array length don't match", () => {
      const condition = "Res@POST@/res3";
      expect(
        checkInput(
          { books: Array(10).fill("a"), date: "0516" },
          contracts,
          condition
        ).pass
      ).toBe(false);
      expect(
        checkInput(
          { books: Array(10).fill("a"), date: "0516" },
          contracts,
          condition
        ).error[0]
      ).toBe(`array length for "books" do not match! It should be 30!`);
      expect(
        checkInput(
          { books: Array(10).fill("a"), date: "0516" },
          contracts,
          condition
        ).error.length
      ).toBe(1);
    });

    it("should return true if length set to any", () => {
      const condition = "Res@POST@/res4";
      expect(
        checkInput(
          { currentHabits: Array(20).fill(2), date: "0516" },
          contracts,
          condition
        ).pass
      ).toBe(true);
      expect(
        checkInput(
          { currentHabits: Array(20).fill(2), date: "0516" },
          contracts,
          condition
        ).error.length
      ).toBe(0);
    });
  });
});
