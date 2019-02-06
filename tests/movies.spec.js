import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import knex from '../src/db/connection';
import app from '../src/app';

chai.use(chaiHttp);

const PORT = process.env.PORT || 8181;
const baseURL = `http://localhost:${PORT}/api/v1`;

describe('route: movies', () => {
  let server;
  before(async () => {
    server = await app.listen(PORT);
  });
  after(async () => await server.close());

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  describe('GET /api/v1/movies', () => {
    it('should return all movies', async () => {
      const response = await chai.request(baseURL).get('/movies');

      expect(response.body.status).to.equal('success');
      expect(response.body.data.length).to.equal(3);
      expect(response.body.data[0]).to.include.keys([
        'id', 'name', 'genre', 'rating', 'explicit'
      ]);
    });
  });

  describe('GET /api/v1/movies/:id', () => {
    it('should respond with a single movie', async () => {
      const response = await chai.request(baseURL).get('/movies/1');
  
      expect(response.type).to.equal('application/json');
      expect(response.body.status).to.equal('success');
      expect(response.body.data[0]).to.include.keys([
        'id', 'name', 'genre', 'rating', 'explicit'
      ]);
    });
  });

  describe('POST /api/v1/movies', () => {
    it('should return the movie that was added', async () => {
      const payload = {
        name: 'Titanic',
        genre: 'Drama',
        rating: 8,
        explicit: true,    
      };
      const response = await chai.request(baseURL).post('/movies')
        .send(payload);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.name).to.equal(payload.name);
      expect(response.body.data).to.include.keys([
        'id', 'name', 'genre', 'rating', 'explicit'
      ]);
    });
    it('should return an error if payload is malformed', async () => {
      const response = await chai.request(baseURL).post('/movies')
        .send({ name: 'Titanic' });
      expect(response.body.status).to.equal('error');
      expect(response.body.data).to.be.null;
    });
  });

  describe('PUT /api/v1/movies/:id', () => {
    it('should return the movie that was updated', async () => {
      const response = await chai.request(baseURL).put('/movies/1')
        .send({ rating: 9 });
      expect(response.body.data.rating).to.equal(9);
    });
    it('should throw an error if movie does not exist', async () => {
      const response = await chai.request(baseURL).put('/movies/16')
        .send({ rating: 9 });
      expect(response.body.status).to.equal('error');
      expect(response.body.data).to.be.null;
    });
  });

  describe('DELETE /api/v1/movies/:id', () => {
    it('should return the movie that was deleted', async () => {
      const response = await chai.request(baseURL).del('/movies/2');
      expect(response.body.status).to.equal('success');
      expect(response.body.data).to.be.null;
      expect(response.body.message).to.equal('Successfully deleted movie.');
    });
  })
});
