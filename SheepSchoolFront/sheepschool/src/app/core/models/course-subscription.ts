import { CourseSubscriptionPk } from './course-subscription-pk';

export class CourseSubscription {
    constructor(
        public courseId: number,
        public coursePermalink: string,
        public courseTitle: string,
        public courseSubtitle: string,
        public startedAt: Date,
        public finishedAt: Date,
        public courseSubscriptionStatus: string,
        public courseSubscriptionScore: number
    ){}
}
