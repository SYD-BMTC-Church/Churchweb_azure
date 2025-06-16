import { parse } from "node-html-parser";
import axios from "axios";
interface AchenDetails {
  name: string;
  img: string;
  address: string;
  phone: string;
  email: string;
  designation: string;
}
export default async function getAchens() {
  try {
    const achensIds = await searchAchen();
    const achensDetails = await Promise.all(
      achensIds.map((id) => fetchDetails(Number(id)))
    );
    return achensDetails;
  } catch (error) {
    console.error("Error fetching lectionary data:", error);
    return [];
  }
}

async function searchAchen(): Promise<number[]> {
  try {
    const response = await axios.post(
      "https://marthoma.in/clergy/",
      new URLSearchParams({
        parishname: "sydney",
        clergyname: "",
        submit: "",
      })
    );
    const achensIds: number[] = [];
    const root = parse(response.data);

    // Process special lectionary items
    root
      .querySelectorAll("a[data-href]")
      .map((elem) => elem.getAttribute("data-href"))
      .forEach((id: string | undefined) => {
        const numericId = id ? Number(id) : NaN;
        if (!isNaN(numericId)) {
          achensIds.push(numericId);
        }
      });
    return achensIds;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty string on error
  }
}
async function fetchDetails(id: number): Promise<{
  name: string;
  img: string;
  address: string;
  phone: string;
  email: string;
  designation: string;
}> {
  try {
    const response = await axios.get(
      "https://marthoma.in/wp-admin/admin-ajax.php",
      {
        params: {
          action: "clergyget",
          id: id, // Dynamically pass the id parameter
        },
      }
    );
    let data: AchenDetails = {} as AchenDetails; // Initialize data as an empty object
    const root = parse(response.data);
    // Process special lectionary items
    root.querySelectorAll("div .clergy-image").forEach(() => {
      const name = root.querySelector("div.clergy-image h5")?.text.trim() || ""; // Extracts the name
      const img =
        root.querySelector("div.clergy-image img")?.getAttribute("src") || ""; // Extracts the image URL
      const address = root.querySelector("li.address")?.text.trim() || ""; // Extracts the address
      const phone = root.querySelector("li.office")?.text.trim() || ""; // Extracts the phone number
      const email = root.querySelector("li.email")?.text.trim() || ""; // Extracts the email
      // Extract designation as the text before the first comma in the address
      const designation = name.includes("*")
        ? ""
        : address.split(",")[0].trim() || ""; // Get the part before the first comma

      data = {
        name,
        img,
        address,
        phone,
        email,
        designation,
      };
    });
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as AchenDetails; // Return an empty string on error
  }
}
