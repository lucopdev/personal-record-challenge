import * as sinon from "sinon";
const chai = require("chai");
const chaiHttp = require("chai-http");

import app from "../src/app";
import User from "../src/dbRecords/model/User.model";
import mock from "./Mocks/userMocks";

chai.use(chaiHttp);
const { expect } = chai;

describe("Testing backend application", () => {
  it('checks if can get all users from the route "/api/users"', async () => {
    const findAllUser = User.bulkBuild(mock.usersMock);
    sinon.stub(User, "findAll").resolves(findAllUser);

    const httpResponse = await chai.request(app).get("/api/users");

    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an("array");
    expect(httpResponse.body).to.be.deep.equal(mock.usersMock);
    expect(httpResponse.body.length).to.be.greaterThan(0);
  });

  it('checks if can get an users from the route "/api/users" searching by query', async () => {
    const findUser = User.bulkBuild(mock.singleUserMock);
    sinon.stub(User, "findAll").resolves(findUser);

    const httpResponse = await chai
      .request(app)
      .get("/api/users")
      .query({ q: "marky" });

    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an("array");
    expect(httpResponse.body).to.be.deep.equal(mock.singleUserMock);
  });

  it('checks if returns an error message at route "/api/users" getting no response from api', async () => {
    sinon.stub(User, "findAll").resolves([]);

    const httpResponse = await chai
      .request(app)
      .get("/api/users")
      .query({ q: "notwork" });

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.deep.equal({ message: "User not found." });
  });

  it('checks if is possible to delete a file at route "/api/file"', async () => {
    const fileDeleted = sinon.stub(User, "destroy").resolves(1);
    const httpResponse = await chai
      .request(app)
      .delete("/api/file")
      .send(mock.deletedUser);

    expect(httpResponse).to.have.status(204);
    expect(fileDeleted.calledOnce).to.be.true;
  });

  // it('checks if it's possible to post a file at route "/api/file"', async function () {
  //   sinon.stub(User, "findOne").resolves(null);

  //   const fileReceived = Buffer.from(
  //     "6e616d652c636974792c636f756e7472792c6661766f726974655f73706f72740a4a6f686e20446f652c4e657720596f726b2c5553412c4261736b657462616c6c0a",
  //     "utf-8"
  //   );

  //   const httpResponse = await chai
  //     .request(app)
  //     .post("/api/file")
  //     .send(fileReceived);

  //   expect(httpResponse.body).to.deep.equal({
  //     message: "User successfully registered.",
  //   });
  // });

  afterEach(sinon.restore);
});
