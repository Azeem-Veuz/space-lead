  // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTop.classList.add('show');
            } else {
                navbar.classList.remove('scrolled');
                backToTop.classList.remove('show');
            }
        });

        // Mobile menu close on click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            });
        });

        function openVideoModal() {
      const modal = document.getElementById("videoModal");
      const video = document.getElementById("localVideo");
      modal.style.display = "flex";
      video.play(); // autoplay when opened
    }

    function closeVideoModal() {
      const modal = document.getElementById("videoModal");
      const video = document.getElementById("localVideo");
      modal.style.display = "none";
      video.pause(); // stop video
      video.currentTime = 0; // reset to start
    }

    // Close when clicking outside video
    window.onclick = function(event) {
      const modal = document.getElementById("videoModal");
      if (event.target === modal) {
        closeVideoModal();
      }
    }

        // Video background error handling
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.querySelector('.video-background video');
            
            if (video) {
                video.addEventListener('error', function() {
                    console.log('Video failed to load, using fallback background');
                    // Hide video container if video fails to load
                    document.querySelector('.video-background').style.display = 'none';
                });

                // Ensure video plays on mobile devices
                video.addEventListener('loadeddata', function() {
                    video.play().catch(function(error) {
                        console.log('Video autoplay failed:', error);
                    });
                });
            }
        });

        // Countdown Timer
        function updateCountdown() {
            const eventDate = new Date('November 9, 2025 09:00:00').getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = '<div class="text-center w-100"><h3>Event Started!</h3></div>';
            }
        }

        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        // Scroll functions
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function scrollToNext() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Performance optimization for video
        window.addEventListener('load', function() {
            const video = document.querySelector('.video-background video');
            if (video) {
                // Reduce video quality on slower connections
                if (navigator.connection && navigator.connection.effectiveType === '2g') {
                    video.style.display = 'none';
                }
            }
        });

        // Pause video when not in viewport (performance optimization)
        const observerOptions = {
            threshold: 0.1
        };

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (video) {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Video play failed:', e));
                    } else {
                        video.pause();
                    }
                }
            });
        }, observerOptions);

        // Observe the hero section
        document.addEventListener('DOMContentLoaded', function() {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                videoObserver.observe(heroSection);
            }
        });

// Counter Animation Function
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50; // Adjust speed
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 40); // Animation speed
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Reset counters to zero
function resetCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        counter.textContent = '0';
    });
}

// Intersection Observer for triggering animation each time in view
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();  // Run when section is visible
            } else {
                resetCounters();    // Reset when section leaves viewport
            }
        });
    }, {
        threshold: 0.5
    });

    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        observer.observe(statsCard);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        setupIntersectionObserver();
    } else {
        // Fallback: animate immediately if not supported
        setTimeout(animateCounters, 500);
    }
});
                // owl carousels
// ---------------- Owl Carousel Init ----------------
$(document).ready(function(){
  $(".carousel-one").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    nav: false,
    dots: false,
    
    responsive:{
      0:{ items:1.2 },
      576:{ items:2.3 },
      768:{ items:2.8},
      1200:{ items:3.8 },
        1400:{ items:4.2  },
        1600:{ items:4.8 }
    }
    // stagePadding: 40 // use if you want partial preview
  });
});

// carousel two

 // Carousel 2
  $(".carousel-two").owlCarousel({
    loop:true,
    margin:20,
    nav:false,
    dots:false,
    autoplay:true,
    autoplayTimeout:3000,
    responsive:{
      0:{ items:1.2 },     // phone
      768:{ items:2.1 },   // tablet
      1024:{ items:3.3 },
      1200:{ items:4.3 } // laptop/desktop
    }
  });

    //  3d-slider

     var owl = $('.screenshot_slider').owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: true, // disable default nav
    margin: 0,
    arrow: true,
    autoplayTimeout: 4000,
    smartSpeed: 400,
    center: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1200: { items: 3 }
    }
  });

