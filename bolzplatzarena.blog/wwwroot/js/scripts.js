(function() {
    const button = document.getElementById('navigation-button');
    const main = document.getElementsByTagName('main')[0];
    if(button) {
        button.addEventListener('click', function() {
           let isActive = button.classList.contains('is-active');
           button.classList.remove('is-active');
           main.classList.remove('show-navigation');
           if(!isActive) {
               button.classList.add('is-active');
               main.classList.add('show-navigation');
               isActive = true;
           }
           button.blur();
        });
    }
})();