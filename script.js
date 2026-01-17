// ============================================
// MENTORSPHERE - INTERACTIVE JAVASCRIPT
// ============================================

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Set active nav link based on current page
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== Testimonials carousel (infinite loop) =====
//document.addEventListener("DOMContentLoaded", function () {
//  const list = document.querySelector(".testimonial-list");
  //const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  //const prevBtn = document.querySelector(".testimonial-nav.prev");
  //const nextBtn = document.querySelector(".testimonial-nav.next");

  //if (!list || cards.length === 0 || !prevBtn || !nextBtn) return;

  //const visibleCount = 3;          // how many cards visible at once
  //const autoDelay = 5000;          // 5s between slides
  //let autoTimer = null;

  // 1) Clone first `visibleCount` cards and append to end
  //const clones = cards.slice(0, visibleCount).map(card => card.cloneNode(true));
  //clones.forEach(clone => {
   // clone.classList.remove("active");
    //list.appendChild(clone);
  //});

  //const allCards = Array.from(list.querySelectorAll(".testimonial-card"));
  //let currentIndex = 0;

  //function setActive() {
   // allCards.forEach((card, idx) => {
     // if (idx >= currentIndex && idx < currentIndex + visibleCount) {
      //  card.classList.add("active");
     // } else {
      //  card.classList.remove("active");
     // }
   // });
 // }

 // function getCardWidth() {
    // width + horizontal gap (match your CSS gap: 24px)
  //  return allCards[0].offsetWidth + 24;
  //}

 // function updateTransform(animate = true) {
  //  const cardWidth = getCardWidth();
   // const offset = -currentIndex * cardWidth;

   // if (!animate) {
    //  list.style.transition = "none";
   // } else {
    //  list.style.transition = "transform 0.4s ease";
   // }
  //  list.style.transform = `translateX(${offset}px)`;
  //  setActive();
 // }

 // function goNext() {
  //  currentIndex++;
  //  updateTransform(true);

    // When transition ends, if we've moved into clones, snap back
   // list.addEventListener(
     // "transitionend",
     // function handler() {
     //   const originalCount = cards.length;
     //   if (currentIndex >= originalCount) {
     //     currentIndex = 0;        // snap back to real first card
     //     updateTransform(false);  // no animation for the snap
     //   }
     //   list.removeEventListener("transitionend", handler);
     // }
    //);
 // }

 // function goPrev() {
  //  const originalCount = cards.length;
   // if (currentIndex === 0) {
      // Jump instantly to equivalent position inside clones zone
   //   currentIndex = originalCount;
   //   updateTransform(false);
   // }
    // Now move one step left with animation
  //  requestAnimationFrame(() => {
  //    currentIndex--;
  //    updateTransform(true);
  //  });
 // }

 // function startAuto() {
 //   stopAuto();
 //   autoTimer = setInterval(goNext, autoDelay);
 // }

 // function stopAuto() {
  //  if (autoTimer) clearInterval(autoTimer);
 // }

  // Buttons reset autoplay
 // nextBtn.addEventListener("click", () => {
 //   stopAuto();
 //   goNext();
 //   startAuto();
 // });

 // prevBtn.addEventListener("click", () => {
 //   stopAuto();
 //   goPrev();
 //   startAuto();
 // });

  // Initial state
 // setActive();
 // updateTransform(false);
 // startAuto();
//});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

//const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards on load
document.querySelectorAll('.why-card, .founder-card, .testimonial-card, .value-card, .what-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Form validation and submission feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
   contactForm.addEventListener('submit', (e) => {
        // Form will be submitted to Formspree
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.style.opacity = '0.7';
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });
}

// Add mobile menu active state styling
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        #nav-menu {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e3a5f 0%, rgba(30, 58, 95, 0.95) 100%);
            flex-direction: column;
            padding: 20px;
            gap: 0;
        }

        #nav-menu.active {
            display: flex;
        }

        .nav-menu li {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 15px 0;
        }

        .nav-menu li:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let value;
        if (element.textContent.includes('+')) {
            value = Math.floor(start + (target - start) * progress) + '+';
        } else if (element.textContent.includes('%')) {
            value = Math.floor(start + (target - start) * progress) + '%';
        } else {
            value = Math.floor(start + (target - start) * progress);
        }

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Trigger counter animation when stat section is visible
const statElements = document.querySelectorAll('.stat-item h3');
let statsAnimated = false;

if (statElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statElements.forEach(stat => {
                    const text = stat.textContent;
                    let target = parseInt(text);
                    animateCounter(stat, target);
                });
                statsAnimated = true;
            }
        });
    });

    statElements.forEach(stat => statsObserver.observe(stat.closest('.stat-item')));
}

// Prevent form double-submission
let formSubmitting = false;
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (formSubmitting) {
            e.preventDefault();
        }
        formSubmitting = true;
    });
}

console.log('Mentorsphere website loaded successfully!');
