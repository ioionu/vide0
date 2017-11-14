module.exports = (state, emitter) => {
  state.videos = []
  state.active = null
  state.video = null
  state.r = 'videos'
  emitter.on('ingest', (videos) => {
    for(let key in videos) {
      console.log(videos[key]);
    }
    state.videos = videos
    emitter.emit('render')
  })
  emitter.on('start', (e)=>{
    state.active = 0
    state.video = state.videos[state.active]
    emitter.emit('render')
  })
  emitter.on('showNext', (e)=>{
    state.active++
    state.video = state.videos[state.active]
    emitter.emit('render')
  })
  emitter.on('showPrev', (e)=>{
    state.active--
    state.video = state.videos[state.active]
    emitter.emit('render')
  })
  emitter.emit('fetch')
}
