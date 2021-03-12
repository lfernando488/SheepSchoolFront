import { Role } from './enums/role';
import { Gender } from './enums/gender';

export class User {

    constructor(
        public id: number,
        public username :string,
        public firstName: string,
        public lastName :string,
        public email :string,
        public password :string,
        public phoneNumber :string,
        public birthDate : Date,
        public gender : Gender,
        public registeredAt : Date,
        public lastLogin: Date,
        public userStatus: string,
        public roles: Role[]
    ){}

    
}
