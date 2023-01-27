
//Clear Log Button
document.getElementById('opsc_clear_log').addEventListener("click", function () {
    document.getElementById("opsc_log").value = '';
});

//Show Errors or Warnings in Log
browser.runtime.onMessage.addListener(notify);

function notify(message) {
    var ta = document.getElementById('opsc_log');
    ta.value += message.text;

    if (message.type == 'error' || message.type == 'warning') {
        ta.value += ":\n";
        for (let i = 0; i < message.content.length; i++) {
            ta.value += message.content[i]+"\n";
        }
    } else {
        ta.value += "\n";
    }

    ta.scrollTop = ta.scrollHeight;;
}

