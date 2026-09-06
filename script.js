const convertButton = document.querySelector(".btnConvert");
const currencySelectToConvert = document.querySelector(".currency-select-to-convert");
const currencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-corrency");
console.log(currencySelectToConvert.value, currencySelect.value, inputCurrency.value);

let rates = {}; // objeto que vai receber as taxas

// Função para atualizar as taxas de câmbio
async function atualizarRates(base = "USD") {
    try {
        const resposta = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        //const resposta = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
        //const resposta = await fetch(`https://api.exchangerate.host/latest?base=${base}`);
        
        const dados = await resposta.json();

        // Guarda as taxas no objeto rates
        rates = dados.rates;

        console.log("Resposta completa da API:", dados);
        console.log("Taxas atualizadas:", rates);
    } catch (erro) {
        console.error("Erro ao buscar taxas:", erro);
    }
}

// Função de conversão
function convertValues() {
    if (currencySelectToConvert.value === currencySelect.value) {
        alert("Você escolheu o mesmo tipo de moeda para conversão. Por favor escolha tipos diferentes.");
        return;
    }

    const inputCorrencyValue = parseFloat(inputCurrency.value);
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value-converted");

    if (isNaN(inputCorrencyValue)) {
        alert("Digite um valor válido!");
        return;
    }

    const origem = currencySelectToConvert.value;
    const destino = currencySelect.value;

    const taxaOrigem = rates[origem];
    const taxaDestino = rates[destino];

    if (!taxaOrigem || !taxaDestino) {
        alert("Não foi possível obter os valores das taxas das moedas para conversão. Por favor verifique sua cenexão.");
        return;
    }

    // Fórmula: valor * (taxaDestino / taxaOrigem)
    const convertido = inputCorrencyValue * (taxaDestino / taxaOrigem);

    // Exibe valores formatados
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: destino.toUpperCase()
    }).format(convertido);

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: origem.toUpperCase()
    }).format(inputCorrencyValue);
}

// Atualiza nomes e imagens das moedas
function changeCurrency() {
    atualizarRates();
    const currencyNameConvert = document.querySelector("#currency-name-convert");
    const currencyName = document.querySelector("#currency-name-converted");
    const currencyLogoConvert = document.querySelector(".currency-logo-convert");
    const currencyLogoConverted = document.querySelector(".currency-logo-converted");

    if (currencySelectToConvert.value === "USD") {
        currencyNameConvert.innerHTML = 'Dólar Americano';
        currencyLogoConvert.src = "./assets/Dolar.png";
    }
    if (currencySelectToConvert.value === "EUR") {
        currencyNameConvert.innerHTML = 'Euro';
        currencyLogoConvert.src = "./assets/Euro.png";
    }
    if (currencySelectToConvert.value === "GBP") {
        currencyNameConvert.innerHTML = 'Libra';
        currencyLogoConvert.src = "./assets/Libra.png";
    }
    if (currencySelectToConvert.value === "BRL") {
        currencyNameConvert.innerHTML = 'Real';
        currencyLogoConvert.src = "./assets/Real.png";
    }

    if (currencySelect.value === "USD") {
        currencyName.innerHTML = 'Dólar Americano';
        currencyLogoConverted.src = "./assets/Dolar.png";
    }
    if (currencySelect.value === "EUR") {
        currencyName.innerHTML = 'Euro';
        currencyLogoConverted.src = "./assets/Euro.png";
    }
    if (currencySelect.value === "GBP") {
        currencyName.innerHTML = 'Libra';
        currencyLogoConverted.src = "./assets/Libra.png";
    }
    if (currencySelect.value === "BRL") {
        currencyName.innerHTML = 'Real';
        currencyLogoConverted.src = "./assets/Real.png";
    }

    convertValues();
}

// Eventos
currencySelectToConvert.addEventListener("change", changeCurrency);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
inputCurrency.addEventListener("input", convertValues);

// Atualiza taxas ao carregar a página
atualizarRates();
setInterval(atualizarRates, 60000); // atualiza a cada 1 minuto
