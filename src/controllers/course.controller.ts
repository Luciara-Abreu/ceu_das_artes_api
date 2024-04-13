import { Request, Response } from 'express';
import { CourseService } from '../service/course.service';

export class CourseController {
  constructor(private courseService: CourseService) {}

  async getAll(req: Request, res: Response) {
    try {
      const listCourses = await this.courseService.list();
      res.status(200).send(listCourses);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const course = await this.courseService.show(id);
      res.status(200).send(course);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
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
