/**
 * OnPageSeoCheck
 *
 */
let errorFound = false;

const keys = ['title', 'desc', 'robots', 'canonical'];

let checks = [];
checks['title']     = '';
checks['desc']      = '';
checks['robots']    = '';
checks['canonical'] = '';

const messages = [];
messages['title']     = 'Document title empty or not set.';
messages['desc']      = 'Meta description empty or not set.';
messages['robots']    = 'Meta robots tag empty or not set.';
messages['canonical'] = 'Canonical url empty or not set-';

checks['title'] = document.title;

const metas = document.getElementsByTagName('meta');
for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === 'description') {
        checks['desc'] = metas[i].getAttribute('content');
    } else if (metas[i].getAttribute('name') === 'robots') {
        checks['robots'] = metas[i].getAttribute('content');
    }
}

const links = document.getElementsByTagName('link');
for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute('rel') === 'canonical') {
        checks['canonical'] = links[i].getAttribute('href');
    }
}

for (let i = 0; i < keys.length; i++) {
    if (checks[keys[i]] == '') {
        errorFound = true;
        console.log('OnPageSeoCheck: ' + messages[keys[i]]);
    } else {
        console.log('OnPageSeoCheck: ' + checks[keys[i]]);
    }
}

var message = { type: 'info', text: 'Everything is fine!' };
if (errorFound) {
    message.type = 'error';
    message.text = 'OnPageSeoCheck: Errors found';
}
browser.runtime.sendMessage(message);


