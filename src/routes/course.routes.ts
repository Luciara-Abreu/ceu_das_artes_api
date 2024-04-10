import { Request, Response, Router } from 'express';
import { CourseRepository } from '../repository/course.repository';
import { CourseService } from '../service/course.service';

const route = Router();

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

//listar todos
route.get('/', async (req: Request, res: Response) => {
  try {
    const listCourses = await courseService.getAll();
    res.status(200).send(listCourses);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//listar um
route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const course = await courseService.getOne(id);
    res.status(200).send(course);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//add course
route.post('/', async (req: Request, res: Response) => {
  try {
    await courseService.create(req.body.name, req.body.instructorId, req.body);
    res.status(200).send({ message: 'Curso adicionado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//atualizar
route.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await courseService.update(id, req.body);
    res.status(200).send({ message: 'Curso atualizado com sucesso' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//deletar
route.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await courseService.remove(id);
    res.status(200).send({ message: 'Curso deletado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default route;
