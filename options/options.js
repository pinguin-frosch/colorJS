let page = document.getElementById("buttonDiv")

// let form = document.getElementById("colorForm")
// form.addEventListener("submit", (event) => {
//   event.preventDefault()
//   newColor = event.target["color"].value
//   if (newColor !== "" && newColor.length === 7) {
//     newColor = newColor.toLowerCase()
//     if (verifyHexColor(newColor)) {
//       constructOptions([newColor])
//     }
//   } else {
//     console.log("Color incorrecto.")
//   }
// })

// function verifyHexColor(color) {
//   let pattern = /#[0-9a-f]{6}/
//   return color.match(pattern)
// }

function handleButtonClick(event) {
  chrome.storage.sync.get("color", ({ color }) => {
    const savedColor = color
    const clickedColor = Number(event.target.dataset.key)
    /* Anteriormente era if (clickedColor && clickedColor !== savedColor), pero al pulsar el primer color
    siempre resultaba en falso, olvidé que 0 es considerado falso, espero no volver a olvidarlo */
    if (clickedColor !== savedColor) {
      chrome.storage.sync.set({ color: clickedColor })
    }
  })
}

function constructOptions(buttonColors) {
  for (let [index, buttonColor] of buttonColors.entries()) {
    let button = document.createElement("button")
    button.dataset.color = buttonColor
    button.dataset.key = index
    button.style.backgroundColor = buttonColor
    button.addEventListener("click", handleButtonClick)
    page.appendChild(button)
  }
}

chrome.storage.sync.get("defaultColors", ({ defaultColors }) => {
  constructOptions(defaultColors)
})
