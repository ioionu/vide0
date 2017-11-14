// import choo
var choo = require('choo')

// import choo's template helper
var html = require('choo/html')
var viewVideo = require('./view-video.js')
var fetchData = require('./fetch-data.js')
var navigation = require('./navigation.js')
var header = require('./header.js')
const about = require('./about.js')
const css = require('./client.css')

function videoStore (state, emitter) {
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

// initialize choo
var app = choo()
app.use(fetchData)
app.use(videoStore)

function mainView (state, emit) {

  return html`
    <body>
      <div class='app'>
        <div class='grid'>
          <div class='header container-fluid'>
            <div class='row'>
            ${header(state, emit)}
            ${navigation(state, emit)}
            </div>
            <div class='about row'>
              <div class='col'>
               ${about(state, emit)}
              </div>
            </div>
          </div>
          <div class='active-video row'>
            ${viewVideo(state.video)}
          </div>
        </div>
      </div>
    </body>
  `
}

// start app
app.route('/', mainView)
app.mount('body')
