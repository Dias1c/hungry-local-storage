import assert from "node:assert/strict";
import test from 'node:test';
import { getCurrentTimestamp } from '../getCurrentTimestamp';

test('check for existing floating numbers (miliseconds)', async (t) => {
  for (let i = 0; i < 3; i++) {
    await t.test(`try ${i + 1}`, (t) => {
      assert.strictEqual((getCurrentTimestamp() * 1000) % 1000, 0);
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
});