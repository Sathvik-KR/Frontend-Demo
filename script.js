// Load All Data
const loadBtn = document.getElementById("loadDataBtn");
const container = document.getElementById("dataContainer");

loadBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://backend-demo-c09t.onrender.com/api/all");
    const data = await res.json();
    console.log("Data : "+data)
    if (!Array.isArray(data)) {
      container.innerHTML = "<p>Error loading data.</p>";
      return;
    }

    // Build table
    let table = `
      <table border="1" cellpadding="10" 
      style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr style="background:#f0f0f0;">
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

// Select the form
const form = document.getElementById("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop form reload

  // Collect input values
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const birthday = document.getElementById("birthday").value;
  const phone = document.getElementById("phone").value.trim();
  const tenDigit = document.getElementById("tenDigit").value.trim();

  // Validate empty fields
  if (!name || !age || !birthday || !phone || !tenDigit) {
    alert("Please fill all fields.");
    return;
  }

  // Validate 10-digit phone number
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  // Validate 10-digit number
  if (!/^[0-9]{10}$/.test(tenDigit)) {
    alert("The 10-digit number field must contain exactly 10 digits.");
    return;
  }

  // Prepare payload
  const payload = { name, age, birthday, phone, tenDigit };

  // Send to backend
  try {
    const response = await fetch(
      "https://backend-demo-c09t.onrender.com/api/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert("Error connecting to server.");
    console.error(error);
  }
});
