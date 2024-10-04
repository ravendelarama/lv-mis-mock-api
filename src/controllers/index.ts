export {
  getCollegeStudents,
  seedCollegeStudents,
  getCollegeStudentByIdAndIdType,
  truncateCollegeStudentsCollection,
  getCollegeSectionByStudentId,
  getCollegeSubjectsByStudentId,
} from "./college-student";

export {
  getCollegeSubjects,
  getCollegeSubjectById,
  getCollegeStudentsBySubjectId,
  getCollegeSectionsBySubjectId,
  getCollegeInstructorBySubjectId,
} from "./college-subject";

export { getCollegeInstructors } from "./college-instructor";
