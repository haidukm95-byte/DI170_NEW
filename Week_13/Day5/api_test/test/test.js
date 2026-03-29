const request = require("supertest");
// app is supposed to point to the app.js file
const app = require("/app");
const supertest = require("supertest");

describe("Testing POSTS/shots endpoint", function () {
  it("respond with valid HTTP status code and description and message", async function (done) {
    //Make POST request
    const response = await supertest(app).post("/shots").send({
      title: "How to write a shot",
      body: "access the Edpresso tutorial",
    });
    // Compare response with expectations
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Shot saved successfully.");
  });
});
