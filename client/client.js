// import choo
const choo = require('choo')

// import choo's template helper
const html = require('choo/html')
const viewVideo = require('./view-video.js')
const fetchData = require('./fetch-data.js')
const navigation = require('./navigation.js')
const about = require('./about.js')
const css = require('./client.css')
const store = require('./store.js')
const menu = require('./menu.js')

// initialize choo
const app = choo()
app.use(fetchData)
app.use(store)

function mainView (state, emit) {

  return html`
    <body>
      <div class='app'>
        <div class='grid'>
          <div class='header container-fluid'>
            <div class='row'>
              <div class='col'>
                ${menu(state, emit)}
              </div>
              <div class='col'>
                ${navigation(state, emit)}
              </div>
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
