let color = '#9760d1'

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color})
    console.log('Default background color set to %cpurple.', `color: ${color}`)
})