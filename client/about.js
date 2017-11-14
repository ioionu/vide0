const html = require('choo/html')

module.exports = (state, emit) => {
  return html`<span>
    ${state.active+1}/${state.videos.length} : <a href='${state.videos[state.active]}' target='_blank'>${state.videos[state.active]}</a>
  </span>`
}
