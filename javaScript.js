document.addEventListener("DOMContentLoaded", function() {
  var listaSites = [];

  if (localStorage.getItem("listaSites")) {
    listaSites = JSON.parse(localStorage.getItem("listaSites"));
    exibirSitesNaLista();
  }

  document.getElementById("test-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var inputNomeSite = document.getElementById("site-name");
    var inputCasosTeste = document.getElementById("test-case");
    var inputResultadoTeste = document.getElementById("test-result");

    var nomeSite = inputNomeSite.value;
    var casosTeste = inputCasosTeste.value;
    var resultadoTeste = inputResultadoTeste.value;

    adicionarSiteNaLista(nomeSite, casosTeste, resultadoTeste);
    inputCasosTeste.value = "";
    inputResultadoTeste.value = "";

    localStorage.setItem("listaSites", JSON.stringify(listaSites));
  });

  document.getElementById("delete-button").addEventListener("click", function() {
    apagarTestes();
  });

  function adicionarSiteNaLista(nomeSite, casosTeste, resultadoTeste) {
    listaSites.push({
      nomeSite: nomeSite,
      casosTeste: casosTeste,
      resultadoTeste: resultadoTeste
    });

    exibirSitesNaLista();
  }

  function exibirSitesNaLista() {
    var elementoListaSites = document.getElementById("site-list");
    elementoListaSites.innerHTML = "";

    for (var i = 0; i < listaSites.length; i++) {
      var itemLista = document.createElement("li");
      itemLista.innerHTML =
        "<strong>Nome do Site:</strong> " +
        listaSites[i].nomeSite +
        "<br>" +
        "<strong>Casos de Teste:</strong> " +
        listaSites[i].casosTeste.replace(/\n/g, "<br>") +
        "<br>" +
        "<strong>Resultado do Teste:</strong> " +
        listaSites[i].resultadoTeste +
        "<br>";

      elementoListaSites.appendChild(itemLista);
    }
  }

  function apagarTestes() {
    listaSites = [];
    localStorage.removeItem("listaSites");
    exibirSitesNaLista();
  }
});
