console.log(`startup`);
process.nextTick(() => {
  console.log(`tick`);
});

setImmediate(() => {
  console.log(`immediate`);

  setTimeout(() => {
    console.log(`inner timeout`);
  }, 0);

  process.nextTick(() => {
    console.log(`inner tick`);
  });

  setImmediate(() => {
    console.log(`inner immediate`);
  });
});
setTimeout(() => {
  console.log(`timeout`);
}, 0);
