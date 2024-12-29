export {
} from "./college-student.controller";

export { getStudentInformationBySchoolId, createStudentInformation } from './student.controller'

export {
  getCollegeSubjects,
  getCollegeSubjectById,
  getCollegeStudentsBySubjectId,
  getCollegeSectionsBySubjectId,
  getCollegeInstructorBySubjectId,
} from "./college-subject.controller";

export {
  createInstructor
} from "./instructor.controller";

export { verifyMetaMessengerWebhook, handleReferralEvent } from "./webhook.controller";

export { handleGoogleCallback, validateOAuthToken } from "./auth.controller";

export { getSelf, createUser } from './user.controller'

export { getStrands, createStrand } from './strand.controller'

export { handleSamsAuthentication } from "./student-attendance-management-system/sams.controller";
export {} from "./grading-management-system";
