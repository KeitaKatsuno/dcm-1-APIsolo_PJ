const setUpServer = require("./server");

const app = setUpServer();

app.listen(3000, () => {
  console.log("Saerver Sarting ....");
});
