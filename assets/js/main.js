/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== AOS INITIALIZATION ====================*/
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000, // Animation duration
        once: true, // Animations happen only once
    });
});


/*==================== SKILLS SECTION INTERACTIVITY ====================*/
document.querySelectorAll('.skills__header').forEach(button => {
  button.addEventListener('click', function() {
      let content = this.nextElementSibling;
      let icon = this.querySelector("i");

      if (content.style.display === "block") {
          content.style.display = "none";
          icon.style.transform = "rotate(0deg)";
      } else {
          content.style.display = "block";
          icon.style.transform = "rotate(180deg)";
      }
  });
});


/*==================== SURPRISE SWIPER  ====================*/
// Swiper Configuration
var swiper = new Swiper(".swiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    centeredSlides: true,
    freeMode: true,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      500: {
        slidesPerView: 1
      },
      700: {
        slidesPerView: 1.5
      }
    }
  });
  

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');

  if (scrollUp) { // ✅ Prevents null error if element is missing
      if (window.scrollY >= 560) {
          scrollUp.classList.add('show-scroll');
      } else {
          scrollUp.classList.remove('show-scroll');
      }
  }
}

window.addEventListener('scroll', scrollUp);

  

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Apply smooth transitions when switching themes
document.body.style.transition = "background-color 0.3s ease-in-out, color 0.3s ease-in-out";

// Previously selected theme (if stored)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Function to get the current theme & icon
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// If a theme was previously selected, apply it
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// Toggle theme on button click
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    
    // Save the user's theme preference
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
  }
  resize();
  window.addEventListener('resize', resize);
}

var sphereAnimation = (function() {
  var sphereEl = document.querySelector('.sphere-animation');

  // 🔴 Check if the element exists before proceeding
  if (!sphereEl) {
      console.warn("⚠️ Warning: .sphere-animation element not found. Skipping animation.");
      return; // Stop execution if element doesn't exist
  }

  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var animations = [];


  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: ['rgba(30,180,255,1)', 'rgba(30,144,255, .6)'], duration: 3000},
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    autoplay: false
  })
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 3000,
      easing: 'easeInOutCirc',
      delay: anime.stagger(190, {direction: 'reverse'})
    },
    duration: 3000,
    delay: anime.stagger(60, {direction: 'reverse'}),
    easing: 'linear'
  }, 0);

  var shadowAnimation = anime({
      targets: '#sphereGradient',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 10000,
      easing: 'easeOutQuint',
      autoplay: false
    }, 0);

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }
  
  init();

})();

/*==================== PROJECTS SWIPER ====================*/
var projectSwiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  autoplay: {
      delay: 4000,
      disableOnInteraction: false,
  },
  breakpoints: {
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      }
  }
});


/*==================== CONTACT FORM HANDLING WITH EMAILJS ====================*/
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      console.log("Form submitted, processing...");

      let name = document.getElementById('name').value.trim();
      let email = document.getElementById('email').value.trim();
      let company = document.getElementById('company').value.trim();
      let message = document.getElementById('message').value.trim();

      if (name === '' || email === '' || message === '') {
          alert('⚠️ Please fill out all required fields.');
          return;
      }

      // Send email using EmailJS
      emailjs.send("service_kzoptx4", "template_7cackaj", {
          from_name: name,
          reply_to: email, 
          company: company,
          message: message
      }, "6MD58e4wDNQzYR9CY")
      .then(function(response) {
          console.log("✅ Email sent successfully:", response);
          alert('✅ Message sent successfully!');
          document.getElementById('contact-form').reset();
      })
      .catch(function(error) {
          console.error("❌ EmailJS Error: ", error);
          alert('❌ Failed to send message. Please try again later.');
      });
  });
});
