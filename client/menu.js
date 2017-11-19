const html = require('choo/html')
const feeds = require('./feeds.js')
const hamburger = require('svg-url-loader!./noun_25205_cc.svg')

module.exports = (state, emit) => {
  const getOptions = ()=>{
    return feeds.map((option)=>{
      const is_selected = option.r === state.r ? 'selected' : ''
      return html`<a onclick='${(e)=>{handleClick(emit, option.r)}}' class='dropdown-item' href='#'>${option.name}</a>`
    })
  }

  const handleClick = (emit, r)=>{
    state.r = r
    state.active = null
    emit('fetch')
  }

  return html`<div class='dropdown'>
    <button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' name='r' onchange=}>
      ${state.r}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    ${getOptions()}
    </div>
  </div>`
}
