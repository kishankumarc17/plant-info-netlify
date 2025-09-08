// plant.js - load plant details dynamically by ID

// ✅ Initialize Supabase (use config.js or replace with real keys)
const supabaseUrl = "https://YOUR_REAL_SUPABASE_URL.supabase.co"; // replace
const supabaseKey = "YOUR_REAL_ANON_KEY"; // replace
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadPlantDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const plantId = urlParams.get("id");

  const container = document.getElementById("plant-card");
  if (!plantId) {
    container.innerHTML = "<p>❌ No plant selected.</p>";
    return;
  }

  try {
    // Fetch single plant by ID
    const { data: plant, error } = await supabase
      .from("plants")
      .select("*")
      .eq("id", plantId)
      .single();

    if (error || !plant) {
      console.error("Error fetching plant:", error?.message);
      container.innerHTML = "❌ Failed to load plant details.";
      return;
    }

    console.log("Fetched plant:", plant); // 🔍 DEBUG

    // ✅ Multiple images with Lightbox
    let imagesHTML = "-";
    if (plant.image_urls) {
      const urls = plant.image_urls.split(",").map((url) => url.trim());
      imagesHTML = urls
        .map(
          (url) => `
            <a href="${url}" data-lightbox="${plant.common_name}" data-title="${plant.common_name}">
              <img src="${url}" class="table-image" alt="${plant.common_name}" 
                   style="width:100px; cursor:pointer; margin-right:5px;" />
            </a>`
        )
        .join("");
    }

    // ✅ Make links in Additional Info clickable
    let additionalInfoHTML = plant.additional_info
      ? plant.additional_info.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" class="plant-link">$1</a>'
        )
      : "-";

    // ✅ Inject plant details into the table
    container.innerHTML = `
      <h2>${plant.common_name || "Unknown"} 
          (${plant.scientific_name || "-"})</h2>
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
        <tr><th>Additional Info</th><td>${additionalInfoHTML}</td></tr>
        <tr><th>Images</th><td>${imagesHTML}</td></tr>
      </table>
    `;
  } catch (err) {
    console.error("Unexpected error:", err);
    container.innerHTML =
      "❌ Something went wrong while loading plant.";
  }
}

// Run on page load
window.onload = loadPlantDetails;
