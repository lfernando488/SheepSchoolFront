import { Lesson } from './lesson';
import { CourseSubscription } from './course-subscription';
import { Student } from './student';
import { Course } from './course';
import { Gender } from './enums/gender';
import { Role } from './enums/role';

export class Instructor extends Student {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public password: string,
        public phoneNumber: string,
        public birthDate: Date,
        public gender: Gender,
        public registeredAt: Date,
        public lastLogin: Date,
        public userStatus: string,
        public portifolioURL: string,
        public courseSubscription: CourseSubscription[],
        public score: number,
        public developedCourses: Course,
        public developedLessons: Lesson[],
        public roles: Role[]
    ){
        super(id, username, firstName, lastName, email, password, 
            phoneNumber, birthDate, gender, registeredAt, lastLogin, 
            userStatus, portifolioURL, courseSubscription, score, roles);
    }
}