import { AppDataSource } from '../data-source';
import { ICourseDTO } from '../dto/course.dto';
import { Course } from '../entity/course.entity';
import { NotFoundError, ConflictError } from '../helpers/api.error';

export class CourseService {
  private courseRepository = AppDataSource.getRepository(Course);

  async getAll() {
    const list = await this.courseRepository.find();
    if (list.length === 0 || !list.length) {
      throw new NotFoundError('A lista está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idCurso = await this.courseRepository.findOneBy({ id });
    if (!idCurso) {
      throw new NotFoundError('Curso não encontrado 👻');
    }
    return idCurso;
  }

  async create(name: string, instructorId: string, newCourse: ICourseDTO) {
    const course = await this.courseRepository.findBy({ name, instructorId });

    course.forEach((thisCourse) => {
      if (thisCourse.name === name && thisCourse.instructorId === instructorId) {
        throw new ConflictError('Curso já cadastrado');
      }
    });

    return this.courseRepository.save(newCourse);
  }

  async update(id: string, course: Partial<ICourseDTO>) {
    const idCurso = await this.courseRepository.findOneBy({ id });
    if (!idCurso) {
      throw new NotFoundError('Curso não encontrado 👻');
    }
    const courseUpdate = this.courseRepository.update(id, course);
    return courseUpdate;
  }

  async remove(id: string) {
    const idCurso = await this.courseRepository.findOneBy({ id });
    if (!idCurso) {
      throw new NotFoundError('Curso não encontrado 👻');
    }
    await this.courseRepository.delete({ id });
  }
}
