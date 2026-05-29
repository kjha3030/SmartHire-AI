import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://smarthire-ai-bjwn.onrender.com/api/resume/upload",
        formData
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text("SmartHire AI Resume Report", 20, 20);

  doc.setFontSize(16);

  doc.text(
    `ATS Score: ${result.atsScore}%`,
    20,
    40
  );

  doc.text("Detected Skills:", 20, 60);

  result.detectedSkills.forEach((skill, index) => {

    doc.text(
      `• ${skill}`,
      25,
      75 + index * 10
    );

  });

  doc.save("ATS_Report.pdf");
};

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center mb-6 text-green-400">
          SmartHire AI 🚀
        </h1>

        <div className="border-2 border-dashed border-green-400 rounded-xl p-8 text-center">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />

          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Upload Resume
          </button>

        </div>

        {result && (

          <div className="mt-8">

            <div className="bg-gray-800 p-6 rounded-2xl mb-5 flex flex-col items-center">

              <h2 className="text-2xl font-bold text-green-400 mb-5">
                ATS Score
              </h2>

              <div className="relative w-40 h-40">

                <svg className="w-40 h-40 transform -rotate-90">

                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#374151"
                    strokeWidth="12"
                    fill="transparent"
                  />

                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#22c55e"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={
                      440 - (440 * result.atsScore) / 100
                    }
                    strokeLinecap="round"
                  />

                </svg>

                <div className="absolute inset-0 flex items-center justify-center">

                  <span className="text-4xl font-bold">
                    {result.atsScore}%
                  </span>

                </div>

              </div>

            </div>

           <div className="bg-gray-800 p-5 rounded-xl">

  <h2 className="text-2xl font-bold text-green-400 mb-4">
    Detected Skills
  </h2>

  <div className="flex flex-wrap gap-3">

    {result.detectedSkills.map((skill, index) => (

      <span
        key={index}
        className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold"
      >
        {skill}
      </span>

    ))}

  </div>

</div>

            <div className="bg-gray-800 p-5 rounded-xl mt-5">

              <h2 className="text-2xl font-bold text-yellow-400 mb-3">
                Resume Suggestions
              </h2>

              <ul className="space-y-2 text-gray-300">

                {result.atsScore < 40 && (
                  <li>
                    • Add more technical skills to improve ATS score
                  </li>
                )}

                {result.atsScore < 60 && (
                  <li>
                    • Include projects and deployment experience
                  </li>
                )}

                {!result.detectedSkills.includes("github") && (
                  <li>
                    • Add GitHub projects to strengthen resume
                  </li>
                )}

                {!result.detectedSkills.includes("react") && (
                  <li>
                    • Add React projects for frontend roles
                  </li>
                )}

              </ul>
              <button
  onClick={downloadReport}
  className="w-full mt-5 bg-blue-500 hover:bg-blue-600 transition p-4 rounded-xl font-bold"
>
  Download ATS Report
</button>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default ResumeUpload;