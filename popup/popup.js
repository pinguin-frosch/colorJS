let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color
})

changeColor.addEventListener("click", async () => {
    try {
        let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        })

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor
        })
    } catch (err) {
        console.log(err)
    }
})

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color
    })
}