/**
 * OnPageSeoCheck
 *
 */
let level = 0;
let messages = [];
let check = [];

/**
 * Check MetaTitle, MetaDesc, Robots and Canonical URL
 */
let metaTitle = [];
let metaDesc = [];
let robots = [];
let canonical = [];

/**
 * Check MetaTitle
 */
check = checkMetaTitle();
if (check.level > 0) {
    messages = messages.concat(check.messages)
    if (level < check.level) {
        level = check.level;
    }
}

/**
 * Collect meta data
 */
const metas = document.getElementsByTagName('meta');
for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === 'description') {
        metaDesc.push(metas[i].getAttribute('content'));
    } else if (metas[i].getAttribute('name') === 'robots') {
        robots.push(metas[i].getAttribute('content'));
    }
}

/**
 * Check Meta Description
 */
check = checkMetaDescription(metaDesc);
if (check.level > 0) {
    messages = messages.concat(check.messages)
    if (level < check.level) {
        level = check.level;
    }
}

/**
 * Check Meta Robots
  */
check = checkRobotsTag(robots);
if (check.level > 0) {
    messages = messages.concat(check.messages)
    if (level < check.level) {
        level = check.level;
    }
}

/**
 * Check canonical url
 */
const links = document.getElementsByTagName('link');
for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute('rel') === 'canonical') {
        canonical.push(links[i].getAttribute('href'));
    }
}
check = checkCanonicalUrl(canonical);
if (check.level > 0) {
    messages = messages.concat(check.messages)
    if (level < check.level) {
        level = check.level;
    }
}

/**
 * Send info to background script
 */
var message = { type: 'info', text: '\nAnalyzing URL: ' + document.URL, content: {}};
browser.runtime.sendMessage(message);

message = { updatestatus: true, sendlog: true, type: 'info', text: 'Everything is fine!', content: {}};
if (level == 100) {
    message.type = 'error';
    message.text = 'Errors found:';
    message.content = messages;
} else if (level == 50) {
    message.type = 'warning';
    message.text = 'Warnings found:';
    message.content = messages;
}
browser.runtime.sendMessage(message);

/**
 * Check Meta Title
 */
function checkMetaTitle() {

    let rA = { 'level': 0, 'messages': []};
    let mtFound = 0;
    let children = document.getElementsByTagName('head')[0].childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].nodeName == 'TITLE') {
            mtFound++;
            const t = children[i].innerHTML.trim();
            if (t.length == 0) {
                rA.level = 100;
                rA.messages.push('Meta Title is empty');
            } else if (t.length < 10 ) {
                rA.level = 50;
                rA.messages.push('Meta Title is very short: ' + t);
            } else if (t > 100 ) {
                rA.level = 50;
                rA.messages.push('Meta Title is very long: ' + t);
            }
        }
    }
    if (mtFound == 0) {
        rA.level = 100;
        rA.messages.push('No Meta Title found');
    } else if (mtFound > 1) {
        rA.level = 100;
        rA.messages.push('More than one Meta Title found');
    }
    return rA;
}

/**
 * Check Meta Description
 */
function checkMetaDescription(found)
{
    let rA = { 'level': 0, 'messages': []};

    if (found.length == 0) {
        rA.level = 50;
        rA.messages.push('No meta description found');
    } else if (found.length > 1) {
        rA.level = 100;
        rA.messages.push('More than one meta description found');
    } else {
        if (found[0].length == 0) {
            rA.level = 50;
            rA.messages.push('Meta description is empty');
        } else if (found[0].length < 50 ) {
            rA.level = 50;
            rA.messages.push('Meta description is very short');
        } else if (found[0].length > 250 ) {
            rA.level = 50;
            rA.messages.push('Meta description is very long');
        }
    }
    return rA;
}

/**
 * Check Robots tag
 */
function checkRobotsTag(found)
{
    let rA = { 'level': 0, 'messages': []};

    if (found.length == 0) {
        rA.level = 50;
        rA.messages.push('No meta robots tag found');
    } else if (found.length > 1) {
        rA.level = 50;
        rA.messages.push('More than one meta robots tag found');
    }

    let robots = { index: 0, noindex: 0, follow: 0, nofollow: 0};
    for (let i = 0; i < found.length; i++) {

        if (found[i].length == 0) {
            rA.level = 50;
            rA.messages.push('Meta robots is empty');
        } else {

            const rv = found[i].trim().toLowerCase().split(',');
            for (let j = 0; j < rv.length; j++) {
                if (rv[j].trim() == 'index') {
                    robots.index++;
                } else if (rv[j].trim() == 'noindex') {
                    robots.noindex++;
                } else if (rv[j].trim() == 'follow') {
                    robots.follow++;
                } else if (rv[j].trim() == 'nofollow') {
                    robots.nofollow++;
                }
            }
        }
    }

    if (robots.index > 0 && robots.noindex > 0) {
        rA.level = 100;
        rA.messages.push('Meta robots conflicting: Found both INDEX and NOINDEX');
    } else if (robots.index == 0 && robots.noindex == 0) {
        rA.level = 50;
        rA.messages.push('Meta robots: No INDEX or NOINDEX found');
    }
    if (robots.follow > 0 && robots.nofollow > 0) {
        rA.level = 100;
        rA.messages.push('Meta robots conflicting: Found both FOLLOW and NOFOLLOW');
    } else if (robots.follow == 0 && robots.nofollow == 0) {
        rA.level = 50;
        rA.messages.push('Meta robots: No FOLLOW or NOFOLLOW found');
    }
    if (robots.index == 0 && robots.noindex > 0) {
        rA.level = 50;
        rA.messages.push('Meta robots is set to NOINDEX');
    }
    if (robots.follow == 0 && robots.nofollow > 0) {
        rA.level = 50;
        rA.messages.push('Meta robots is set to NOFOLLOW');
    }

    return rA;
}

/**
 * Check canonical url
 */
function checkCanonicalUrl(found)
{
    let rA = { 'level': 0, 'messages': []};

    if (found.length == 0) {
        rA.level = 50;
        rA.messages.push('No canonical url is set');
    } else if (found.length > 1) {
        rA.level = 100;
        rA.messages.push('More than one canonical url found');
    } else {
        if (found[0].length == 0) {
            rA.level = 100;
            rA.messages.push('Canonical url is empty');
        }
    }
    return rA;
}