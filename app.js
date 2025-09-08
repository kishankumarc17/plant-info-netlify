// app.js
async function loadPlants() {
  const container = document.getElementById("plant-list");
  container.innerHTML = "Loading plants...";

  try {
    const { data: plants, error } = await supabase
      .from("plants")
      .select("*");

    if (error) {
      container.innerHTML = "<p>❌ Error loading plants.</p>";
      console.error(error);
      return;
    }

    if (!plants || plants.length === 0) {
      container.innerHTML = "<p>No plants found.</p>";
      return;
    }

    container.innerHTML = ""; // Clear loading text

    plants.forEach(plant => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}">
        <h3>${plant.name}</h3>
        <p><strong>Scientific Name:</strong> ${plant.scientific_name}</p>
        <a href="plant.html?id=${plant.id}">View Details</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>❌ Error loading plants.</p>";
    console.error(err);
  }
}

loadPlants();
