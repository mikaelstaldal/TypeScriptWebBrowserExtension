const notifications = new Set<string>();
const player = new Audio();

init();

function init() {
  player.autoplay = false;
  player.preload = "auto";
  player.src = browser.runtime.getURL("assets/clearly.ogg");

  browser.runtime.onMessage.addListener(notify);
}

function notify(message: any /*{id: string, title: string, body: string}*/): void {
  if (!notifications.has(message.id)) {
    player.play().catch((reason) => {
      console.error(reason);
    });
    browser.notifications
      .create(message.id, {
        type: "basic",
        title: message.title,
        message: message.body,
      })
      .then((id) => {
        console.log(`notification created: ${id}`);
        notifications.add(id);
      })
      .catch((reason) => {
        console.error("Count not create notification:");
        console.error(reason);
      });
    window.setTimeout(() => {
      if (notifications.has(message.id)) {
        browser.notifications.clear(message.id).then(() => notifications.delete(message.id));
      }
    }, 5000);
  }
}
