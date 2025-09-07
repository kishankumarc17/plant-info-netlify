// app.js (homepage with clean grid layout)

async function loadPlants() {
  let { data, error } = await supabase
    .from("plants")
    .select("*");

  if (error) {
    console.error("Error fetching plants:", error.message);
    document.getElementById("plant-list").innerHTML = "❌ Failed to load plants.";
    return;
  }

  const container = document.getElementById("plant-list");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No plant records found in database.</p>";
    return;
  }

  // ✅ Grid wrapper
  const grid = document.createElement("div");
  grid.className = "grid";

  data.forEach(plant => {
    const commonName = plant.common_name || "Unknown";
    const scientificName = plant.scientific_name || "";

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <a href="plant.html?id=${plant.id}">
        <div class="body">
          <h3 class="title">${commonName}</h3>
          <p class="sub"><em>${scientificName}</em></p>
        </div>
      </a>
    `;

    grid.appendChild(div);
  });

  container.appendChild(grid);
}

// Run on page load
window.onload = loadPlants;
