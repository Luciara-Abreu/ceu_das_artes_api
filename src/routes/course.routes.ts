import { Request, Response, Router } from 'express';
import { CourseRepository } from '../repository/course.repository';
import { CourseService } from '../service/course.service';
import { CourseController } from '../controllers/course.controller';

const route = Router();

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

route.get('/', async (req: Request, res: Response) => {
  return courseController.getAll(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return courseController.getId(req, res);
});

route.post('/', async (req: Request, res: Response) => {
  return courseController.create(req, res);
});

route.patch('/:id', async (req: Request, res: Response) => {
  return courseController.update(req, res);
});

route.delete('/:id', async (req: Request, res: Response) => {
  return courseController.delete(req, res);
});

export default route;
