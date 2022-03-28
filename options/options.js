let colorsDiv= document.getElementById("colorsDiv")

function handleButtonClick(event) {
  chrome.storage.sync.get("color", ({ color }) => {
    const savedColor = color
    const clickedColor = Number(event.target.dataset.key)
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
    colorsDiv.appendChild(button)
  }
}

chrome.storage.sync.get("defaultColors", ({ defaultColors }) => {
  constructOptions(defaultColors)
})
