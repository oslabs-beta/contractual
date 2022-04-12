const {
  contract2string,
  string2constract,
  checkInput,
} = require("./contractOp.js");

describe("checkInput function test", () => {
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

  it("should return false if the types don't match", () => {
    const input = { username: "Yankun", age: "26" };
    expect(checkInput(input, contracts, "Req@POST@/login").pass).toBe(false);
    expect(checkInput(input, contracts, "Req@POST@/login").error[0]).toBe(
      `type of "age" do not match! It should be number!`
    );
  });

  it("should return false if the types don't match", () => {
    const input = { username: "Yankun", age: 26 };
    expect(checkInput(input, contracts, "Req@POST@/login").pass).toBe(true);
    expect(checkInput(input, contracts, "Req@POST@/login").error.length).toBe(
      0
    );
  });
});
