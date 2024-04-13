import { Request, Response } from 'express';
import { CourseService } from '../service/course.service';

export class CourseController {
  constructor(private courseService: CourseService) {}

  async getAll(req: Request, res: Response) {
    const listCourses = await this.courseService.getAll();

    return res.status(200).send(listCourses);
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    const course = await this.courseService.getOne(id);

    return res.status(200).send(course);
  }

  async create(req: Request, res: Response) {
    await this.courseService.create(req.body.name, req.body.instructorId, req.body);

    return res.status(200).send({ message: 'Curso adicionado com sucesso!' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.courseService.update(id, req.body);

    return res.status(200).send({ message: 'Curso atualizado com sucesso' });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.courseService.remove(id);

    return res.status(200).send({ message: 'Curso deletado com sucesso!' });
  }
}
