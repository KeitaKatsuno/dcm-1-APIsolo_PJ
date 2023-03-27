const express = require("express");
const phoneModel = require("./phone.model");

const setUpServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/phones", async (req, res) => {
    const query = req.query;
    const id = query.id;
    let result;
    if (id === undefined) {
      result = await phoneModel.getAll();
    } else {
      result = await phoneModel.getOne(id);
    }
    let response = [];
    response.push({ responseCode: "0000", message: "Get complete" });
    response.push(result);
    res.type("json").send(response);
  });

  app.post("/phones", async (req, res) => {
    const body = req.body;
    //console.log(body);
    const result = await phoneModel.addPhone(body);
    //console.log(result);
    const addData = await phoneModel.getOne(result);
    console.log(addData);
    let response = [];
    response.push({ responseCode: "0000", message: "Add complete" });
    response.push(addData);
    res.status(201).send(response);
  });

  app.patch("/phones", async (req, res) => {
    const body = req.body;
    const result = await phoneModel.updatePhone(body);
    const patchData = await phoneModel.getOne(result);

    let response = [];
    response.push({ responseCode: "0000", message: "Patch complete" });
    response.push(patchData);
    res.send(response);
  });

  app.put("/phones", async (req, res) => {
    const body = req.body;
    console.log(body);
    let allData;
    let result;
    let index = 0;
    allData = await phoneModel.getAll();
    for (let i in allData) {
      if (allData[i].id === body.id) {
        result = await phoneModel.updatePhone(body);
        index = 1;
      }
    }
    if (index === 0) {
      result = await phoneModel.addPhone(body);
    }
    const putData = await phoneModel.getOne(result);
    let response = [];
    response.push({ responseCode: "0000", message: "Put complete" });
    response.push(putData);
    res.send(response);
  });

  app.delete("/phones", async (req, res) => {
    const body = req.body;
    const result = await phoneModel.deletePhone(body);
    const allData = await phoneModel.getAll();
    let response = [];
    response.push({ responseCode: "0000", message: "Delete complete" });
    response.push(allData);
    res.send(response);
  });

  return app;
};

module.exports = setUpServer;
