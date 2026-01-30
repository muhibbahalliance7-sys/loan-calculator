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

  products.forEach(p => {
    let notes = "";
    let status = "✅ Eligible";

    const maxInstallment =
      income * p.dsr - commitment - inTransit;

    if (maxInstallment <= 0) {
      status = "❌ Not Eligible";
      notes = "Insufficient income";
    }

    const maxTenureByAge = p.retirementAge - age;
    let tenure =
      preferredTenure ||
      Math.min(p.maxTenure, maxTenureByAge);

    if (tenure < p.minTenure || tenure > p.maxTenure || maxTenureByAge <= 0) {
      status = "❌ Not Eligible";
      notes = "Age / tenure not allowed";
    }

    let maxLoan = "-";
    let installment = "-";

    if (status === "✅ Eligible") {
      installment = maxInstallment.toFixed(2);
      maxLoan = (installment * tenure * 12).toFixed(2);
    }

    const row = `
      <tr>
        <td>${p.name}</td>
        <td>${status}</td>
        <td>${status === "✅ Eligible" ? tenure : "-"}</td>
        <td>${maxLoan}</td>
        <td>${installment}</td>
        <td>${(p.dsr * 100).toFixed(0)}%</td>
        <td>${notes}</td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}
