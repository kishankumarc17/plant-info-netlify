// app.js

async function loadPlants() {
  // Fetch data from Supabase table (make sure the table name is correct)
  let { data, error } = await supabase
    .from("plants")   // 👈 replace "plants" with your actual table name if different
    .select("*");

  if (error) {
    console.error("Error fetching plants:", error.message);
    document.getElementById("plant-list").innerHTML = "❌ Failed to load plants.";
    return;
  }

  // Display the plant data on the page
  const container = document.getElementById("plant-list");
  container.innerHTML = "";
  data.forEach(plant => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${plant.common_name} (${plant.scientific_name})</h3>
      <p>🌱 Date of Planting: ${plant.date_of_planting}</p>
      <p>📏 Max Height: ${plant.max_height}</p>
      <p>🌍 Origin: ${plant.origin}</p>
      <p>💧 Water Requirement: ${plant.water_requirement}</p>
      <p>🌸 Flowering: ${plant.flowering}</p>
      <p>💊 Medicinal Value: ${plant.medicinal_value}</p>
      <img src="${plant.image_url}" width="200"/>
    `;
    container.appendChild(div);
  });
}

// Run when page loads
window.onload = loadPlants;
