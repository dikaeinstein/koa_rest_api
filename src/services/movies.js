import queries from '../db/queries';

const getAllMovies = async () => await queries.getAllMovies();
const getSingleMovie = async id => await queries.getMovie(id);
const addMovie = async movie => await queries.addMovie(movie);
const updateMovie = async (id, payload) =>
  await queries.updateMovie(id, payload);

const deleteMovie = async id => await queries.deleteMovie(id);

export default {
  getAllMovies, getSingleMovie, addMovie,
  updateMovie, deleteMovie,
};
