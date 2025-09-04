// app.js

async function loadPlants() {
  // Fetch data from Supabase table (make sure the table name is correct)
  let { data, error } = await supabase
    .from("Smart Campus Plant Information")   // replace "plants" with your actual table name if different
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
      <p><strong>Date of Planting:</strong> ${plant.date_of_planting}</p>
      <p><strong>Max Height:</strong> ${plant.max_height}</p>
      <p><strong>Origin:</strong> ${plant.origin}</p>
      <p><strong>Water Requirement:</strong> ${plant.water_requirement}</p>
      <p><strong>Seasonal Flowering:</strong> ${plant.seasonal_flowering}</p>
      <p><strong>Medicinal Value:</strong> ${plant.medicinal_value}</p>
      <p><strong>Quantitative Data:</strong> ${plant.quantitative_data}</p>
      <p><strong>Location:</strong> ${plant.location}</p>
      <img src="${plant.image_url}" width="200"/>
    `;
    container.appendChild(div);
  });
}

// Run when page loads
window.onload = loadPlants;
