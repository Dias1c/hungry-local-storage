# hungry-local-storage

💾⌛ Tool for store temporary data in local storage (with autodelete expired data).

<p align="center">
  <img alt="ts" src="https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555">
  <a href="https://www.npmjs.com/package/@diaskappassov/hungry-local-storage">
    <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@diaskappassov/hungry-local-storage"/>
  </a>
  <a href="https://github.com/Dias1c/hungry-local-storage/">
    <img alt="Visit package GitHub page" src="https://img.shields.io/github/stars/Dias1c/hungry-local-storage?style=social&label=GitHub&maxAge=2592000"/>
  </a>
</p>

## About

This is a simple tool for storing data in localStorage with expiration time. It's useful for storing temporary data, such as user preferences, but also for storing data that is not needed after a certain period of time.

### Why hungry-local-storage?

The reason why I called this package `hungry-local-storage` is that he is endlessly hungry thats allowed to eat only after the item's store time expires. And it checks at specified intervals (every N seconds you specify) whether the object's storage period has expired so that it can be eaten. Such an obedient, hungry tool.

## Usage

### Installing

```sh
$ npm i "@diaskappassov/hungry-local-storage"
```

### Usage

#### Setting values to localStorage with expiration

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// No expire time
hls.set("cherry", "string");

const curTimestamp = new Date().getTime() / 1000;
// Expires after 60 seconds
hls.set("banana", 123, curTimestamp + 60);

// Expires after 3600 seconds
hls.set("apple", [1, 2, 3], curTimestamp + 3600);

// Expires after 10 minutes
hls.set("avocado", {}, { minutes: 10 });

// Expires after 3 days
hls.set("tea", { type: "green", count: 2 }, { days: 3 });

// Expires after 7 seconds + 6 minutes + 5 hours + 4 days+ 3 weeks + 2 months + 1 year
hls.set("cake", "CAAAKE!", {
  seconds: 7,
  minutes: 6,
  hours: 5,
  days: 4,
  weeks: 3,
  months: 2,
  years: 1,
});
```

#### Getting value from localStorage

Imagine that you run `hls.set("apple", [1, 2, 3], { hours: 1 });`, and you want to get this value from localStorage.

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// Returns parsed value if not expired, otherwise returns null with removing expired item from localStorage
const apple = hls.get("apple");

console.log(apple); // [1, 2, 3]
```

#### Removing expired items from localStorage

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// Removes all expired items and returns count of removed items by function flush
const countRemoved = hls.flush();
console.log("flush returned:", countRemoved);
```

> Don't worry, flush not removes localStorage items that's not have expiration field on top level of structure.

#### Setting Auto Flush

By default auto flush is disabled. To enable it, execute `setAutoFlush` method with setting values in seconds.

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// Set auto flush that runs flush every 10 minutes
hls.setAutoFlush(60 * 10);
```

> If you run `setAutoFlush` method twice with different values, then the last value will be used, and it will finish all old `autoFlush` timers.

If you set auto flush value to `null` then auto flush will be disabled.

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// Disable auto flush
hls.setAutoFlush(null);
```

#### Removing item from localStorage

```ts
import { hls } from "@diaskappassov/hungry-local-storage";

// Removes item with key "apple".
hls.remove("apple");
```

> Under code `hls.remove` just runs `localStorage.removeItem` method

### Structure of created item by hls

After running code `hls.set("apple", [1, 2, 3], { hours: 5 });`, in local storage it will be stored as follows:

```js
{
  creation: CURRENT_TIMESTAMP,
  data: "[1,2,3]",
  expiration: CURRENT_TIMESTAMP + HOURS_5,
}
```

> Property `expiration` is optional, it means, if expiration is not exists, it will be stored in local storage while you will not delete it.

## License

MIT

## Authors

- [Dias1c](https://github.com/Dias1c)
