const products = [
  {
    name: "COSHARE 6.65%",
    dsr: 0.60,
    maxTenure: 15,
    retirementAge: 60,
    rate: 0.0665,

    calculate(data) {
      const {
        age,
        income,
        commitment,
        inTransit,
        preferredTenure
      } = data;

      // 1️⃣ Max deduction by DSR
      const maxDeduction = income * this.dsr;

      // 2️⃣ Available monthly amount
      const available =
        maxDeduction - commitment - inTransit;

      if (available <= 0) {
        return { status: "Not Eligible", reason:
