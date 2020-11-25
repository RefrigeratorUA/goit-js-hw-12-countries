import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';

const alertPnotifySettings = {
  styling: 'material',
  icons: 'material',
  delay: Infinity,
  width: 'auto',
  closer: false,
  sticker: false,
  autoOpen: false,
  stack: new Stack({
    dir1: 'right',
    dir2: 'left',
    firstpos1: 0,
    firstpos2: 0,
    spacing1: 0,
    spacing2: 0,
    maxStrategy: 'close',
    push: 'top',
    context: document.getElementById('page-container'),
  }),
};
let alertPnotify = null;

function showAlert(typeMsg, head, msg) {
  if (alertPnotify) closeAlert();
  alertPnotify = alert({ ...alertPnotifySettings, type: typeMsg, title: head, text: msg });
  alertPnotify.open();
}

function closeAlert() {
  if (!alertPnotify) return;
  alertPnotify.close();
  alertPnotify = null;
}

export { showAlert, closeAlert };
