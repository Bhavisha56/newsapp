export default async function handler(req, res) {
  console.log("🔁 API /api/newapi hit");
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing NEWS_API_KEY");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from NewsAPI' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("API fetch error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
