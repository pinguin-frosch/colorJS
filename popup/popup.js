let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get(["color", "defaultColors"], ({ color, defaultColors }) => {
  changeColor.style.backgroundColor = defaultColors[color]
})

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

function setPageBackgroundColor() {
  chrome.storage.sync.get(["color", "defaultColors"], ({ color, defaultColors }) => {
    document.body.style.backgroundColor = defaultColors[color]
  })
}
