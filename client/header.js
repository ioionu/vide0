const html = require('choo/html')
const menu = require('./menu.js')
module.exports = (state, emit) => {
  return html`<div class='col'>${menu(state, emit)}</div>`
}
