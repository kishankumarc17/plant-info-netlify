// app.js (tabular format for each plant)

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
      <table class="plant-table">
        <tr><th>Category</th><td>${plant.category || "-"}</td></tr>
        <tr><th>Date of Planting</th><td>${plant.date_of_planting || "-"}</td></tr>
        <tr><th>Max Height</th><td>${plant.max_height || "-"}</td></tr>
        <tr><th>Origin</th><td>${plant.origin || "-"}</td></tr>
        <tr><th>Water Requirement</th><td>${plant.water_requirement || "-"}</td></tr>
        <tr><th>Seasonal Flowering</th><td>${plant.seasonal_flowering || "-"}</td></tr>
        <tr><th>Medicinal Value</th><td>${plant.medicinal_value || "-"}</td></tr>
        <tr><th>Quantitative Data</th><td>${plant.quantitative_data || "-"}</td></tr>
        <tr><th>Location</th><td>${plant.location || "-"}</td></tr>
        <tr>
          <th>Image</th>
          <td>${plant.image_url ? `<img src="${plant.image_url}" width="200"/>` : "-"}</td>
        </tr>
      </table>
    `;
    container.appendChild(div);
  });
}

// Run when page loads
window.onload = loadPlants;
