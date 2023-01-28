//Log Messages
let log = [];
let currentStatus = 'ok';

browser.runtime.onMessage.addListener(notify);

browser.browserAction.onClicked.addListener(() =>
    {
        browser.sidebarAction.toggle();
    }
);
browser.sidebarAction.onactivate.addListener(() =>
    {
    showIcon();
    }
);

function notify(message) {

    //Pruning log array
    if (log.length > 2000) {
        log = log.slice(-1000);
    }

    if (message.text !== undefined) {
        log.push(message.text);
    }

    if (message.type == 'error' || message.type == 'warning') {
        for (let i = 0; i < message.content.length; i++) {
            log.push(message.content[i]);
        }
    }

    if (message.updatestatus !== undefined) {
        if (message.type == 'error' || message.type == 'warning') {
            currentStatus = message.type;
        } else {
            currentStatus = 'ok';
        }
    }

    if (message.sendlog === true) {
        let logmessage = { updatelogview: true, content: log};
        browser.runtime.sendMessage(logmessage);
    }

    setIcon();
}

function setIcon()
{
    if (currentStatus == 'error') {
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
        browser.sidebarAction.setIcon(
            {
                path: {
                    32: "icons/onpageseocheck-rot-32.png",
                    48: "icons/onpageseocheck-rot-48.png",
                    96: "icons/onpageseocheck-rot-96.png",
                    128: "icons/onpageseocheck-rot-128.png"
                }
            }
        );
    } else if (currentStatus == 'warning') {
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
        browser.sidebarAction.setIcon(
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
        browser.sidebarAction.setIcon(
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
