const nav = document.querySelector("nav"),
      toggleBtn = nav.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
})

// make it draggable using js

function onDrag({movementY,movementX}) {
    const navStyle = window.getComputedStyle(nav);
    const navTop = parseInt(navStyle.top); //getting nav top value
    const navright = parseInt(navStyle.right); //getting nav top value
    const navHeight = parseInt(navStyle.height); //getting nav top value
    const navwidth = parseInt(navStyle.width); //getting nav top value
    const windHeight = window.innerHeight;
    const windWidth = window.innerWidth;

    toggleBtn.classList.add('drag');


    nav.style.top = navTop >0 ? `${navTop + movementY}px` : "1px";

    // nav.style.right = navright >0 ? `${navright - movementX}px` : "1px";

    if(navTop > windHeight - navHeight){
        nav.style.top = '${windHeight - navHeight}px';
    };
    
    
}

nav.addEventListener('mousedown', () => {
    
    nav.addEventListener('mousemove',onDrag);

});
nav.addEventListener('mouseup', () => {
    nav.removeEventListener('mousemove',onDrag);

});