import { AppDataSource } from '../data-source';
import { ICourseDTO } from '../dto/course.dto';
import { Course } from '../entity/course.entity';

const repository = AppDataSource.getRepository(Course);

export class CourseRepository {
  async getAll() {
    return await repository.find();
  }

  async getById(id: string) {
    return await repository.findOneBy({ id });
  }

  async getByTitle(name: string) {
    return await repository.findOneBy({ name });
  }

  async getByInstructor(instructorId: string) {
    return await repository.findOneBy({ instructorId });
  }

  async create(course: ICourseDTO) {
    const newCourse = repository.create(course);
    return await repository.save(newCourse);
  }

  async update(id: string, course: Partial<ICourseDTO>) {
    return await repository.update({ id }, course);
  }

  async remove(id: string) {
    return await repository.delete({ id });
  }
}
