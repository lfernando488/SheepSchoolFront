import { Course } from './course';

export class Area {
    constructor(
        public id: number,
        public permalink: string,
        public name: string,
        public description: string,
        public courses: Course[]
    ){}
}
