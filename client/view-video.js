const html = require('choo/html')

module.exports = {
  // function render(video) {
  //   const code = parseVideo(video)
  //   if (code === null) {
  //     return null
  //   }
  //   return html`<div>
  //     ${code.embed}
  //   </div>`
  // }

  buildEmbed: (state) => {
    if (state.video === null) {return null}
    const {platform, code} = state.video.data
    const autoplay = state.autoplay
    let autoplayCode = ''
    switch (platform) {
      case 'youtube':
        autoplayCode = autoplay ? '&autoplay=1' : ''
        return html`<div class='iframe'><iframe src="https://www.youtube-nocookie.com/embed/${code}?rel=0${autoplayCode}" frameborder="0" allowfullscreen></iframe></div>`
      case 'vimeo':
        autoplayCode = autoplay ? '?autoplay=1' : ''
        return html`<div class='iframe'><iframe src="https://player.vimeo.com/video/${code}${autoplayCode}" frameborder="0" allowfullscreen></iframe></div>`
      case 'soundcloud':
        let soundcloud_path = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(code) + "&auto_play=false&buying=true&liking=true&download=true&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_user=true&hide_related=false&visual=true&start_track=0&callback=true"
        return html`<div class='iframe'>
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameborder="no"
            src="${soundcloud_path}">
            </iframe>
          </div>`
      case 'video':
        autoplayCode = autoplay ? 'autoplay="true"' : ''
        return html`<div class='video'><video controls='true' ${autoplayCode}><source src="${code}" type="video/mp4"></video></div>`
      case 'image':
        return html`<div class='img' id='${code}'><img src="${code}"/></div>`
      case 'twitch':
        return html`<div class='iframe'>
          <iframe src="https://clips.twitch.tv/embed?clip=${code}&autoplay=false&tt_medium=clips_embed"
            width="640" height="360" frameborder="0" scrolling="no" allowfullscreen="true">
            </iframe>
          </div>`
      case null:
        return html`<div class='loading'>Sorry i cant render that</div>`
      }
  },

  parseVideo: (video) => {
    let code = ""
    let platform = "youtube"
    var parser = document.createElement('a');
    parser.href = video;

    if (parser.hostname === 'www.youtube.com' || parser.hostname === 'm.youtube.com') {
      code = parser.search.match(/v=([\w-]{10,12})/)
      code = (code !== null && code.length === 2) ? code[1] : null
    } else if (parser.hostname === 'youtu.be') {
      code = parser.pathname.substr(1, parser.pathname.length)
    } else if (parser.hostname === 'vimeo.com') {
      platform = 'vimeo'
      code = parser.pathname.split('/')
      code = code[1]
    } else if (parser.hostname === 'soundcloud.com') {
      platform = 'soundcloud'
      code = 'https://soundcloud.com' + parser.pathname
    } else if (parser.pathname.match(/\.gifv/) ) {
      platform = 'video'
      code = video.substring(0, video.length-5) + '.mp4'
    } else if (parser.pathname.match(/\.gif|\.jpg|\.png/)) {
      platform = 'image'
      code = video
    } else if (parser.hostname === 'clips.twitch.tv') {
      platform = 'twitch'
      code = parser.search.match(/clip\=(.+?)&/)
      code = parser.pathname.substr(1, parser.pathname.length)
    } else {
      return null
    }

    return {
      platform: platform,
      code: code,
    }
  }
}
