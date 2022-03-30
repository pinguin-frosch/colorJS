const defaultColors = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#80ff00",
  "#00ff00",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
  "#ff0080",
]

const colorsDiv = document.getElementById("colorsDiv")
const resetColorsButton = document.getElementById("resetColors")
resetColorsButton.addEventListener("click", resetColors)

// Reinicia los colores a los por defecto
function resetColors() {
  chrome.storage.sync.set({ defaultColors })
  for (let [index, color] of defaultColors.entries()) {
    let colorButtons = colorsDiv.querySelectorAll("button")
    colorButtons[index].style.backgroundColor = color
  }
}

// Verifica que el valor sea un color válido en hex
function verifyHexColor(color) {
  let pattern = /#[0-9a-f]{6}/
  return color.match(pattern)
}

// Permite modificar un color al pulsar el botón respectivo
function editColorListener(event) {
  const modal = document.getElementById("modal")
  const form = document.getElementById("modalForm")
  const button = event.target.dataset
  modal.showModal()
  chrome.storage.sync.get("defaultColors", ({ defaultColors }) => {
    form["color"].value = defaultColors[button.key]
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      newColor = event.target["color"].value.toLowerCase()
      if (newColor.length === 7 && verifyHexColor(newColor) && defaultColors[button.key] !== form["color"].value) {
        let newDefaultColors = defaultColors
        newDefaultColors[button.key] = form["color"].value
        chrome.storage.sync.set({defaultColors: newDefaultColors})
        let colorButtons = colorsDiv.querySelectorAll("button")
        colorButtons[button.key].style.backgroundColor = form["color"].value
        modal.close()
      } else {
        form["color"].value = defaultColors[button.key]
      }
    })
  })
}

// Añadir los índices a cada botón y los event listener necesarios
const editButtons = document.getElementById("editColorsDiv").querySelectorAll("button")
for (const [index, button] of editButtons.entries()) {
  button.dataset.key = index
  button.addEventListener("click", editColorListener)
}

// Cambia el color seleccionado al pulsar otro botón
function changeSelectedColor(event) {
  chrome.storage.sync.get("color", ({ color }) => {
    const savedColor = color
    const clickedColor = Number(event.target.dataset.key)
    if (clickedColor !== savedColor) {
      chrome.storage.sync.set({ color: clickedColor })
    }
  })
}

// Añade un botón por cada color en la página
function constructOptions(buttonColors) {
  for (let [index, buttonColor] of buttonColors.entries()) {
    let button = document.createElement("button")
    button.dataset.key = index
    button.style.backgroundColor = buttonColor
    button.addEventListener("click", changeSelectedColor)
    colorsDiv.appendChild(button)
  }
}

// Arranca el programa como tal
chrome.storage.sync.get("defaultColors", ({ defaultColors }) => {
  constructOptions(defaultColors)
})
