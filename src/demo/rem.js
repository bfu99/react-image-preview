(function rem() {
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')

    let size = document.documentElement.clientWidth * 20 / 320

    let cssText = document.createTextNode('html {font-size: ' + size + 'px}')
    style.appendChild(cssText)

    document.head.appendChild(style)
})()