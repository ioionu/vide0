const html = require('choo/html')
const menu = require('./menu.js')
module.exports = (state, emit) => {
  return html`<div class='col'>${menu(state, emit)} | ${state.active+1}/${state.videos.length} | ${state.videos[state.active]}</div>`
}
