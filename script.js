const amountInput = document.getElementById("amountInput");
const valueSelect = document.getElementById("valueSelect");
const convertButton = document.getElementById("convertButton");
const result = document.getElementById("result");

convertButton.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const currency = valueSelect.value;

  if (amount <= 0 || amount < 0.01) {
    result.textContent = "Invalid amount. Minimum amount is 0.01";
    return;
  }

  if (amount !== "" && currency !== "") {
    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates?.[0]?.mid;

        if (rate) {
          const convertedAmount = amount * rate;
          result.textContent = convertedAmount.toFixed(2) + " PLN";
        } else {
          result.textContent =
            "Error occurred. Unable to retrieve exchange rate data";
        }
      })
      .catch((error) => {
        console.error(error);
        result.textContent = "Error occurred downloading data";
      });
  }
});
