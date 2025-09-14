import { jsPDF } from "jspdf";

const handleDownloadPdf = (mcqs) => {

  const doc = new jsPDF();
  doc.setFontSize(12);

  let y = 20; // starting Y position
  mcqs.forEach((mcq, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    // Question
    doc.text(`${index + 1}. ${mcq.question}`, 10, y);
    y += 7;

    // Options (loop through array)
    mcq.answers.forEach((ans, i) => {
      const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
      doc.text(`${optionLetter}) ${ans}`, 15, y);
      y += 7;
    });

    // Correct Answer
    doc.text(`Answer: ${mcq.correctAnswer}`, 15, y);
    y += 20; // extra spacing before next question
  });

  doc.save("mcqs.pdf");
};


export {handleDownloadPdf}