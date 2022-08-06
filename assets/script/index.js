let allData = undefined;

const callApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    alert("Ha ocurrido un probleam con el servidor");
    return;
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  allData = await callApi("https://mindicador.cl/api/");
});
