import assert from "node:assert/strict";
import test from "node:test";
import { parseItem } from "../parseItem";

test("check function for any types", async (t) => {
  const table: {
    param: any,
    expected: any,
  }[] = [
      {
        param: "-1",
        expected: -1,
      },
      {
        param: "1",
        expected: 1,
      },
      {
        param: 123,
        expected: 123,
      },
      {
        param: "this is string",
        expected: "this is string",
      },
      {
        param: "\"this is string\"",
        expected: "this is string",
      },
      {
        param: '{"string":"string","number":123,"boolean":false,"null":null,"object":{},"array":[1,"string",true,false,null]}',
        expected: {
          string: "string",
          number: 123,
          boolean: false,
          null: null,
          object: {},
          array: [1, "string", true, false, null],
        },
      },
      {
        param: {
          string: "string",
          number: 123,
          boolean: false,
          null: null,
          undefined: undefined,
          object: {},
          array: [1, "string", true, false],
        },
        expected: {
          string: "string",
          number: 123,
          boolean: false,
          null: null,
          undefined: undefined,
          object: {},
          array: [1, "string", true, false],
        },
      },
      {
        param: '[1,"string", true, false, null]',
        expected: [1, "string", true, false, null],
      },
      {
        param: [1, "string", true, false, undefined, null],
        expected: [1, "string", true, false, undefined, null],
      },
    ]

  for (let i = 0; i < table.length; i++) {
    const el = table[i];
    await t.test(`onParam: ${el.param}`, (t) => {
      const actual = parseItem(el.param)
      assert.deepEqual(actual, el.expected)
    })
  }
})