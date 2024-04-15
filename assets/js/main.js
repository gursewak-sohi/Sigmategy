(function () {

    // JS loaded
    let body = document.body;
    body
        .classList
        .add('js-loaded');

    let smWidth;
    screen.width < 992
        ? smWidth = true
        : smWidth = false;

    // Viewport Height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });


    // Toggle Menu
    const toggleMenu = (toggleID, toggleNav) => {
        let toggleLink = document.querySelector(toggleID),
            toggleItem = document.querySelector(toggleNav),
            headerLinks = document.querySelectorAll("#toggleNav a"),
            root = document.getElementsByTagName('html')[0];
        headerLinks.forEach(link => {
            link.onclick = (e) => {
                root
                    .classList
                    .remove('hide-scroll');
                toggleItem
                    .classList
                    .remove("active");
            }
        });
        if (toggleLink && toggleItem) {
            toggleLink.onclick = () => {
                if (toggleItem.classList.contains('active')) {
                    root
                        .classList
                        .remove('hide-scroll');
                    toggleItem
                        .classList
                        .remove("active");
                } else {
                    root
                        .classList
                        .add('hide-scroll');
                    toggleItem
                        .classList
                        .add("active");
                }
            }
        }
    }
    toggleMenu('#toggleBtn', '#toggleNav');

    // Show Tabs
    const showTabs = (tabLinkID, tabContentID) => {
        let tabLinks = document.querySelectorAll(tabLinkID),
            tabContent = document.querySelectorAll(tabContentID);

        if (tabLinks && tabContent) {
            const openTabs = el => {
                let selectedLink = el.currentTarget.classList,
                    showId = el.currentTarget.dataset.tab;

                tabLinks.forEach(el => {
                    el
                        .classList
                        .remove("active");
                });
                tabContent.forEach(el => {
                    el
                        .classList
                        .remove("active");
                });
                selectedLink.add("active");
                document
                    .querySelector("#" + showId)
                    .classList
                    .add("active");
            }
            tabLinks.forEach(el => {
                el.addEventListener("click", openTabs);
            });
        }
    }
    showTabs('[data-tab]', '.tab-content');
 

 

    

    // Clients  Swiper
    const clientSwiper = document.querySelectorAll('[data-swiper="clientSwiper"]');
    clientSwiper.forEach((swiperElement) => {
        const swiper = new Swiper(swiperElement.querySelector('.swiper'), {
            slidesPerView: 1,
            spaceBetween: 30,
            grabCursor: true,
            navigation: {
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 48,
                }
            },
        });
    });


    // Case  Swiper
    const caseSwiper = document.querySelectorAll('[data-swiper="caseSwiper"]');
    caseSwiper.forEach((swiperElement) => {
        const swiper = new Swiper(swiperElement.querySelector('.swiper'), {
            slidesPerView: 1,
            spaceBetween: 48,
            grabCursor: true,
            navigation: {
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev'),
            },
        });
    });

  

    
    // // Show Collapse with Wrapper JS
   
    const showCollapseFunc = (collapseLinkID, collapseContentID, wrapperID) => {
        let collapseLinks = document.querySelectorAll(collapseLinkID),
            collapseContent = document.querySelectorAll(collapseContentID);

        if (collapseLinks && collapseContent && wrapperID) {
            const openCollapse = el => {
                let selectedLink = el.currentTarget,
                    showId = el.currentTarget.dataset.collapse,
                    currentCollapse = document.querySelector("#" + showId),
                    wrapperLinks = selectedLink
                        .closest(wrapperID)
                        .querySelectorAll(collapseLinkID),
                    wrapperCollpase = currentCollapse
                        .closest(wrapperID)
                        .querySelectorAll(collapseContentID);

                if (selectedLink.classList.contains('active')) {
                    selectedLink
                        .classList
                        .remove("active");
                    currentCollapse.style.height = '0px';
                    currentCollapse
                        .classList
                        .remove('active');
                } else {
                    wrapperLinks.forEach(el => {
                        el
                            .classList
                            .remove("active");
                    });

                    wrapperCollpase.forEach(el => {
                        el
                            .classList
                            .remove("active");
                        el.style.height = "0px";
                    });
                    selectedLink
                        .classList
                        .add("active");
                    currentCollapse.style.height = currentCollapse.scrollHeight + "px";
                    currentCollapse
                        .classList
                        .add('active');
                }
            }
            collapseLinks.forEach(el => {
                el.addEventListener("click", openCollapse);
            });
        }
    }
    showCollapseFunc('[data-collapse]', '.collapse', '[data-parent="collapse"]');

  

    // gsap animations
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin);
 

    if (!smWidth) {
        ScrollSmoother.create({
            smooth: 0.5, 
            effects: true, 
        });
    }

        const dynamicWord = document.querySelector('[data-text]');
        if (dynamicWord) {
            const words = ["results", "solutions", "success"];  
            let wordIndex = 0;
            
            function deleteAndType(nextWord) {
                let currentText = dynamicWord.textContent;
                if (currentText.length > 0) {
                    gsap.to(dynamicWord, {
                        duration: 0.5 / currentText.length,  
                        text: currentText.slice(0, -1), 
                        ease: "none",
                        onComplete: () => deleteAndType(nextWord)  
                    });
                } else {
                    gsap.to(dynamicWord, {
                        duration: 1,
                        text: nextWord,
                        ease: "none",
                        onComplete: () => {
                            if (wordIndex < words.length) {
                                gsap.delayedCall(0.5, typeAndSwitch);
                            }
                            else {
                                dynamicWord.classList.add('fade-out-cursor');
                            }
                        }
                    });
                }
            }


            function typeAndSwitch() {
                if (wordIndex < words.length) {
                    let nextWord = words[wordIndex % words.length];
                    wordIndex++;
                    deleteAndType(nextWord);
                }
            }

            typeAndSwitch(); 
        }
        

    // Scroll To function
    const navLinks = document.querySelectorAll("[data-scroll]");
    if (navLinks.length > 0) {
        navLinks.forEach(navLink => {
            navLink.addEventListener("click", event => {
                event.preventDefault();
                const scrollToId = event.currentTarget.dataset.scroll;
                gsap.to(window, {
                    duration: 1,
                    scrollTo: `#${scrollToId}`,
                    ease: "Expo.easeInOut"
                });
            });
        });
    }

    

    startGsapAnimation();

    function startGsapAnimation() {
        // Animation Slide up
        const animationUp = document.querySelectorAll('.animate-up');
        if (animationUp) {
            // gsap.set(animationUp, { y: -100, autoAlpha: 0 });
            ScrollTrigger.batch(".animate-up", {
                onEnter: elements => {
                    gsap.to(elements, {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.12
                    });
                },
                once: false
            });
        }

        // Animation Slide Down
        const animateDown = document.querySelectorAll('.animate-down');
        if (animateDown) {
            // gsap.set(animationUp, { y: -100, autoAlpha: 0 });
            ScrollTrigger.batch(".animate-down", {
                onEnter: elements => {
                    gsap.to(elements, {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.12
                    });
                },
                once: false
            });
        }

        // Animation Zoom Out-In
        const animateZoom = document.querySelectorAll('.animate-zoom');
        if (animateZoom.length) {
            ScrollTrigger.batch(".animate-zoom", {
                onEnter: elements => {
                    gsap.fromTo(elements, 
                        {
                            scale: 1.2,  
                        }, 
                        {
                            scale: 1, 
                            stagger: 0.12,  
                            duration: 0.7,  
                            ease: "Expo.easeOut", 
                            delay: 0.8 
                        }
                    );
                },
                once: false 
            });
        }


         // Animation Slide Right
         const animateRight = document.querySelectorAll('.animate-right');
         if (animateRight) {
             // gsap.set(animationUp, { y: -100, autoAlpha: 0 });
             ScrollTrigger.batch(".animate-right", {
                 onEnter: elements => {
                     gsap.to(elements, {
                         autoAlpha: 1,
                         x: 0,
                         stagger: 0.12,
                     });
                 },
                 once: false
             });
         }


        const animationFadeInOut = document.querySelectorAll('.animate-fadeInOut');
        if (animationFadeInOut) {
            gsap.registerPlugin(ScrollTrigger);
            animationFadeInOut.forEach(section => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center bottom",  
                        end: "bottom top",   
                        scrub: true,       
                        markers: false      
                    }
                });
                tl.fromTo(section, { autoAlpha: 0,  duration: 0.5 }, { autoAlpha: 1,  duration: 0.5 }).to(section, { autoAlpha: 0,  duration: 0.5 });
            });
        }

        const dots = document.querySelectorAll('.lines svg path'); // Select all the dots
        if (dots.length > 0) {
            // Function to randomly change the color of a dot
            const animateDotColor = (dot) => {
                // Array of colors including the new ones
                const colors = ['#CDCFD0', '#2185B2', '#d94428', '#f68621'];
                
                // Randomly select a color from the array
                const targetColor = colors[Math.floor(Math.random() * colors.length)];
        
                // Animate the color change
                gsap.to(dot, {
                    fill: targetColor,
                    duration: 0.5 + Math.random() * 1, 
                    onComplete: () => animateDotColor(dot), // Recursively call to create a continuous loop
                });
            };
        
            dots.forEach(dot => {
                animateDotColor(dot); // Initialize the animation for each dot
            });
        }

        let banner = document.querySelector(".banner-section");
        if (banner) {
            gsap.set('.banner-section .image .curve', { opacity: 0 });
            gsap.set('.banner-section .image .person', {transformOrigin: "50% 100%",opacity: 0,  scale: 0.9 });
            gsap.set('.banner-section .image .item-1', { scale: 0.8, opacity: 0 });
            gsap.set('.banner-section .image .item-2', { scale: 0.8, opacity: 0 });
            gsap.set('.banner-section .image .item-3', { scale: 0.8, opacity: 0 });
            gsap.set('.banner-section .image .item-4', { scale: 0.8, opacity: 0 });
            gsap.set('.banner-section .image .lines', { x: 100, opacity: 0 });
            
            let bannerTL = gsap.timeline();
            bannerTL.to(".banner-section .image .curve", { opacity: 1,  duration: 1.4, ease: "Expo.easeInOut" }, 0)
            .to(".banner-section .image .person", { scale: 1, opacity: 1, duration: 1, ease: "Expo.easeInOut" }, 0.4)
            .to(".banner-section .image .item-1", { scale: 1.2, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 1.3)
            .to(".banner-section .image .item-1", { scale: 1, duration: 0.7, ease: "Expo.easeOut" }, ">")
            .to(".banner-section .image .item-2", { scale: 1.2, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 1.6)
            .to(".banner-section .image .item-2", { scale: 1, duration: 0.7, ease: "Expo.easeOut" }, ">")
            .to(".banner-section .image .item-3", { scale: 1.2, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 1.8)
            .to(".banner-section .image .item-3", { scale: 1, duration: 0.7, ease: "Expo.easeOut" }, ">")
            .to(".banner-section .image .item-4", { scale: 1.2, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 2)
            .to(".banner-section .image .item-4", { scale: 1, duration: 0.7, ease: "Expo.easeOut" }, ">")
            .to(".banner-section .image .lines", { x: 0, opacity: 1, duration: 3, ease: "Expo.easeInOut" }, 0.5);
        }

        let industry = document.querySelector(".industry-section");
        if (industry) {
            gsap.set('.industry-section .image .curve', { opacity: 0 });
            gsap.set('.industry-section .image .person', {transformOrigin: "50% 100%",opacity: 0,  scale: 0.9 });
            gsap.set('.industry-section .image .item-plus', { scale: 0.8, opacity: 0 });
            gsap.set('.industry-section .image .item-heart', { scale: 0.8, opacity: 0 });
            gsap.set('.industry-section .image .lines', { x: 100, opacity: 0 });
            
            let industryTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".industry-section",
                    start: "top center", // Adjust this value based on when you want the animation to start
                    end: "bottom top",
                    toggleActions: "play none none none", // This means the animation will play when the trigger is passed, and do nothing on scroll back
                    once: true, // Optional: Set to true if the animation should only occur once
                }
            });

            
            industryTL.to(".industry-section .image .curve", { opacity: 1,  duration: 1.4, ease: "Expo.easeInOut" }, 0)
            .to(".industry-section .image .person", { scale: 1, opacity: 1, duration: 1, ease: "Expo.easeInOut" }, 0.3)
            .to(".industry-section .image .item-plus", { scale: 1.4, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 1)
            .to(".industry-section .image .item-plus", { scale: 1, duration: 0.5, ease: "Expo.easeOut" }, ">")
            .to(".industry-section .image .item-heart", { scale: 1.4, opacity: 1, duration: 0.7, ease: "Expo.easeInOut" }, 1)
            .to(".industry-section .image .item-heart", { scale: 1, duration: 0.7, ease: "Expo.easeOut" }, ">")
            .to(".industry-section .image .lines", { x: 0, opacity: 1, duration: 3, ease: "Expo.easeInOut" }, 1);
        }


        const moveRandomly = (element) => {
            const generateMovement = () => Math.random() * 30 - 15; 
            const newX = "+=" + generateMovement();
            const newY = "+=" + generateMovement();
        
            gsap.to(element, {
                x: newX,
                y: newY,
                duration: 1, 
                ease: "none",
                onComplete: () => moveRandomly(element) 
            });
        };
            
            document.querySelectorAll('.moving-item').forEach(item => {
                moveRandomly(item);  
            });
        }

        const moveRandomlySlow = (element) => {
            // Decrease the maximum distance of movement to reduce the area
            const generateMovement = () => Math.random() * 20 - 10; // Reduced from 30 - 15 to 20 - 10
            const newX = "+=" + generateMovement();
            const newY = "+=" + generateMovement();
        
            // Increase the duration to slow down the movement
            gsap.to(element, {
                x: newX,
                y: newY,
                duration: 2, // Increased from 1 to 2 seconds
                ease: "none",
                onComplete: () => moveRandomlySlow(element) 
            });
        };
        
        document.querySelectorAll('.moving-item-slow').forEach(item => {
            moveRandomlySlow(item);  
        });

    const gapAnimateCount = (count) => {
        var zero = { val: 0 },
            num = parseFloat(count.getAttribute('data-number')),
            split = (num + "").split("."),
            decimals = split.length > 1 ? split[1].length : 0;
    
      
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: count,
                start: "top bottom",  
                end: "bottom top",
                toggleActions: "restart pause resume pause",
                onEnter: () => { tl.restart(); },
                onLeaveBack: () => { tl.restart(); },
                markers: false,  
            },
            defaults: { duration: 6, ease: "Power4.out" },  
        });
    
        tl.to(zero, {
            val: num,
            onUpdate: function() {
                let updatedCount = zero.val.toFixed(decimals);
                count.innerHTML = updatedCount;
            }
        });
    }
    
    // Counter animation
    let counts = document.querySelectorAll(".counts");
    counts.forEach(count => {
        gapAnimateCount(count);
    });
    

     
 

  

})();