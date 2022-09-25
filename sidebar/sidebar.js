
//Clear Log Button
document.getElementById('opsc_clear_log').addEventListener("click", function () {
    document.getElementById("opsc_log").value = '';
});

//Show Errors or Warnings in Log
browser.runtime.onMessage.addListener(notify);

function notify(message) {

    document.getElementById('opsc_log').value += message.text;

    if (message.type == 'error' || message.type == 'warning') {
        document.getElementById('opsc_log').value += ":\n";
        for (let i = 0; i < message.content.length; i++) {
            document.getElementById('opsc_log').value += message.content[i]+"\n";
        }
    } else {
        document.getElementById('opsc_log').value += "\n";
    }
}

