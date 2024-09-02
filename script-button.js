const buttonMenu = document.getElementById('button-menu')

buttonMenu.onclick = () => {

    const modal = document.getElementById('modal')
    modal.style.visibility = 'visible'

    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = ''

    const menuCharacter = document.createElement('span')
    menuCharacter.innerHTML = `<a href="${'index.html'}" class='menu-list'>Personagens</a>`

    const menuPlanets = document.createElement('span')
    menuPlanets.innerHTML = `<a href="${'planets.html'}" class='menu-list'>Planetas</a>`

    const menuShips = document.createElement('span')
    menuShips.innerHTML = `<a href="${'ships.html'}" class='menu-list'>Espaçonaves</a>`

    const menuSpecies = document.createElement('span')
    menuSpecies.innerHTML = `<a href="${'species.html'}" class='menu-list'>Espécies</a>`

    const menuVehicles = document.createElement('span')
    menuVehicles.innerHTML = `<a href="${'vehicles.html'}" class='menu-list'>Veículos</a>`

    const socialMedia = document.createElement('span')
    socialMedia.className = "social-media-menu"
    socialMedia.innerHTML = `
        <a href="" target="_blank">
            <i class="fa-brands fa-instagram"></i>
        </a>

        <a href="" target="_blank">
            <i class="fa-brands fa-github"></i>
        </a>

        <a href="" target="_blank">
            <i class="fa-brands fa-linkedin-in"></i>
        </a>
    `

    modalContent.appendChild(menuCharacter)
    modalContent.appendChild(menuPlanets)
    modalContent.appendChild(menuShips)
    modalContent.appendChild(menuSpecies)
    modalContent.appendChild(menuVehicles)
    modalContent.appendChild(socialMedia)
}