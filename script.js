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
        <td>${data}</td>
        <td>${
          dados.refeicao1.carb + dados.refeicao2.carb + dados.refeicao3.carb
        }</td>
        <td>${
          dados.refeicao1.prot + dados.refeicao2.prot + dados.refeicao3.prot
        }</td>
        <td>${
          dados.refeicao1.fat + dados.refeicao2.fat + dados.refeicao3.fat
        }</td>
        <td>${
          dados.refeicao1.cal + dados.refeicao2.cal + dados.refeicao3.cal
        }</td>
        <td><button onclick="excluirLinha('${data}')">Excluir</button></td>
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
