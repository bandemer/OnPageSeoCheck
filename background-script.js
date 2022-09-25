

browser.runtime.onMessage.addListener(notify);

function notify(message) {

    //console.log('OnPageSeoCheck: ' + message.text);

    if (message.type == 'error') {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/onpageseocheck-rot-32.png",
                    48: "icons/onpageseocheck-rot-48.png",
                    96: "icons/onpageseocheck-rot-96.png",
                    128: "icons/onpageseocheck-rot-128.png"
                }
            }
        );
    } else if (message.type == 'warning') {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/onpageseocheck-gelb-32.png",
                    48: "icons/onpageseocheck-gelb-48.png",
                    96: "icons/onpageseocheck-gelb-96.png",
                    128: "icons/onpageseocheck-gelb-128.png"
                }
            }
        );
    } else {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/onpageseocheck-32.png",
                    48: "icons/onpageseocheck-48.png",
                    96: "icons/onpageseocheck-96.png",
                    128: "icons/onpageseocheck-128.png"
                }
            }
        );
    }
}

