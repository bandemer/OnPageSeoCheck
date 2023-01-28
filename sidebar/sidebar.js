
//Clear Log Button
document.getElementById('opsc_clear_log').addEventListener("click", function () {
    document.getElementById("opsc_log").value = '';
});

//Listen to runtime messages
browser.runtime.onMessage.addListener(notify);

//On load request log messages from background script
browser.windows.getCurrent({populate: true}).then(() => {
    let requestlogmessage = { sendlog: true};
    browser.runtime.sendMessage(requestlogmessage);
});

function notify(message) {

    if (message.updatelogview === true) {
        let ta = document.getElementById('opsc_log');
        ta.value = message.content.join("\n").trim();
        ta.scrollTop = ta.scrollHeight;
    }
}