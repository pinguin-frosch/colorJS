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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ defaultColors: defaultColors, color: 0 })
})
