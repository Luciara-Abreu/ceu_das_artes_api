import { Request, Response, Router } from 'express';
import { CourseService } from '../service/course.service';
import { CourseController } from '../controllers/course.controller';

const route = Router();

const courseService = new CourseService();
const courseController = new CourseController(courseService);

route.get('/', async (req: Request, res: Response) => {
  return courseController.list(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return courseController.show(req, res);
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
