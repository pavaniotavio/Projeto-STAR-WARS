let currentPageUrl = 'https://swapi.dev/api/species/'

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
            let urlImage = `https://starwars-visualguide.com/assets/img/species/${character.url.replace(/\D/g, "")}.jpg`;
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

                const classification = document.createElement("span")
                classification.className = "character-details"
                classification.innerText = `Classificação: ${convertClassification(character.classification)}`

                const designation = document.createElement("span")
                designation.className = "character-details"
                designation.innerText = `Designação: ${convertDesignation(character.designation)}`

                const average_lifespan = document.createElement("span")
                average_lifespan.className = "character-details"
                average_lifespan.innerText = `Média de Vida: ${convertLifespan(character.average_lifespan)}`
            
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(designation)
                modalContent.appendChild(average_lifespan)
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
        alert('Erro ao carregar os personagens')
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

function convertClassification(classification) {
    const classificacao = {
        mammal: "mamífero",
        artificial: "artificial",
        sentient: "autoconsciente",
        gastropod: "gastrópode",
        reptile: "réptil",
        amphibian: "anfíbio",
    }

    return classificacao[classification.toLowerCase()] || classification;
}

function convertDesignation(designation) {
    const designacao = {
        sentient: "autoconsciente",
        reptilian: "reptiliano",
    }

    return designacao[designation.toLowerCase()] || designation;
}

function convertLifespan(average_lifespan) {
    if (average_lifespan === "unknown") {
        return "desconhecido"
    } 
    
    if (average_lifespan === "indefinite") {
        return "indefinido"
    }

    return `${average_lifespan} anos`
}