import 'whatwg-fetch'

module.exports = (state, emitter) => {
  emitter.on('fetch', () => {
    fetch('/stuff?r=' + state.r)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      emitter.emit('ingest', data)
      return data
    })
    .then((data)=>{
      if (state.active === null) {
        emitter.emit('start')
      }
    })

  })
}
