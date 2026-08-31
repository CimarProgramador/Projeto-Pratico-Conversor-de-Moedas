const convertButton = document.querySelector(".btnConvert")
const currencySelect = document.querySelector(".currency-select")

function convertValues() {
    const inputCorrencyValue = document.querySelector(".input-corrency").value //Valor a converter
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //Valor em Real
    const currencyValueConverted = document.querySelector(".currency-value-converted") //Valor em Dolar

    const dolarToday = 5.2
    const euroToday = 6.2
    const libraToday = 7.04

    //formatar valores para a moeda new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(inputCorrencyValue)
    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCorrencyValue / dolarToday)
    }

    if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCorrencyValue / euroToday)
    }

    if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCorrencyValue / libraToday)
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCorrencyValue)
}

function changeCurrency() {
    const currencyName = document.querySelector("#currency-name")
    const currencyImg = document.querySelector(".currency-img")
    
    if (currencySelect.value == "dolar") {
        currencyName.innerHTML='Dolar Americano'
        currencyImg.src = "./assets/Dolar.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML='Euro'
        currencyImg.src = "./assets/Euro.png"
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML='Libra'
        currencyImg.src = "./assets/Libra.png"
    }
    convertValues()
}


currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
