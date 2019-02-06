import services from '../services';

const getAllMovies = async (ctx, next) => {
  const movies = await services.movies.getAllMovies();
  ctx.body = {
    status: 'success',
    message: 'Successfully retrieved movies.',
    data: movies,
  };
};

const getSingleMovie = async (ctx, next) => {
  const movie = await services.movies.getSingleMovie(ctx.params.id);
  ctx.body = {
    status: 'success',
    message: 'Successfully retrieved movie.',
    data: movie,
  };
};

const addMovie = async (ctx, next) => {
  try {
    const payload = ctx.request.body;
    const movie = await services.movies.addMovie(payload);
    if (movie.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'Successfully added movie.',
        data: movie[0],
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
        data: null,
      };
    }
  } catch (err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
      data: null,
    };
  }
};

const updateMovie = async (ctx, next) => {
  try {
    const movie = await services.movies
      .updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.body = {
        status: 'success',
        message: 'Successfully updated data.',
        data: movie[0],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'The movie does not exist.',
        data: null,
      };
    }
  } catch(err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
      data: null,
    };
  }
};

const deleteMovie = async (ctx, next) => {
  try {
    const movie = await services.movies.deleteMovie(ctx.params.id);
    if (movie.length) {
      ctx.body = {
        status: 'success',
        data: null,
        message: 'Successfully deleted movie.',
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        data: null,
        message: 'Movie does not exist',
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
}

export default {
  getAllMovies, getSingleMovie,
  addMovie, updateMovie, deleteMovie,
};
