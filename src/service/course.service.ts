import { ICourseDTO } from '../dto/course.dto';
import { CourseRepository } from '../repository/course.repository';

export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  async getAll() {
    const list = await this.courseRepository.getAll();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idCurso = await this.courseRepository.getById(id);
    if (!idCurso) {
      throw new Error('Curso não encontrado 👻');
    }
    return idCurso;
  }

  async create(name: string, instructorId: string, newCourse: ICourseDTO) {
    const courseName = await this.courseRepository.getByTitle(name);
    const getInstructor = await this.courseRepository.getByInstructor(instructorId);

    if (courseName && getInstructor) {
      throw new Error('Curso já cadastrado');
    }
    return this.courseRepository.create(newCourse);
  }

  async update(id: string, course: Partial<ICourseDTO>) {
    const idCurso = await this.courseRepository.getById(id);
    if (!idCurso) {
      throw new Error('Curso não encontrado 👻');
    }
    const courseUpdate = this.courseRepository.update(id, course);
    return courseUpdate;
  }

  async remove(id: string) {
    const idCurso = await this.courseRepository.getById(id);
    if (!idCurso) {
      throw new Error('Curso não encontrado 👻');
    }
    await this.courseRepository.remove(id);
  }
}
