import { ResolverService } from '@tsed/graphql';
import { Arg, Query, Mutation } from "type-graphql";
import { Student } from './student.schema';
import { createStudentBaseData } from './student.basedata';

@ResolverService(() => Student)
export class StudentsResolver {

    private readonly students: Student[] = createStudentBaseData();

    constructor() {}

    @Query(returns => Student)
    async getStudent(@Arg("id") id: string): Promise<Student>  {
        return this.students.find(stud => stud.id === id);
    }

    @Query(returns => [Student])
    async getAllStudents(): Promise<Student[]>  {
        return this.students;
    }

    @Mutation(returns => Student)
    async postStudent(@Arg("id") id: string,
            @Arg("name") name: string,
            @Arg("grade") grade: string): Promise<Student> {
        const stud = this.createLocalStudent(id, name, grade);
        this.students.push(stud);
        return stud;
    }

    @Mutation(returns => Student)
    async updateStudentGrade(@Arg("id") id: string,
            @Arg("grade") grade: string): Promise<Student>  {
        const index = this.students.findIndex(stud => stud.id === id);
        if(!index) {
            return null;
        }
        this.students[index].grade = grade;
        return this.students[index];
    }

    @Mutation(returns => Boolean)
    async removeStudent(@Arg("id") id: string): Promise<Boolean>  {
        const index = this.students.findIndex(stud => stud.id === id);
        if(index === -1) {
            return false;
        }
        this.students.splice(index, 1);
        return true;
    }

    createLocalStudent(id: string, name: string, grade: string): Student {
        const student = new Student();
        student.grade = grade;
        student.id = id;
        student.name = name;
        return student;
    }
}
