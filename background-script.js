
browser.runtime.onMessage.addListener(notify);

function notify(message) {

    console.log(message.text);

    if (message.type == 'error') {
        let settingIcon = browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/error-32.png",
                    48: "icons/error-48.png"
                }
            }
        );
    } else {
        let settingIcon = browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/OnPageSeoCheck-32.png",
                    48: "icons/OnPageSeoCheck-48.png"
                }
            }
        );
    }

}