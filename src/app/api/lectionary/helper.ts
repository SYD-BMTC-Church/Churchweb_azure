import { parse } from "node-html-parser";
import axios from "axios";

export default async function getLectionaryList() {
  try {
    const htmlString = await fetchData();
    if (!htmlString) return [];

    const speciaLectionaryList: any[] = [];
    const lectionaryList: any[] = [];
    const root = parse(htmlString);

    // Process special lectionary items
    root
      .querySelectorAll(".lectionary-list.special-lectionary li")
      .forEach((elem) => {
        const title = elem.querySelector(".month-fld")?.text.trim() || "";
        const readings = elem
          .querySelectorAll(".reading-content")
          .map((content) => content.text.trim());

        speciaLectionaryList.push({ [title]: readings });
      });

    // Process regular lectionary items
    root
      .querySelectorAll(".lectionary-list:not(.special-lectionary) li")
      .forEach((elem) => {
        const date = elem.querySelector(".date-fld")?.text.trim() || "";
        const month = elem.querySelector(".month-fld")?.text.trim() || "";
        const currentYear = new Date().getFullYear();

        const fullDate = `${date} ${month.toUpperCase()} ${currentYear}`;
        const parsedDate = new Date(fullDate);

        const topic = elem.querySelector(".lec-title")?.text.trim() || "";

        const readingLists = elem.querySelectorAll(".reading-list");
        const lessons = extractReadings(readingLists[0]);
        const epistleGospel = extractReadings(readingLists[1]);
        const eveningReading = extractReadings(readingLists[2]);

        lectionaryList.push({
          [parsedDate.toISOString()]: {
            Topic: topic,
            Lessons: lessons,
            "Epistle Gospel": epistleGospel,
            "Evening Reading": eveningReading,
          },
        });
      });

    return { speciaLectionaryList, lectionaryList };
  } catch (error) {
    console.error("Error fetching lectionary data:", error);
    return [];
  }
}

export async function getTodays(): Promise<string> {
  try {
    const response = await getLectionaryList();
    return (
      JSON.parse(response.toString()).lectionaryList[
        new Date().toISOString()
      ] || []
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return ""; // Return an empty string on error
  }
}

async function fetchData(): Promise<string> {
  try {
    const response = await axios.get("https://marthoma.in/lectionary/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return ""; // Return an empty string on error
  }
}

function extractReadings(listElement: any): string[] {
  if (!listElement) return [];
  return listElement
    .querySelectorAll(".reading-content")
    .map((content: any) => content.text.trim());
}
