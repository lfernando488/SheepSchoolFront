import { User } from './user';
import { CourseSubscription } from './course-subscription';
import { Gender } from './enums/gender';
import { Role } from './enums/role';
export class Student extends User{

    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phoneNumber: string,
        public birthDate: Date,
        public gender: Gender,
        public registeredAt: Date,
        public lastLogin: Date,
        public userStatus: string,
        public portfolioURL: string,
        public courseSubscription: CourseSubscription[],
        public score: number,
        public roles: Role[]
    ){
        super( id, username, firstName, lastName, email, 
            password, phoneNumber, birthDate, gender,
            registeredAt, lastLogin, userStatus, roles );
    }
}