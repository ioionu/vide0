const html = require('choo/html')

module.exports = (state, emit) => {
  function sniff () {
    emit('fetch')
  }

  function showNext(e) {
    console.log('nexxt was pressed');
    emit('showNext')
  }
  const showPrev = (e)=>{
    emit('showPrev')
  }

  const prevButton = () => {
    if (state.active > 0) {
      return html`
        <button
          type="button"
          class='btn btn-secondary'
          onclick=${showPrev}>
          前
        </button>
      `
    }
  }

  const nextButton = () => {
    if (state.active < state.videos.length) {
      return html`
        <button
          type="button"
          class='btn btn-primary'
          onclick=${showNext}>
          次
        </button>
      `
    }
  }

  return html`
  <div class='col'>
    ${prevButton()}
    ${nextButton()}
  </div>
  `
}
