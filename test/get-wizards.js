const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`GET /api/wizards`, function () {
  it(`respond with json`, () => {
    return request(app)
      .get(`/api/wizards`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const page = response.body;
        assert.equal(page.length, 17);
        assert.equal(Object.keys(page[0]).length, 5);
      });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
      .get(`/api/wizardsss`)
      .set(`Accept`, `application/json`)
      .expect(404)
      .expect(`Content-Type`, /html/);
  });
});
