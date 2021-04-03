const request = require(`supertest`);
const {app} = require(`../src/server/server`);

describe(`POST /api/wizards`, function () {
  it(`should consume JSON`, () => {
    return request(app)
      .post(`/api/wizards`)
      .send({
        username: `Гендальф Серый`,
        coatColor: `rgb(56, 159, 117)`,
        eyeColor: `red`,
        fireballColor: `#5ce6c0`,
      })
      .expect(200, {
        username: `Гендальф Серый`,
        coatColor: `rgb(56, 159, 117)`,
        eyeColor: `red`,
        fireballColor: `#5ce6c0`,
      });
  });

  it(`should consume form-data`, () => {
    return request(app)
      .post(`/api/wizards`)
      .field(`username`, `Гендальф Серый`)
      .field(`coatColor`, `rgb(56, 159, 117)`)
      .field(`eyeColor`, `red`)
      .field(`fireballColor`, `#5ce6c0`)
      .expect(200, {
        username: `Гендальф Серый`,
        coatColor: `rgb(56, 159, 117)`,
        eyeColor: `red`,
        fireballColor: `#5ce6c0`,
      });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app)
      .post(`/api/wizards`)
      .field(`username`, `Гендальф Серый`)
      .field(`coatColor`, `rgb(56, 159, 117)`)
      .field(`eyeColor`, `red`)
      .field(`fireballColor`, `#5ce6c0`)
      .attach(`avatar`, `test/fixtures/keks.png`)
      .expect(200, {
        username: `Гендальф Серый`,
        coatColor: `rgb(56, 159, 117)`,
        eyeColor: `red`,
        fireballColor: `#5ce6c0`,
      });
  });
});
