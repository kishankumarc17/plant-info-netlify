// plant.js - for single plant details in tabular format

async function loadPlantDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const plantId = urlParams.get("id");

  if (!plantId) {
    document.getElementById("plant-card").innerHTML = "<p>❌ No plant selected.</p>";
    return;
  }

  // Fetch single plant by id
  let { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", plantId)
    .single();

  if (error) {
    console.error("Error fetching plant:", error.message);
    document.getElementById("plant-card").innerHTML = "❌ Failed to load plant.";
    return;
  }

  // Show plant info in a table
  const plant = data;
  document.getElementById("plant-card").innerHTML = `
    <h2>${plant.common_name || "Unknown"} (${plant.scientific_name || "-"})</h2>
    ${plant.image_url ? `<img src="${plant.image_url}" alt="${plant.common_name}" width="300"/>` : ""}
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
    </table>
  `;
}

// Run on page load
window.onload = loadPlantDetails;
