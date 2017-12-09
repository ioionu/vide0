const html = require('choo/html')

module.exports = (state, emit) => {
  function sniff () {
    emit('fetch')
  }

  const showNext = (e) => {
    emit('showNext')
  }
  const showPrev = (e)=>{
    emit('showPrev')
  }

  const prevButton = () => {
    const disabled = (state.active > 0) ? '' : 'disabled'
    return html`
      <button
        type="button"
        class='btn btn-outline-secondary'
        onclick=${showPrev}
        ${disabled}>
        前
      </button>
    `
  }

  const nextButton = () => {
    const disabled = (state.active+1 < state.videos.length) ? '' : 'disabled'
    return html`
      <button
        type="button"
        class='btn btn-outline-primary'
        onclick=${showNext}
        ${disabled}>
        次
      </button>
    `
  }

  return html`
  <div>
    ${prevButton()}
    ${nextButton()}
  </div>
  `
}
