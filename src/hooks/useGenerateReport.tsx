import dayjs from "dayjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const useGenerateReport = () => {
  const genFn = async (email: string, hours: any[]) => {
    hours = hours
      .filter((h) => h.is_approved)
      .sort((a, b) => dayjs(a.date_completed).diff(dayjs(b.date_completed)));

    const total = hours.map((h) => h.hours).reduce((a, b) => a + b);
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );
    const headerFontSize = 48;
    const fontSize = 14;

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let yPos = height - 80;

    page.drawText("Service Hour Log", {
      x: 50,
      y: yPos,
      size: headerFontSize,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 32;
    page.drawText(email, {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 14;
    page.drawText("Generated " + dayjs().format("MM/DD/YYYY"), {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 50;
    page.drawText("Date", {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Hours", {
      x: 200,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Event", {
      x: 350,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    hours.forEach((h, i) => {
      page.drawLine({
        start: { x: 50, y: height - 70 - (4 + i) * 2 * fontSize },
        end: { x: width - 50, y: height - 70 - (4 + i) * 2 * fontSize },
        thickness: 2,
        color: rgb(0, 0, 0),
        opacity: 0.75,
      });
      page.drawText(dayjs(h.date_completed).format("MM/DD/YYYY"), {
        x: 50,
        y: height - 80 - (4 + i) * 2 * fontSize - 8,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(h.hours.toString(), {
        x: 200,
        y: height - 80 - (4 + i) * 2 * fontSize - 8,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(h.has_event && h.events ? h.events.name : "", {
        x: 350,
        y: height - 80 - (4 + i) * 2 * fontSize - 8,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });
    page.drawText("Total: "+total, {
      x: 50,
      y: 150,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Volunteer: ____________________    Date: ____________", {
      x: 50,
      y: 100,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Advisor: ____________________    Date: ____________", {
      x: 50,
      y: 80,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        "Service Hour Log " + dayjs().format("MM/DD/YYYY")
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return genFn;
};
