const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navMenu = document.getElementById('nav-menu')

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}

// Remove menu on mobile

const navLinks = document.querySelectorAll('.nav__link')
console.log(navLinks)
navLinks.forEach((navLink)=>{
    navLink.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
})