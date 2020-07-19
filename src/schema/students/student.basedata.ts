import { plainToClass } from "class-transformer";
import { Student } from './student.schema';

export function createStudentBaseData(): Student[] {
    return plainToClass(Student, [
        {id: "100", name: "stud1", grade:"Grade 1"},
        {id: "101", name: "stud2", grade:"Grade 2"},
        {id: "102", name: "stud3", grade:"Grade 3"}
    ]);
}
