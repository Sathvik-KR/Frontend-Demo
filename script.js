console.log("script.js loaded");

// ===== LOAD DATA (only if button exists) =====
const loadBtn = document.getElementById("loadDataBtn");
const container = document.getElementById("dataContainer");

if (loadBtn && container) {
  loadBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("https://backend-demo-c09t.onrender.com/api/all");
      const data = await res.json();

      if (!Array.isArray(data)) {
        container.innerHTML = "<p>Error loading data.</p>";
        return;
      }

      let table = `
        <table border="1" cellpadding="10" style="width:100%; border-collapse:collapse;">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Birthday</th>
            <th>Phone</th>
            <th>10 Digit</th>
          </tr>
      `;

      data.forEach((item) => {
        table += `
          <tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.birthday}</td>
            <td>${item.phone}</td>
            <td>${item.tenDigit}</td>
          </tr>
        `;
      });

      table += "</table>";
      container.innerHTML = table;
    } catch (err) {
      console.error(err);
      container.innerHTML = "<p>Error fetching data.</p>";
    }
  });
}

// ===== FORM SUBMIT (only if form exists) =====
const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submit intercepted");

    const payload = {
      name: document.getElementById("name").value.trim(),
      age: document.getElementById("age").value.trim(),
      birthday: document.getElementById("birthday").value,
      phone: document.getElementById("phone").value.trim(),
      tenDigit: document.getElementById("tenDigit").value.trim(),
    };

    try {
      const response = await fetch(
        "https://backend-demo-c09t.onrender.com/api/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();
      alert(data.message);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit data");
    }
  });
}
