document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Sequence Scroll Animation (Pinned)
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-sequence",
            start: "top top",
            end: "+=3000", // Scrubs over 3000px of scrolling down
            scrub: 1, // Smooth scrubbing
            pin: true, // Pin the section while timeline plays
        }
    });

    // Animate image zooming slowly
    heroTl.to(".hero-img", { scale: 1.2, transformOrigin: 'center center', duration: 12 }, 0);
    
    // Fade out main title early
    heroTl.to(".main-title-box", { opacity: 0, y: -50, duration: 2 }, 0);

    // Fade in and out Feature 1
    heroTl.to(".feature-1", { opacity: 1, y: 0, duration: 1.5 }, 2)
          .to(".feature-1", { opacity: 0, y: -50, duration: 1.5 }, 4.5);

    // Fade in and out Feature 2
    heroTl.to(".feature-2", { opacity: 1, y: 0, duration: 1.5 }, 5.5)
          .to(".feature-2", { opacity: 0, y: -50, duration: 1.5 }, 8);

    // Fade in Feature 3 (stays visible until end of scrub)
    heroTl.to(".feature-3", { opacity: 1, y: 0, duration: 1.5 }, 9)
          .to(".feature-3", { opacity: 0, y: -50, duration: 1.5 }, 11.5);

    // 5. Instagram Frame Fade-in
    const igItems = document.querySelectorAll('.ig-item');
    
    igItems.forEach(item => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Triggers when top of item hits 85% from top of viewport
                toggleActions: "play none none reverse"
            }
        });
    });

    // 6. Smooth Scroll for Anchor Links via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, {
                        offset: -80 // Offset for fixed header
                    });
                }
            }
        });
    });
});
