
browser.runtime.onMessage.addListener(notify);

function notify(message) {

    console.log(message.text);

    if (message.type == 'error') {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/seo-32-rot.png",
                    48: "icons/seo-48-rot.png"
                }
            }
        );
    } else if (message.type == 'warning') {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/seo-32-gelb.png",
                    48: "icons/seo-48-gelb.png"
                }
            }
        );
    } else {
        browser.browserAction.setIcon(
            {
                path: {
                    32: "icons/seo-32-gruen.png",
                    48: "icons/seo-48-gruen.png"
                }
            }
        );
    }
}