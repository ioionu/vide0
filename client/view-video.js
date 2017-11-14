const html = require('choo/html')

module.exports = (video) => {
  if(video === null || typeof video === 'undefined') {
    return html`
      <div class="col loading">loading...</div>
    `
  }
  const code = parseVideo(video)
  return html`<div class="col">
    ${code.embed}
  </div>`
}

function buildEmbed(platform, code) {
  switch (platform) {
    case 'youtube':
      return html`<div class='iframe'><iframe src="https://www.youtube-nocookie.com/embed/${code}?rel=0" frameborder="0" allowfullscreen></iframe></div>`
    case 'vimeo':
      return html`<div class='iframe'><iframe src="https://player.vimeo.com/video/${code}" frameborder="0" allowfullscreen></iframe></div>`
    case 'soundcloud':
      const soundcloud_path = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(code) + "&auto_play=false&buying=true&liking=true&download=true&sharing=true&show_artwork=true&show_comments=true&show_playcount=true&show_user=true&hide_related=false&visual=true&start_track=0&callback=true"
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
      return html`<div class='video'><video controls><source src="${code}" type="video/mp4"></video></div>`
    case 'image':
      return html`<div class='img'><img src="${code}"/></div>`
    case null:
      return html`<div class='loading'>Sorry i cant render that</div>`
    }
}

function parseVideo(video) {
  let code = ""
  let platform = "youtube"
  var parser = document.createElement('a');
  parser.href = video;

  if (parser.hostname === 'www.youtube.com') {
    code = parser.search.match(/v=([\w-]{10,12})/)
    code = code.length === 2 ? code[1] : null
  } else if (parser.hostname === 'youtu.be') {
    code = parser.pathname.substr(1, parser.pathname.length)
  } else if (parser.hostname === 'vimeo.com') {
    platform = 'vimeo'
    code = parser.pathname
  } else if (parser.hostname === 'soundcloud.com') {
    platform = 'soundcloud'
    code = 'https://soundcloud.com' + parser.pathname
  } else if (parser.pathname.match(/\.gifv/) ) {
    platform = 'video'
    code = video.substring(0, video.length-5) + '.mp4'
  } else if (parser.pathname.match(/\.gif|\.jpg|\.png/)) {
    platform = 'image'
    code = video
  } else {
    platform = null
    code = null
  }

  let embed = buildEmbed(platform, code)
  return {
    platform: platform,
    code: code,
    embed: embed
  }
}
