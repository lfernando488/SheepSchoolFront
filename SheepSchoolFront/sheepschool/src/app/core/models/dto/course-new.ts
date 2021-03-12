export class CourseNew {
    constructor(
        public title: string,
        public subtitle: string,
        public shortDescription: string,
        public courseLevel: number,
        public courseScore: number,
        public longDescription: string | null,
        public areas: number[],
        public requirements: string[],
        public willLearn: string[],
        public wontLearn: string[],
        public instructors: number[]){ }
}
