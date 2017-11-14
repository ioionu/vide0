const fastify = require('fastify')()
const path = require('path')
const cache = require('memory-cache')
const fetch = require('node-fetch')
const feeds = require('./client/feeds.js')
var DOMParser = require('xmldom').DOMParser;
require('dotenv').load()

let CACHETIMEOUT = process.env.CACHETIMEOUT || 100010
CACHETIMEOUT = parseInt(CACHETIMEOUT);

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'dist'),
	prefix: '/dist/',
})

fastify.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

const getTargetUrl = (query)=>{
  let r = 'videos'
  if (typeof query.r !== 'undefined') {
    r = query.r
  }

  // validate that the past r is valid
  let url = feeds.find((feed)=>{return feed.r === r})
  if (typeof url === 'undefined') {
    // if not use default
    return process.env.SOURCE
  }
  return url.url
}

fastify.get('/stuff',(request, reply) => {
  const target_url = getTargetUrl(request.query)
  const cache_data = cache.get(target_url)
  if(cache_data !== null) {
    console.log('sending cached data')
    reply.send(cache_data)
  } else {
    fetch(target_url, {method:'get'})
    .then(response=>{
      return response.text()
    })
    .then(data=>{
      const dp = new DOMParser()
      const dom = dp.parseFromString(data, 'text/xml')
      return dom
    })
    .then(dom=>{
      const content = dom.getElementsByTagName('content')
      const items = toArray(content)
      return items.map(item=>{
        const match = item.firstChild.textContent.match(/<a href="(\S+?)">\[link\]<\/a>/)[1]
        return match
      })
    })
    .then(items=>{
      return items
    })
    .then(data=>{
      cache.put(target_url, data, CACHETIMEOUT, (key, value) => {
        console.log('the cache expired')
      })
      return data
    })
    .then(data=>{
      reply.send(data)
    })
  }
})

fastify.get('/feeds', (request, reply)=>{
  console.log("dafaq", feeds);
  reply.send(feeds)
})

const PORT = process.env.PORT || 3000;
fastify.listen(PORT, function (err) {
    if (err) throw err
        console.log(`server listening on ${fastify.server.address().port}`)
})

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}
