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
const store = require('./store.js')

// initialize choo
var app = choo()
app.use(fetchData)
app.use(store)

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
