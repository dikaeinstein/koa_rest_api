import knex from '../connection';

export const getAllMovies = () => knex('movies').select('*');

export const getMovie = id =>
  knex('movies').select('*').where({ id });

export const addMovie = movie => knex('movies').insert(movie)
  .returning('*');

export const updateMovie = (id, payload) => knex('movies')
  .update(payload)
  .where({ id })
  .returning('*');

export const deleteMovie = id => knex('movies')
  .del()
  .where({ id })
  .returning('*');