// Speaker name click → jump to slide + active state
$(".speaker-list li").click(function() {
  var index = $(this).data("index");

  if (index !== undefined) {
    owl.trigger("to.owl.carousel", [index, 400, true]);
  }

  $(".speaker-list li").removeClass("active");
  $(this).addClass("active");
});

// On carousel change → highlight matching speaker name
owl.on('changed.owl.carousel', function(event) {
  var currentIndex = event.item.index - event.relatedTarget._clones.length / 2;
  var count = event.item.count;

  // Fix negative index by wrapping
  if (currentIndex < 0) {
    currentIndex = count + currentIndex;
  }
  currentIndex = currentIndex % count;

  $(".speaker-list li").removeClass("active");
  $(".speaker-list li[data-index='" + currentIndex + "']").addClass("active");
});


  // Keyboard navigation
  jQuery(document.documentElement).keydown(function(event) {
    if (event.keyCode == 37) {
      owl.trigger('prev.owl.carousel', [400]); // left arrow
    } else if (event.keyCode == 39) {
      owl.trigger('next.owl.carousel', [400]); // right arrow
    }
  });

  $(".row1").owlCarousel({
  autoplay: true,
  loop: true,
  margin: 15,
  dots: false,
  slideTransition: "linear",
  autoplayTimeout: 4500,
  autoplayHoverPause: true,
  autoplaySpeed: 4500,
  rtl: false, // left to right
  responsive: {
    0: { items: 1 },
    500: { items: 2 },
    800: { items: 3 },
    1200: { items: 6 }
  }
});

$(".row2").owlCarousel({
  autoplay: true,
  loop: true,
  margin: 15,
  dots: false,
  slideTransition: "linear",
  autoplayTimeout: 4500,
  autoplayHoverPause: true,
  autoplaySpeed: 4500,
  rtl: true, // right to left
  responsive: {
    0: { items: 1 },
    500: { items: 2 },
    800: { items: 3 },
    1200: { items: 6 }
  }
});

// Hide preloader after page load
window.addEventListener("load", function() {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

    // testimonial carousel

$(document).ready(function(){
      $(".owl-testimonial").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive:{
          0:{ items:1 },
          768:{ items:1 },
          1200:{ items:1 }
        }
      });
    });


    // accordion


         $(document).ready(function() {
            // Initialize the first accordion item as active
            $('.accordion-section-title:first').addClass('active');
            $('.accordion-section-content:first').show();

            $('.accordion-section-title').on("click", function(e) {
                var currentAttrvalue = $(this).data('tab');
                
                if($(e.target).is('.active')) {
                    $(this).removeClass('active');
                    $('.accordion-section-content:visible').slideUp(300);
                } else {
                    $('.accordion-section-title').removeClass('active').filter(this).addClass('active');
                    $('.accordion-section-content').slideUp(300).filter(currentAttrvalue).slideDown(300);
                }
            });
        });

         /**
   * Init isotope layout and filters
   */
$(document).ready(function() {

    // Isotope filter
    $('.portfolio-menu ul li').click(function(){
        $('.portfolio-menu ul li').removeClass('active');
        $(this).addClass('active');
        
        var selector = $(this).attr('data-filter');
        $('.portfolio-item').isotope({
            filter: selector
        });
        return false;
    });

    // Magnific Popup (supports image + local video)
    $('.popup-btn').magnificPopup({
        gallery: {
            enabled: true
        },
        type: 'image', // default
        callbacks: {
            elementParse: function(item) {
                var src = item.el.attr('href');
                if (src.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    item.type = 'image';
                } else if (src.match(/\.(mp4|webm|ogg)$/i)) {
                    item.type = 'inline';
                    item.src = '<div class="mfp-video-container">' +
                               '<video controls autoplay style="max-width:100%;height:auto;">' +
                               '<source src="' + src + '" type="video/mp4">' +
                               'Your browser does not support the video tag.' +
                               '</video></div>';
                }
            }
        }
    });

});


