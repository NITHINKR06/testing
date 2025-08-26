export default async function handler(req, res) {
  try {
    const apiKey = process.env.OTX_API_KEY;

    // Fetch recent indicators using export endpoint
    const response = await fetch(
      "https://otx.alienvault.com/api/v1/indicators/export?limit=10",
      {
        headers: { "X-OTX-API-KEY": apiKey },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch threat data" });
    }

    const textData = await response.text(); // export returns text, not JSON
    const lines = textData.trim().split("\n"); // split indicators by line

    // Map lines into objects (basic parsing)
    const recentThreats = lines.map((line, idx) => ({
      id: idx,
      raw: line,
    }));

    res.status(200).json({ recentThreats });
  } catch (error) {
    console.error("Error fetching threat data:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}