const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}
const Resume = require("../models/Resume");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      const dataBuffer = fs.readFileSync(req.file.path);

      const pdfData = await pdfParse(dataBuffer);

      const resumeText = pdfData.text;
      
      let atsScore = 0;

      const skills = [
  // Web Development
  "html",
  "css",
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "php",
  "laravel",
  "bootstrap",
  "tailwind",
  "redux",
  "api",
  "rest api",

  // Programming Languages
  "c",
  "c++",
  "java",
  "python",
  "ruby",
  "go",
  "rust",
  "kotlin",
  "swift",

  // CS Fundamentals
  "dsa",
  "data structures",
  "algorithms",
  "oop",
  "operating system",
  "computer networks",
  "dbms",
  "oops",

  // AI / ML
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "ai",
  "nlp",
  "tensorflow",
  "pytorch",
  "opencv",

  // Cloud / DevOps
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "jenkins",
  "ci/cd",
  "linux",

  // Tools
  "git",
  "github",
  "postman",
  "firebase",
  "vercel",
  "render",
  "netlify",
  "figma",

  // Mobile Development
  "react native",
  "flutter",
  "android",
  "ios",

  // Blockchain
  "blockchain",
  "solidity",
  "smart contract",
  "web3",

  // Data Science
  "pandas",
  "numpy",
  "matplotlib",
  "power bi",
  "excel",

  // Soft Skills
  "communication",
  "leadership",
  "teamwork",
  "problem solving",
];

      let detectedSkills = [];

      skills.forEach((skill) => {
       if (resumeText.toLowerCase().includes(skill)) {
          atsScore += 5;
          detectedSkills.push(skill);
        }
      });

      if (atsScore > 100) {
  atsScore = 100;
}
    await Resume.create({
  atsScore,
  detectedSkills,
});
      res.json({
        atsScore,
        detectedSkills,
        resumeText,
       
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;