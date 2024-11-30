import dayjs, { Dayjs } from "dayjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useEventsData } from "./useEventsData";
import { useHoursData } from "./useHoursData";

type Project = {
  id: number;
  name: string;
  month: string;
  members: number;
  hours: number;
  timeSpent: string;
};

export const useGenAdminReport = () => {
  const { data: events } = useEventsData();
  const { data: hours } = useHoursData(true);

  const genFn = async (start: Dayjs) => {
    const filteredEvents = events?.data?.filter(
      (e) => dayjs(e.time).isBefore(dayjs()) && dayjs(e.time).isAfter(start)
    );
    const filteredEventIds = filteredEvents?.map((e) => e.id) ?? [];
    // TODO: warn if hours contains unapproved hours
    const filteredHours = hours?.filter(
      (h) =>
        h.is_approved &&
        h.has_event &&
        h.event_id &&
        filteredEventIds.includes(h.event_id)
    );
    // TODO: add option to include or exclude description
    const projects: Project[] | undefined = filteredEvents?.map((e) => {
      const eventHours = filteredHours?.filter((h) => h.event_id == e.id);
      return {
        id: e.id,
        name: e.name ?? "",
        month: dayjs(e.time).format("MMM YYYY") ?? "",
        members: [...new Set(eventHours?.map((h) => h.email))].length,
        hours:
          eventHours
            ?.map((h) => h.hours)
            .reduce((a, b) => {
              return a + b;
            }, 0) ?? 0,
        timeSpent:
          e.shifts.length > 1
            ? "varies"
            : eventHours?.at(0)?.hours.toString() ?? "",
      };
    });
    const totalHours = projects?.map((p) => p.hours).reduce((a, b) => a + b, 0);

    const pdfDoc = await PDFDocument.create();

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );
    const headerFontSize = 32;
    const fontSize = 14;

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let yPos = height - 80;

    page.drawText("Service Project Report", {
      x: 50,
      y: yPos,
      size: headerFontSize,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 32;
    page.drawText(
      start.format("MM/DD/YYYY") + "-" + dayjs().format("MM/DD/YYYY"),
      {
        x: 50,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      }
    );
    yPos = yPos - 32;
    page.drawText("Generated " + dayjs().format("MM/DD/YYYY"), {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 50;
    page.drawText("Project", {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Month", {
      x: 250,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Mbrs", {
      x: 325,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Time Spent", {
      x: 375,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText("Hours", {
      x: 475,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    projects?.forEach((p) => {
      yPos = yPos - fontSize;
      page.drawLine({
        start: { x: 50, y: yPos },
        end: { x: width - 50, y: yPos },
        thickness: 2,
        color: rgb(0, 0, 0),
        opacity: 0.75,
      });
      yPos = yPos - fontSize;
      page.drawText(p.name, {
        x: 50,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(p.month, {
        x: 250,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(p.members.toString(), {
        x: 325,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(p.timeSpent, {
        x: 375,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(p.hours.toString(), {
        x: 475,
        y: yPos,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });
    yPos = yPos - 32;
    page.drawText("Total Hours: " + totalHours, {
      x: 50,
      y: yPos,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    yPos = yPos - 32;
    page.drawText("Total Projects: " + projects?.length, {
      x: 50,
      y: yPos,
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
        "Service Project Report " + dayjs().format("MM/DD/YYYY")
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return genFn;
};
