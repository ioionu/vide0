const html = require('choo/html')

module.exports = (state, emit) => {
  if (state.active !== null) {
    return html`
      <h2>${state.active+1}/${state.videos.length} :
        <a href='${state.videos[state.active].url}' target='_blank'>
          <span class='desktop'>${state.videos[state.active].url}</span>
          <span class='mobile'>Link</span>
        </a>
      </h2>
    `
  } else {
    return html`
      <h2>Loading...${state.active}</h2>
    `
  }
}
