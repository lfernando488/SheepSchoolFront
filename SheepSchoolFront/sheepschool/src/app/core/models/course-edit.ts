import { Area } from './area';
import { Instructor } from './instructor';
import { Lesson } from './lesson';

export class CourseEdit {
    constructor(
        public id: number,
        public courseId: number,
        public permalink: string,
        public title: string,
        public subtitle: string,
        public shortDescription: string,
        public longDescription: string,
        public courseLevel: string,
        public editedAt: Date,
        public courseScore: number,
        public areas: Area[],
        public lessons: Lesson[],
        public instructors: Instructor[],
        public requirements: string[],
        public willLearn: string[],
        public wontLearn: string[],
        public courseeditStatus: string){ }
}
