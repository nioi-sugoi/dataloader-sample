import Dataloader from "dataloader";

const users = Array(1000)
  .fill(0)
  .map((_, i) => ({ id: i + 1 }));

const batchLoadFn = (ids) =>
  new Promise((resolve) => {
    console.log("new database access!! ids:", ids);

    resolve(ids.map((id) => users.find((user) => user.id === id)));
  });

const userLoader = new Dataloader(batchLoadFn, { cache: false });

await Promise.all([userLoader.load(1), userLoader.load(2)]);


process.nextTick(() => {
  userLoader.load(3);
});

process.nextTick(() => {
  userLoader.load(4);
});

userLoader.load(5)

setTimeout(() => {
  userLoader.load(4);
}, 0);

setTimeout(() => {
  userLoader.load(5);
}, 2000);

setImmediate(() => {
  userLoader.load(6);
});

setImmediate(() => {
  userLoader.load(7);
});

