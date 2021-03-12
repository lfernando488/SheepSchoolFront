import { Course } from './course';
import { Student } from './student';

export class CourseSubscriptionPk {

    constructor(
        public student: Student,
        public course: Course
    ){}
}
