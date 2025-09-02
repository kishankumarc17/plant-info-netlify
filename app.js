// Shared helpers
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function yearsSince(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

async function loadAllPlants() {
  const grid = document.getElementById("plant-grid");
  if (!grid) return; // We're on plant page

  const { data, error } = await supabase
    .from("plants")
    .select("id, common_name, scientific_name, image_url, date_of_planting")
    .order("common_name", { ascending: true });

  if (error) {
    grid.innerHTML = `<p style="color:#b91c1c">Error loading plants: ${error.message}</p>`;
    return;
  }

  function render(items) {
    grid.innerHTML = items.map(p => `
      <a href="plant.html?id=${encodeURIComponent(p.id)}" class="card">
        <img src="${p.image_url || "https://picsum.photos/640/360?blur=2"}" alt="${p.common_name}"/>
        <div class="body">
          <h3 class="title">${p.common_name}</h3>
          <p class="sub"><i>${p.scientific_name || ""}</i></p>
          ${p.date_of_planting ? `<span class="tag">Age: ${yearsSince(p.date_of_planting)} yrs</span>` : ""}
        </div>
      </a>
    `).join("");
  }

  render(data || []);

  const search = document.getElementById("search");
  search?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = (data || []).filter(p =>
      (p.common_name || "").toLowerCase().includes(q) ||
      (p.scientific_name || "").toLowerCase().includes(q)
    );
    render(filtered);
  });
}

async function loadPlantById() {
  const card = document.getElementById("plant-card");
  if (!card) return; // We're on index page
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) {
    card.innerHTML = "<p>Missing plant id.</p>";
    return;
  }

  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    card.innerHTML = `<p style="color:#b91c1c">Plant not found.</p>`;
    return;
  }

  const age = data.date_of_planting ? `${yearsSince(data.date_of_planting)} years` : "—";

  card.innerHTML = `
    <div class="card">
      <img src="${data.image_url || "https://picsum.photos/800/400?blur=2"}" alt="${data.common_name}"/>
      <div class="body">
        <h2 class="title">${data.common_name} <span style="font-weight:400">(<i>${data.scientific_name || ""}</i>)</span></h2>
        <div class="details">
          ${renderDetail("Origin", data.origin)}
          ${renderDetail("Maximum Height", data.max_height)}
          ${renderDetail("Age", age)}
          ${renderDetail("Water Requirement", data.water_requirement)}
          ${renderDetail("Seasonal Flowering", data.seasonal_flowering)}
          ${renderDetail("Medicinal Value", data.medicinal_value)}
          ${renderDetail("Quantitative Data", data.quantitative_data)}
          ${renderDetail("Location", data.location)}
        </div>
      </div>
    </div>
  `;
}

function renderDetail(label, value) {
  if (!value) return "";
  return `<div class="detail"><b>${label}</b><div>${value}</div></div>`;
}

// boot
document.addEventListener("DOMContentLoaded", () => {
  loadAllPlants();
  loadPlantById();
});
