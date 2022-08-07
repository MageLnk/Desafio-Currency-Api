let allData = undefined;
let moneyValue = 0;

const callApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    document.querySelector("#total-on-clp").innerHTML =
      "Ha ocurrido un probleam con el servidor. Por favor presione F5";
    return;
  }
};

const selectedCurrency = (option) => {
  moneyValue = 0;
  document.querySelector("#total-on-clp").innerHTML = "";
  if (option === "Euro" || option == "Bitcoin") {
    const filterValue = Object.values(allData).filter((e) => {
      return e.nombre === option;
    });
    moneyValue = filterValue[0].valor;
    return;
  }
};

const makeOperation = (value) => {
  return value / moneyValue;
};

const resultsOnCLP = () => {
  if (moneyValue === 0) {
    alert("Debe seleccionar una moneda");
    return;
  }
  const valueOnInput = document.querySelector("#clp-value").value;
  if (isNaN(valueOnInput)) {
    alert("Debe ingresar solo números por favor");
    return;
  }
  document.querySelector("#total-on-clp").innerHTML = `$ ${makeOperation(valueOnInput)}`;
};

window.addEventListener("DOMContentLoaded", async () => {
  allData = await callApi("https://mindicador.cl/api/");
});

window.addEventListener("change", () => {
  const selectedValue = document.querySelector("#input-currency").value;
  selectedCurrency(selectedValue);
});
