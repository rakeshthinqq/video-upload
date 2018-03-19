import services from '..'
const reducer = (accumulator, currentValue) => accumulator + '<li>' + currentValue + '</li>'

// Returns service list under markup structure
// -title
// -bullet list
const list = (req, res) => res.send(
  '<h1>Services available</h1>' +
  '<ol>' + services.map(s => s.path + ' @ ' + s.verb.toUpperCase()).reduce(reducer) + '</ol>'
)

export {
  list
}
