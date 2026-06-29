const customForm = document.querySelector(".custom-form");

customForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productSelect = document.getElementById("productSelect");
  const logoFile = document.getElementById("logoFile");
const artworkFile = document.getElementById("artworkFile");
const referenceFile = document.getElementById("referenceFile");
  const formData = new FormData();

  formData.append(
    "name",
    customForm.querySelector('input[placeholder="Enter your full name"]').value
  );

  formData.append(
    "email",
    customForm.querySelector('input[placeholder="Enter your email"]').value
  );

  formData.append(
    "phone",
    customForm.querySelector('input[placeholder="Enter your phone number"]').value
  );

  formData.append(
    "productType",
    productSelect.options[productSelect.selectedIndex].text
  );

  formData.append(
    "quantity",
    customForm.querySelector('input[type="number"]').value
  );

  formData.append(
    "color",
    customForm.querySelectorAll("select")[1].value
  );

  formData.append(
    "notes",
    customForm.querySelector("textarea").value
  );

if (logoFile.files[0]) {
    formData.append("logoFile", logoFile.files[0]);
}

if (artworkFile.files[0]) {
    formData.append("artworkFile", artworkFile.files[0]);
}

if (referenceFile.files[0]) {
    formData.append("referenceFile", referenceFile.files[0]);
}

  try {
    const response = await fetch("http://localhost:5000/api/custom-orders", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Custom order submitted successfully with file upload!");
      customForm.reset();
    } else {
      alert("Failed to submit custom order.");
    }
  } catch (error) {
    alert("Server error.");
  }
});