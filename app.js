// app.js (homepage with grid cards)
async function loadPlants() {
  let { data: plants, error } = await supabase.from("plants").select("*");

  const container = document.getElementById("plant-list");
  container.innerHTML = "";

  if (error) {
    console.error("Error fetching plants:", error.message);
    container.innerHTML = "❌ Failed to load plants.";
    return;
  }

  if (!plants || plants.length === 0) {
    container.innerHTML = "<p>No plant records found in database.</p>";
    return;
  }

  // Sort plants alphabetically by common_name
  plants.sort((a, b) => (a.common_name || "").localeCompare(b.common_name || ""));

  // Create card for each plant
  plants.forEach(plant => {
    const div = document.createElement("div");
    div.className = "plant-card"; // matches your CSS

    const commonName = plant.common_name || "Unknown";
    const scientificName = plant.scientific_name || "";

    // Use first image as thumbnail, fallback if no image
    const thumbnail = plant.image_urls
      ? plant.image_urls.split(",")[0].trim()
      : "placeholder.jpg";

    div.innerHTML = `
      <a href="plant.html?id=${plant.id}">
        <img src="${thumbnail}" alt="${commonName}" />
        <h3>${commonName}</h3>
        <p><em>${scientificName}</em></p>
      </a>
    `;

    container.appendChild(div);
  });
}

window.onload = loadPlants;
