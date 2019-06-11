"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark_1 = __importDefault(require("benchmark"));
const suite = new benchmark_1.default.Suite;
const now = Date.now();
suite.add("Re-use", () => {
    let ms = Math.round(now), ss = ms / 1000, mm = ss / 60, hh = mm / 60;
    ms %= 1000;
    ss = Math.floor(ss % 60);
    mm = Math.floor(mm % 60);
    hh = Math.floor(hh % 60);
});
suite.add("Redundant", () => {
    Math.round(now % 1000);
    Math.floor(now / 1000 % 60);
    Math.floor(now / (1000 * 60) % 60);
    Math.floor(now / (1000 * 60 * 60) % 60);
});
suite.add("Premultiplied", () => {
    Math.round(now % 1000);
    Math.floor(now / 1000 % 60);
    Math.floor(now / 60000 % 60);
    Math.floor(now / 3600000 % 60);
});
suite.add("Date", () => {
    const date = new Date(now);
    date.getUTCHours();
    date.getUTCMinutes();
    date.getUTCSeconds();
    date.getUTCMilliseconds();
});
suite.on("cycle", event => {
    const target = event.target;
    // console.log(target.toString())
    let hz = Math.round(target.hz).toString().padStart(9, " ").replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, $0 => $0 + " ");
    console.log(target.name.padEnd(15, " "), "x", hz, "ops/sec ±" + target.stats.rme.toFixed(2) + "%", "(", target.stats.sample.length, "runs sampled)");
});
suite.run({ async: true });