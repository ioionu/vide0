const html = require('choo/html')
const feeds = require('./feeds.js')

module.exports = (state, emit) => {
  const getOptions = ()=>{
    return feeds.map((option)=>{
      const is_selected = option.r === state.r ? 'selected' : ''
      return html`<option value='${option.r}' ${is_selected}>${option.name}</option>`
    })
  }

  const handleClick = (emit, e)=>{
    state.r = e.target.value
    state.active = null
    emit('fetch')
  }

  return html`<select name='r' onchange=${(e)=>{handleClick(emit, e)}}>
    ${getOptions()}
  </select>`
}
