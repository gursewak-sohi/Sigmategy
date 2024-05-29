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
                    spaceBetween: 38,
                }
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
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
 

    // if (!smWidth) {
    //     ScrollSmoother.create({
    //         smooth: 0.5, 
    //         effects: false, 
    //     });
    // }

     
        

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

        // SVG underline animation
        const animateUnderline = document.querySelectorAll('.text-underline svg path');
        animateUnderline.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            ScrollTrigger.create({
                trigger: path.closest('.text-underline'),
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.to(path, {
                        strokeDashoffset: 0,
                        duration: 2,
                        ease: "power1.out"
                    });
                },
                once: false
            });
        });

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


         // Get the path element
         const path = document.querySelector(".line svg path");

         // Set the initial state of the path for the drawing effect
         gsap.set(path, {
            //  strokeDasharray: path.getTotalLength(),
             strokeDashoffset: path.getTotalLength()
         });
 
         // Create the animation
         gsap.to(path, {
             strokeDashoffset: 0,
             duration: 3,
             ease: "none",
             scrollTrigger: {
                 trigger: ".line",
                 start: "top 80%",
                 end: "bottom 20%",
                 scrub: true
             }
         });


    }


    // Button bubble effect
    document.querySelectorAll('.btn-primary').forEach(button => {
        const updateBubbleSize = () => {
            const width = button.offsetWidth;
            const bubbleSize = width * 3;
            button.style.setProperty('--bubble-size', `${bubbleSize}px`);
        };

        button.addEventListener('mouseenter', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
            updateBubbleSize();
        });

        button.addEventListener('mouseleave', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
            // Reset the transform on mouse leave to ensure the circle contracts
            setTimeout(() => {
                button.style.setProperty('--x', `50%`);
                button.style.setProperty('--y', `50%`);
            }, 500);  
        });

        // Initial update
        updateBubbleSize();
    });
    

     
 

  

})();