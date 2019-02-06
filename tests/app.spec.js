import chai, { expect } from 'chai'
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.use(chaiHttp);

const PORT = process.env.PORT || 8181;
const baseURL = `http://localhost:${PORT}/api/v1`;

describe('GET /api/v1', () => {
  let server;
  before(async () => {  
    server = app.listen(PORT);
  });

  after(async () => await server.close());

  it('it returns success', async () => {
    const response = await chai.request(baseURL).get('/');

    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Hello World!');
  });
});
