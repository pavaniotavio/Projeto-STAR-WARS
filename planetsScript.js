let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async(character) => {
            const card = document.createElement("div")
            let urlImage = `https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg`;
            const response = await fetch(urlImage)
                if (response.status == '404'){
                    urlImage = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                }
            card.style.backgroundImage = `url('${urlImage}')`;
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('${urlImage}')`;
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const diameter = document.createElement("span")
                diameter.className = "character-details"
                diameter.innerText = `Tamanho: ${convertDiameter(character.diameter)}`

                const climate = document.createElement("span")
                climate.className = "character-details"
                climate.innerText = `Clima: ${convertClimate(character.climate)}`

                const population = document.createElement("span")
                population.className = "character-details"
                population.innerText = `População: ${convertPopulation(character.population)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(diameter)
                modalContent.appendChild(climate)
                modalContent.appendChild(population)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar os planetas')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertPopulation(population) {
    if (population === "unknown") {
        return "desconhecido"
    }

    return population;
}

function convertDiameter(diameter) {
    if (diameter === "unknown") {
        return "desconhecido"
    }

    return `${diameter} km`
}

function convertClimate(climate) {
    const climas = {
        arid: "árido",
        temperate: "temperado",
        tropical: "tropical",
        frozen: "congelado",
        murky: "obscuro",
        windy: "ventoso",
        hot: "quente",
        frigid: "gelado",
        humid: "úmido",
        moist: "úmido",
    }

    return climas[climate.toLowerCase()] || climate;
}