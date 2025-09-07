// app.js - homepage grid cards
async function loadPlants() {
  const container = document.getElementById("plant-list");
  container.innerHTML = "";

  try {
    const { data: plants, error } = await supabase.from("plants").select("*");
    if (error) throw error;

    if (!plants || plants.length === 0) {
      container.innerHTML = "<p>No plant records found in database.</p>";
      return;
    }

    // Sort alphabetically
    plants.sort((a, b) => (a.common_name || "").localeCompare(b.common_name || ""));

    plants.forEach(plant => {
      const card = document.createElement("div");
      card.className = "plant-card";

      const commonName = plant.common_name || "Unknown";
      const scientificName = plant.scientific_name || "";
      const thumbnail = plant.image_urls
        ? plant.image_urls.split(",")[0].trim()
        : "placeholder.jpg";

      card.innerHTML = `
        <a href="plant.html?id=${plant.id}">
          <img src="${thumbnail}" alt="${commonName}" />
          <h3>${commonName}</h3>
          <p><em>${scientificName}</em></p>
        </a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching plants:", err.message);
    container.innerHTML = "❌ Failed to load plants.";
  }
}

window.onload = loadPlants;
