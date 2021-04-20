const cluster = require(`cluster`);

if (cluster.isMaster) {
  const cpuCount = require(`os`).cpus().length;

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on(`exit`, (worker)=>{
    console.log(`Worker ${worker.id} died :(`);
    cluster.fork();
  });

} else {

  const express = require(`express`);
  const app = express();

  app.get(`/constant-time`, (req, res)=>{
    res.sendStatus(200);
  });

  app.get(`/countToN`, (req, res)=>{
    const n = req.query.n;
    console.log(`N = ${n}`);

    for (let i = 0; i < n; i++) {
      console.log(`Iter ${i}`);
    }

    res.sendStatus(200);
  });

  app.get(`/countToN2`, (req, res) => {
    const n = req.query.n;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        console.log(`Iter ${i}.${j}`);
      }
    }
    res.sendStatus(200);
  });

  app.listen(3000, ()=>console.log(`Example app listening on port 3000`));
}
