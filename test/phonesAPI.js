const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
//const { setupServer } = require("../src/server");
const setUpServer = require("../src/server");
chai.should();

const server = setUpServer();
describe("Phones API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  describe("GET /phones", () => {
    it("should return all data", async () => {
      const res = await request.get("/phones");
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Get complete" });
    });

    it("should return a data", async () => {
      const res = await request.get("/phones?id=2");
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Get complete" });
    });
  });

  describe("POST /phones", () => {
    it("should add a data", async () => {
      const res = await request
        .post("/phones")
        .send({ phone_name: "Xperia XX", feature: "New2" });
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Add complete" });
    });
  });
  describe("DELETE /phones", () => {
    it("should delete a data", async () => {
      const res = await request.delete("/phones").send({ id: 7 });
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Delete complete" });
    });
  });
  describe("PATCH /phones", () => {
    it("should patch a data", async () => {
      const res = await request
        .patch("/phones")
        .send({ id: 1, phone_name: "iPhone 13", feature: "So Big" });
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Patch complete" });
    });
  });
  describe("PUT /phones", () => {
    it("should put a data", async () => {
      const res = await request
        .put("/phones")
        .send({ id: 2, phone_name: "iPhone 13 Pro", feature: "more more Big" });
      console.log(JSON.parse(res.text));
      JSON.parse(res.text)[0].should.eql({ message: "Put complete" });
    });
  });
});
