// app.js

async function loadPlants() {
  // Fetch data from Supabase table (✅ use the correct table name: plants)
  let { data, error } = await supabase
    .from("plants")   // your Supabase table is named "plants"
    .select("*");     // fetch all columns including 'category'

  if (error) {
    console.error("Error fetching plants:", error.message);
    document.getElementById("plant-list").innerHTML = "❌ Failed to load plants.";
    return;
  }

  // Display the plant data on the page
  const container = document.getElementById("plant-list");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No plant records found in database.</p>";
    return;
  }

  data.forEach(plant => {
    const div = document.createElement("div");
    div.className = "plant-card"; // optional CSS styling
    div.innerHTML = `
      <h3>${plant.common_name || "Unknown"} (${plant.scientific_name || "-"})</h3>
      <p><strong>Category:</strong> ${plant.category || "-"}</p>
      <p><strong>Date of Planting:</strong> ${plant.date_of_planting || "-"}</p>
      <p><strong>Max Height:</strong> ${plant.max_height || "-"}</p>
      <p><strong>Origin:</strong> ${plant.origin || "-"}</p>
      <p><strong>Water Requirement:</strong> ${plant.water_requirement || "-"}</p>
      <p><strong>Seasonal Flowering:</strong> ${plant.seasonal_flowering || "-"}</p>
      <p><strong>Medicinal Value:</strong> ${plant.medicinal_value || "-"}</p>
      <p><strong>Quantitative Data:</strong> ${plant.quantitative_data || "-"}</p>
      <p><strong>Location:</strong> ${plant.location || "-"}</p>
      ${plant.image_url ? `<img src="${plant.image_url}" width="200"/>` : ""}
    `;
    container.appendChild(div);
  });
}

// Run when page loads
window.onload = loadPlants;
