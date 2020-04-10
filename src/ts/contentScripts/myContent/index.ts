import {hex} from '../../common/utils';

let count = 0;

function notify(id: string, title: string, body: string) {
    console.log("Sending message...");
    browser.runtime.sendMessage({id, title, body})
        .then(() => console.log("Message sent"))
        .catch(reason => console.error(reason));
}

window.setInterval(() => {
    count++;
    notify(location.href, location.href, hex(count))
}, 1000);
