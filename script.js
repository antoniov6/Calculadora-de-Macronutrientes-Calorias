function calcular() {
  let carb1 = parseFloat(document.getElementById("carb1").value) || 0;
  let prot1 = parseFloat(document.getElementById("prot1").value) || 0;
  let fat1 = parseFloat(document.getElementById("fat1").value) || 0;
  let cal1 = parseFloat(document.getElementById("cal1").value) || 0;

  let carb2 = parseFloat(document.getElementById("carb2").value) || 0;
  let prot2 = parseFloat(document.getElementById("prot2").value) || 0;
  let fat2 = parseFloat(document.getElementById("fat2").value) || 0;
  let cal2 = parseFloat(document.getElementById("cal2").value) || 0;

  let carb3 = parseFloat(document.getElementById("carb3").value) || 0;
  let prot3 = parseFloat(document.getElementById("prot3").value) || 0;
  let fat3 = parseFloat(document.getElementById("fat3").value) || 0;
  let cal3 = parseFloat(document.getElementById("cal3").value) || 0;

  let totalCarb = carb1 + carb2 + carb3;
  let totalProt = prot1 + prot2 + prot3;
  let totalFat = fat1 + fat2 + fat3;
  let totalCal = cal1 + cal2 + cal3;

  document.getElementById("totalCarb").textContent = totalCarb.toFixed(2);
  document.getElementById("totalProt").textContent = totalProt.toFixed(2);
  document.getElementById("totalFat").textContent = totalFat.toFixed(2);
  document.getElementById("totalCal").textContent = totalCal.toFixed(2);

  let data = new Date().toISOString().split("T")[0];
  let dadosRefeicoes = {
    refeicao1: { carb: carb1, prot: prot1, fat: fat1, cal: cal1 },
    refeicao2: { carb: carb2, prot: prot2, fat: fat2, cal: cal2 },
    refeicao3: { carb: carb3, prot: prot3, fat: fat3, cal: cal3 },
  };
  let dadosExistentes = JSON.parse(localStorage.getItem("dados")) || {};
  dadosExistentes[data] = dadosRefeicoes;

  localStorage.setItem("dados", JSON.stringify(dadosExistentes));

  document.getElementById("carb1").value = "";
  document.getElementById("prot1").value = "";
  document.getElementById("fat1").value = "";
  document.getElementById("cal1").value = "";

  document.getElementById("carb2").value = "";
  document.getElementById("prot2").value = "";
  document.getElementById("fat2").value = "";
  document.getElementById("cal2").value = "";

  document.getElementById("carb3").value = "";
  document.getElementById("prot3").value = "";
  document.getElementById("fat3").value = "";
  document.getElementById("cal3").value = "";

  exibirDadosSalvos();
}

function exibirDadosSalvos() {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  let dadosExistentes = JSON.parse(localStorage.getItem("dados")) || {};

  for (let data in dadosExistentes) {
    let dados = dadosExistentes[data];

    let row = document.createElement("tr");

    row.innerHTML = `
  <td id="dados-salvos">${formatarData(data)}</td>
  <td id="dados-salvos">${
    (dados.refeicao1 ? dados.refeicao1.carb : 0) +
    (dados.refeicao2 ? dados.refeicao2.carb : 0) +
    (dados.refeicao3 ? dados.refeicao3.carb : 0)
  }</td>
  <td id="dados-salvos">${
    (dados.refeicao1 ? dados.refeicao1.prot : 0) +
    (dados.refeicao2 ? dados.refeicao2.prot : 0) +
    (dados.refeicao3 ? dados.refeicao3.prot : 0)
  }</td>
  <td id="dados-salvos">${
    (dados.refeicao1 ? dados.refeicao1.fat : 0) +
    (dados.refeicao2 ? dados.refeicao2.fat : 0) +
    (dados.refeicao3 ? dados.refeicao3.fat : 0)
  }</td>
  <td id="dados-salvos">${
    (dados.refeicao1 ? dados.refeicao1.cal : 0) +
    (dados.refeicao2 ? dados.refeicao2.cal : 0) +
    (dados.refeicao3 ? dados.refeicao3.cal : 0)
  }</td>
  <td><button onclick="excluirLinha('${data}')">Excluir</button></td>
  <td><button onclick="editarRefeicao('${data}')">Editar</button><td>
`;

    tableBody.appendChild(row);
  }
}

function excluirLinha(data) {
  let dadosExistentes = JSON.parse(localStorage.getItem("dados")) || {};
  delete dadosExistentes[data];

  localStorage.setItem("dados", JSON.stringify(dadosExistentes));

  exibirDadosSalvos();
}

exibirDadosSalvos();

function editarRefeicao(data) {
  let dadosExistentes = JSON.parse(localStorage.getItem("dados")) || {};
  let dadosRefeicao = dadosExistentes[data];

  document.getElementById("carb1").value = dadosRefeicao.refeicao1.carb;
  document.getElementById("prot1").value = dadosRefeicao.refeicao1.prot;
  document.getElementById("fat1").value = dadosRefeicao.refeicao1.fat;
  document.getElementById("cal1").value = dadosRefeicao.refeicao1.cal;

  document.getElementById("carb2").value = dadosRefeicao.refeicao2.carb;
  document.getElementById("prot2").value = dadosRefeicao.refeicao2.prot;
  document.getElementById("fat2").value = dadosRefeicao.refeicao2.fat;
  document.getElementById("cal2").value = dadosRefeicao.refeicao2.cal;

  document.getElementById("carb3").value = dadosRefeicao.refeicao3.carb;
  document.getElementById("prot3").value = dadosRefeicao.refeicao3.prot;
  document.getElementById("fat3").value = dadosRefeicao.refeicao3.fat;
  document.getElementById("cal3").value = dadosRefeicao.refeicao3.cal;
}

function salvarAlteracoes() {
  let data = new Date().toISOString().split("T")[0];
  let dadosRefeicoes = {
    refeicao1: { carb: carb1, prot: prot1, fat: fat1, cal: cal1 },
    refeicao2: { carb: carb2, prot: prot2, fat: fat2, cal: cal2 },
    refeicao3: { carb: carb3, prot: prot3, fat: fat3, cal: cal3 },
  };

  let dadosExistentes = JSON.parse(localStorage.getItem("dados")) || {};
  dadosExistentes = { ...dadosExistentes, ...dadosRefeicoes };

  localStorage.setItem("dados", JSON.stringify(dadosExistentes));

  exibirDadosSalvos();
}

function formatarData(data) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(data).toLocaleDateString(undefined, options);
}
