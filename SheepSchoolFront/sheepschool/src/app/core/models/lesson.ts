import { Instructor } from './instructor';
import { Course } from './course';
export class Lesson {

    constructor(
        public id: number,
        public permalink: string,
        public lessonNumber: number,
        public title: string,
        public shortDescription: string,
        public videoUrl: string,
        public createdAt: Date,
        public updatedAt: Date,
        public course: Course,
        public instructors: Instructor[]
    ){}
}