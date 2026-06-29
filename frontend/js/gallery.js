const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryItems = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedCategory = button.textContent.trim().toLowerCase();

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach(item => {
      const itemCategory = item.dataset.category.toLowerCase();

      if (selectedCategory === "all" || itemCategory === selectedCategory) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});