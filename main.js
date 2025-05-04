/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

// Update your existing ScrollReveal section to include these new animations
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text, .education__subtitle, .resume__box',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img, .education__content, .resume__button',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input, .education__rounder, .about__info-item',{interval: 200});

// Add smooth scrolling for the education and resume links
document.querySelector('a[href="#education"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#education').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('a[href="#resume"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#resume').scrollIntoView({ behavior: 'smooth' });
});

// Optional: Add click tracking for resume downloads
document.querySelector('.resume__button').addEventListener('click', function() {
    console.log('Resume downloaded');
    // You could add analytics tracking here if desired
});
