const links = document.querySelector(".links")
const showLinks = document.querySelector(".show-links")
const navToggle = document.querySelector(".nav-toggle")

navToggle.addEventListener("click",()=>{
   console.log(links.classList)
   if(links.classList.contains("show-links")){
      links.classList.remove("show-links")
      navToggle.style.transform = 'rotate(180deg)';
   }
   else{
      links.classList.add("show-links")
      navToggle.style.transform = 'rotate(90deg)';
   }
})
