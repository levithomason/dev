import { rateLimit } from "./rateLimit";

test("returns a function that returns a promise", () => {
  const rl = rateLimit(0, () => {});
  expect(rl).toBeInstanceOf(Function);
  expect(rl()).toBeInstanceOf(Promise);
});

test("resolves with the return value of the function", () => {
  let counter = 0;
  const fn = () => counter++;
  const rl = rateLimit(100, fn);

  expect.assertions(4);

  return Promise.all([
    rl().then((res) => expect(res).toEqual(0)),
    rl().then((res) => expect(res).toEqual(1)),
    rl().then((res) => expect(res).toEqual(2)),
    rl().then((res) => expect(res).toEqual(3)),
  ]);
});

test("retains function arguments", async () => {
  const fn = (a: string, b: number) => a + b;
  const rl = rateLimit(100, fn);

  expect(await rl("one", 999)).toEqual("one999");
});

test("resolves immediately on the first call", async () => {
  const fn = jest.fn();
  const rl = rateLimit(1000, fn);

  const startTime = Date.now();
  await rl();
  expect(Date.now() - startTime).toBeLessThanOrEqual(2);
  expect(fn).toBeCalledTimes(1);
});

test("defers immediate second call per rate limit", async () => {
  const fn = jest.fn();
  const msPerCall = 100;

  // immediate first call
  const rl = rateLimit(msPerCall, fn);
  await rl();

  const startTime = Date.now();
  await rl();
  const endTime = Date.now() - startTime;

  expect(endTime).toBeGreaterThanOrEqual(msPerCall);
  expect(endTime).toBeLessThan(msPerCall * 2);
  expect(fn).toBeCalledTimes(2);
});
