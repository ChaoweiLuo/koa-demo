import http from "node:http";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : "-"}:`, msg);
}

function delay(ms = 1000) {
  return new Promise(function(res) {
    setTimeout(res, ms);
  })
}

async function test() {
  logWithId("mid - start");
  await delay();
  logWithId("mid - 2");
  await delay()
  logWithId("mid - end")
}

async function mid2() {
  
}

let idSeq = 0;
http
  .createServer((req, res) => {
    asyncLocalStorage.run(idSeq++, async () => {
      logWithId("start");
      await test();
      // Imagine any chain of async operations here
      setTimeout(() => {
        logWithId("finish");
        res.end();
      }, Math.random() * 1000 * 2);
    });
  })
  .listen(8080);

http.get("http://localhost:8080");
http.get("http://localhost:8080");
