const apiIp = "https://mindicador.cl/api/";
let allData = undefined;
let specificData = undefined;
let moneyValue = 0;
let myChart = "";

const callApi = async (url, tipo) => {
  try {
    const res = await fetch(`${url}${!tipo ? "" : tipo.toLowerCase()}`);
    const data = await res.json();
    return data;
  } catch (e) {
    document.querySelector("#total-on-clp").innerHTML =
      "Ha ocurrido un problema con el servidor. Por favor presione F5";
    return;
  }
};

const handleGraphic = (dataGraphic, selectedCurrency) => {
  if (!dataGraphic.serie) {
    return;
  }
  let graphicData = dataGraphic.serie.filter((elements, i) => {
    if (i < 10) {
      return elements;
    }
  });

  const labels = graphicData.map((e) => e.fecha.substring(0, 10)).reverse();
  const data = {
    labels: labels,
    datasets: [
      {
        label: selectedCurrency,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: graphicData.map((e) => e.valor),
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };
  myChart = new Chart(document.getElementById("myChart"), config);
};

const selectedCurrency = (option) => {
  moneyValue = 0;
  document.querySelector("#total-on-clp").innerHTML = "";
  if (option === "Euro" || option == "Bitcoin") {
    const filterValue = Object.values(allData).filter((e) => {
      return e.nombre === option;
    });
    moneyValue = filterValue[0].valor;
  }
};

const makeOperation = (value) => {
  return value / moneyValue;
};

const resultsOnCLP = async () => {
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

  specificData = await callApi(apiIp, document.querySelector("#input-currency").value);
  handleGraphic(specificData, document.querySelector("#input-currency").value);
};

window.addEventListener("DOMContentLoaded", async () => {
  allData = await callApi(apiIp);
});

window.addEventListener("change", () => {
  if (!isNaN(myChart.id)) {
    myChart.destroy();
  }
  const selectedValue = document.querySelector("#input-currency").value;
  selectedCurrency(selectedValue);
});

const algo = () => {
  console.log(`Esto es un test`)
}