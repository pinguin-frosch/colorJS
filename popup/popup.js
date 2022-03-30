let changeColor = document.getElementById("changeColor")

// Cambia el color al leer el color actual
chrome.storage.sync.get(["color", "defaultColors"], ({ color, defaultColors }) => {
  changeColor.style.backgroundColor = defaultColors[color]
})

// Añade un event listener para cambiar el color de la página
changeColor.addEventListener("click", async () => {
  try {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    })
  } catch (err) {
    console.log(err)
  }
})

// Función que cambia el color de la página
function setPageBackgroundColor() {
  chrome.storage.sync.get(["color", "defaultColors"], ({ color, defaultColors }) => {
    document.body.style.backgroundColor = defaultColors[color]
  })
}
