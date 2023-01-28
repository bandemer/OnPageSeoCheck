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
metaTitle = document.getElementsByTagName('title');
check = checkMetaTitle(metaTitle);
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

message = { sendlog: true, type: 'info', text: 'Everything is fine!', content: {}};
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
function checkMetaTitle(found)
{
    let rA = { 'level': 0, 'messages': []};

    if (found.length == 0) {
        rA.level = 100;
        rA.messages.push('No Meta Title found');
    } else if (found.length > 1) {
        rA.level = 100;
        rA.messages.push('More than one Meta Title found');
    } else {
        if (found[0].innerHTML.length == 0) {
            rA.level = 100;
            rA.messages.push('Meta Title is empty');
        } else if (found[0].innerHTML.length < 10 ) {
            rA.level = 50;
            rA.messages.push('Meta Title is very short');
        } else if (found[0].innerHTML.length > 100 ) {
            rA.level = 50;
            rA.messages.push('Meta Title is very long');
        }
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
        rA.level = 100;
        rA.messages.push('No meta description found');
    } else if (found.length > 1) {
        rA.level = 100;
        rA.messages.push('More than one meta description found');
    } else {
        if (found[0].length == 0) {
            rA.level = 100;
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
        rA.level = 100;
        rA.messages.push('More than one meta robots tag found');
    } else {

        if (found[0].length == 0) {
            rA.level = 100;
            rA.messages.push('Meta robots is empty');
        } else if (found[0].trim().toLowerCase() == 'index,follow' ||
            found[0].trim().toLowerCase() == 'noindex,follow' ||
            found[0].trim().toLowerCase() == 'index,nofollow' ||
            found[0].trim().toLowerCase() == 'noindex,nofollow') {
            /**
             * valid values
             * maybe use a regex instead
             */
        } else {
            rA.level = 100;
            rA.messages.push('No valid value for meta robots: ' +
                found[0].trim().toLowerCase());
        }
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
        rA.level = 100;
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