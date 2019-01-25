function inject(injectionMessage) {        
    var mainDiv = document.getElementById(injectionMessage.element)
    mainDiv.innerHTML = injectionMessage.html
}