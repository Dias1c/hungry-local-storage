import assert from "node:assert/strict";
import test from 'node:test';
import { getExpirationTimestamp } from '../getExpirationTimestamp';
import { IExpirationAfterProps } from "../types";
import { getCurrentTimestamp } from "../getCurrentTimestamp";

test("check type number param", async (t) => {
  const table: {
    param: number,
    expected: number,
  }[] = [
      {
        param: 1,
        expected: 1,
      },
      {
        param: 60,
        expected: 60,
      },
      {
        param: 3600,
        expected: 3600,
      },
      {
        param: Number.MAX_VALUE,
        expected: Number.MAX_VALUE,
      }
    ]

  for (let i = 0; i < table.length; i++) {
    const el = table[i];
    await t.test(`onParam: ${el.param}`, (t) => {
      assert.deepStrictEqual(getExpirationTimestamp(el.param), el.expected)
    })
  }
})

// TODO: freeze DATE for correct testing
test("check type IExpirationAfterProps param", async (t) => {
  const table: {
    param: IExpirationAfterProps,
    expected: number,
  }[] = [
      {
        param: {
          seconds: 1,
        },
        expected: 1,
      },
      {
        param: {
          seconds: 3,
          minutes: 1,
        },
        expected: 63,
      },
    ]

  for (let i = 0; i < table.length; i++) {
    const el = table[i];
    await t.test(`onParam: ${el.param}`, (t) => {
      assert.deepStrictEqual(getExpirationTimestamp(el.param), el.expected + getCurrentTimestamp())
    })
  }
})