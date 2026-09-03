document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     YEAR
  ====================================================== */

  const year =
    document.getElementById("year");

  if(year){

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     CINEMATIC INTRO
  ====================================================== */

  const intro =
    document.getElementById("intro");


  let introFinished = false;


  function finishIntro(){

    if(
      !intro ||
      introFinished
    ){
      return;
    }


    introFinished = true;


    intro.classList.add(
      "finished"
    );


    document.body.classList.remove(
      "loading"
    );


    setTimeout(
      () => {

        if(intro){

          intro.remove();

        }

      },
      1100
    );

  }


  /*
    Wait until the page has loaded,
    then allow the logo reveal to finish.
  */

  window.addEventListener(
    "load",
    () => {

      setTimeout(
        finishIntro,
        2450
      );

    },
    {
      once:true
    }
  );


  /*
    Safety fallback for slow connections.
  */

  setTimeout(
    finishIntro,
    4300
  );


  /* =====================================================
     MOBILE NAVIGATION
  ====================================================== */

  const menuButton =
    document.querySelector(
      ".menu-button"
    );


  const navigation =
    document.querySelector(
      ".navigation"
    );


  if(
    menuButton &&
    navigation
  ){

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navigation.classList.toggle(
            "open"
          );


        menuButton.classList.toggle(
          "active",
          isOpen
        );


        menuButton.setAttribute(
          "aria-expanded",
          isOpen
            ? "true"
            : "false"
        );

      }
    );


    navigation
      .querySelectorAll("a")
      .forEach(
        link => {

          link.addEventListener(
            "click",
            () => {

              navigation.classList.remove(
                "open"
              );


              menuButton.classList.remove(
                "active"
              );


              menuButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }
          );

        }
      );

  }


  /* =====================================================
     SCROLL REVEALS
  ====================================================== */

  const revealElements =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const staggerElements =
    document.querySelectorAll(
      "[data-stagger]"
    );


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if(
    "IntersectionObserver" in window &&
    !reduceMotion
  ){

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if(
                entry.isIntersecting
              ){

                entry.target.classList.add(
                  "visible"
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold:.12,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );


    staggerElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );

  }
  else{

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );


    staggerElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =====================================================
     HERO VIDEO PARALLAX
  ====================================================== */

  const heroVideo =
    document.querySelector(
      ".hero-video"
    );


  if(
    heroVideo &&
    !reduceMotion
  ){

    let ticking = false;


    function updateParallax(){

      if(
        window.innerWidth <= 950
      ){

        heroVideo.style.transform =
          "";

        ticking = false;

        return;

      }


      const rect =
        heroVideo.getBoundingClientRect();


      const viewportCenter =
        window.innerHeight / 2;


      const elementCenter =
        rect.top +
        rect.height / 2;


      const distance =
        viewportCenter -
        elementCenter;


      const movement =
        Math.max(
          -10,
          Math.min(
            10,
            distance * .018
          )
        );


      heroVideo.style.transform =
        `translateY(${movement}px)`;


      ticking = false;

    }


    window.addEventListener(
      "scroll",
      () => {

        if(!ticking){

          requestAnimationFrame(
            updateParallax
          );

          ticking = true;

        }

      },
      {
        passive:true
      }
    );

  }


  /* =====================================================
     DESKTOP BUTTON MAGNETIC EFFECT
  ====================================================== */

  if(
    !reduceMotion &&
    window.innerWidth > 950
  ){

    document
      .querySelectorAll(
        ".button-primary, .nav-appointment"
      )
      .forEach(
        button => {

          button.addEventListener(
            "mousemove",
            event => {

              const rect =
                button.getBoundingClientRect();


              const x =
                event.clientX -
                rect.left -
                rect.width / 2;


              const y =
                event.clientY -
                rect.top -
                rect.height / 2;


              button.style.transform =
                `translate(
                  ${x * .07}px,
                  ${y * .07}px
                )`;

            }
          );


          button.addEventListener(
            "mouseleave",
            () => {

              button.style.transform =
                "";

            }
          );

        }
      );

  }

});
