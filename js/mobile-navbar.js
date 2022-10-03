class MobileNavbar {
   constructor(navMobileMenu, navList, navLinks) {
     this.navMobileMenu = document.querySelector(navMobileMenu);
     this.navList = document.querySelector(navList);
     this.navLinks = document.querySelectorAll(navLinks);
     this.activeClass = "active";
 
     this.handleClick = this.handleClick.bind(this);
   }
 
   animateLinks() {
     this.navLinks.forEach((link, index) => {
       link.style.animation
         ? (link.style.animation = "")
         : (link.style.animation = `navLinkFade 0.5s ease forwards ${
             index / 7 + 0.3
           }s`);
     });
   }
 
   handleClick() {
     this.navList.classList.toggle(this.activeClass);
     this.navMobileMenu.classList.toggle(this.activeClass);
     this.animateLinks();
   }
 
   addClickEvent() {
     this.navMobileMenu.addEventListener("click", this.handleClick);
   }
 
   init() {
     if (this.navMobileMenu) {
       this.addClickEvent();
     }
     return this;
   }
 }
 
 const mobileNavbar = new MobileNavbar(
   ".nav-mobile-menu",
   ".nav-list",
   ".nav-list li",
 );
 mobileNavbar.init();
 