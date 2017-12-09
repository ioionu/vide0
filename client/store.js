const viewVideo = require('./view-video.js')

module.exports = (state, emitter) => {
  state.videos = []
  state.active = null
  state.video = null
  state.autoplay = true
  state.r = 'videos'
  emitter.on('ingest', (videos) => {
    for(let key in videos) {
      console.log(videos[key]);
    }
    const rendered = videos.map((video)=>{
      return {
        url: video,
        data: viewVideo.parseVideo(video)
      }
    }).filter((video)=>{
      return video.data !== null
    })
    state.videos = rendered
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
  emitter.on('toggleAutoplay', (e) => {
    state.autoplay = !state.autoplay
    emitter.emit('render')    
  })
  emitter.emit('fetch')
}
