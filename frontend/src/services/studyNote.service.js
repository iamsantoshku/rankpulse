import API from "../api/axios";


// CREATE
export const createStudyNote = (data) =>
  API.post(
    "/study-notes/create",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );


// GET SUBJECTS
export const getSubjectsByExam = (examId) =>
  API.get(
    `/study-notes/subjects/${examId}`
  );


// GET NOTES
export const getNotesBySubject = (
  examId,
  subject
) =>
  API.get(
    `/study-notes/exam/${examId}/${subject}`
  );