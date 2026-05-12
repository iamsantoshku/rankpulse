import {
  getNotesBySubject
} from "../../services/studyNote.service";

import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

const NotesViewerPage = () => {

  const { examId, subject } = useParams();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {

    const res =
      await getNotesBySubject(
        examId,
        subject
      );

    setNotes(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-10">
        {subject} Notes
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {notes.map((note) => (

          <div
            key={note._id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h2 className="text-xl font-bold mb-4">
              {note.title}
            </h2>

            <a
              href={note.pdfUrl}
              target="_blank"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Open PDF
            </a>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesViewerPage;