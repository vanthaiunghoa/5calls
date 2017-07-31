const html = require('choo/html');
const t = require('../utils/translation');

const scriptFormat = require('./scriptFormat.js');
const issuesLink = require('./issuesLink.js');

module.exports = (state, prev, send) => {
  return html`
    <div class="call__script">
      <h3 class="call__script__header">${t("script.yourScript")}</h3>
      ${scriptFormat(state, prev, send)}
      ${issuesLink(state, prev, send)}
    </div>
  `;
};
