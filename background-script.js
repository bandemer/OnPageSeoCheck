
browser.runtime.onMessage.addListener(notify);

function notify(message) {

    console.log(message.text);

    if (message.type == 'error') {
        let settingIcon = browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/seo-32-rot.png",
                    48: "icons/seo-48-rot.png"
                }
            }
        );
    } else {
        let settingIcon = browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/seo-32-gruen.png",
                    48: "icons/seo-48-gruen.png"
                }
            }
        );
    }

}