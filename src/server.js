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
    let resCode;
    let message;
    let response = [];
    if (result.length === 0) {
      resCode = "0001";
      message = "Not Applicable (N/A)";
    } else {
      resCode = "0000";
      message = "Get complete";
    }
    response.push({ responseCode: resCode, message: message });
    response.push(result);
    res.type("json").send(response);
  });

  app.post("/phones", async (req, res) => {
    const body = req.body;
    if (body.phone_name) {
      const result = await phoneModel.addPhone(body);
      const addData = await phoneModel.getOne(result);
      let response = [];
      response.push({ responseCode: "0000", message: "Add complete" });
      response.push(addData);
      res.status(201).send(response);
    } else {
      let response = [];
      response.push({ responseCode: "0001", message: "Request error" });
      res.status(400).send(response);
    }
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
    const query = req.query;
    const allData = await phoneModel.getAll();
    let index = 0;
    for (let key in allData) {
      //console.log(allData[key].id, query.id);
      if (allData[key].id === Number(query.id)) {
        await phoneModel.deletePhone(query);
        index = 1;
      }
    }
    let resCode;
    let message;
    let response = [];
    if (index === 0) {
      resCode = "0001";
      message = "Not Applicable (N/A)";
      response.push({ responseCode: resCode, message: message });
    } else if (index === 1) {
      resCode = "0000";
      message = "Delete complete";
      const result = await phoneModel.getAll();
      response.push({ responseCode: resCode, message: message });
      response.push(result);
    }
    res.type("json").send(response);
  });

  return app;
};

module.exports = setUpServer;
