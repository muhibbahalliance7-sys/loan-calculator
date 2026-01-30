function calculateAge(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  return new Date(diff).getUTCFullYear() - 1970;
}

function calculate() {
  const dob = document.getElementById("dob").value;
  const basic = Number(document.getElementById("basic").value);
  const allowance = Number(document.getElementById("allowance").value);
  const commitment = Number(document.getElementById("commitment").value);
  const inTransit = Number(document.getElementById("inTransit").value);
  const preferredTenure = Number(document.getElementById("tenure").value);

  const age = calculateAge(dob);
  const income = basic + allowance;

  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

  const data = {
    age,
    income,
    commitment,
    inTransit,
    preferredTenure
  };

  products.forEach(product => {
    const result = product.calculate(data);

    let row = "";

    if (result.status !== "Eligible") {
      row = `
        <tr>
          <td>${product.name}</td>
          <td>❌ Not Eligible</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>${(product.dsr * 100).toFixed(0)}%</td>
          <td>${result.reason}</td>
        </tr>
      `;
    } else {
      row = `
        <tr>
          <td>${product.name}</td>
          <td>✅ Eligible</td>
          <td>${result.tenure}</td>
          <td>${result.loan.toFixed(2)}</td>
          <td>${result.monthly.toFixed(2)}</td>
          <td>${(product.dsr * 100).toFixed(0)}%</td>
          <td></td>
        </tr>
      `;
    }

    tbody.innerHTML += row;
  });
}
