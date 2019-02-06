import Router from 'koa-router';
import controller from '../controller';

const router = new Router({ prefix: '/api/v1' });

router.get('/movies', controller.movies.getAllMovies);
router.post('/movies', controller.movies.addMovie);
router.get('/movies/:id', controller.movies.getSingleMovie);
router.put('/movies/:id', controller.movies.updateMovie);
router.del('/movies/:id', controller.movies.deleteMovie);

export default router;
