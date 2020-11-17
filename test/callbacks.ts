import tap from "tap";
import JSONParser from "../src/jsonparser";
import Tokenizer from "../src/tokenizer";

const { test } = tap;

test("should error on missing onToken callback", (t) => {
  t.plan(1);

  const p = new Tokenizer();

  try {
    p.write('"test"');
    t.fail("Expected to fail");
  } catch (e) {
    t.pass();
  }
});

test("should error on missing onValue callback", (t) => {
  t.plan(1);

  const p = new JSONParser();

  try {
    p.write('"test"');
    t.fail("Expected to fail");
  } catch (e) {
    t.pass();
  }
});

test("should handle invalid input using the onError callback if set", (t) => {
  t.plan(1);

  const p = new JSONParser();
  p.onValue = () => {};
  p.onError = (err) => t.equal(err.message, 'Unexpected type. The `write` function only accepts Arrays, TypedArrays and Strings.');

  p.write(745674 as any);
});

test("should handle errors using the onError callback if set", (t) => {
  t.plan(1);

  const p = new JSONParser();
  p.onValue = () => {};
  p.onError = (err) => t.equal(err.message, 'Unexpected "e" at position "3" in state TRUE1');

  p.write('""test""');
});

test("should handle processing end using the onEnd callback if set", (t) => {
  t.plan(1);

  const p = new JSONParser();
  p.onValue = () => {};
  p.onEnd = () => t.pass();

  p.write('"test"');
});
