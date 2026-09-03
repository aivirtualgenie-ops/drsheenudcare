document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const intro =
    document.getElementById("intro");

  const menuButton =
    document.querySelector(".menu-button");

  const navigation =
    document.querySelector(".navigation");


  /* =====================================================
     INTRO
     ===================================================== */

  const finishIntro = () => {

    if (!intro) {

      body.classList.remove("loading");

      return;

    }

    intro.classList.add("finished");

    body.classList.remove("loading");

    setTimeout(() => {

      intro.style.display = "none";

    }, 1200);

  };


  if (intro) {

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      finishIntro();

    } else {

      setTimeout(
        finishIntro,
        3000
      );

    }

  } else {

    body.classList.remove("loading");

  }


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  if (menuButton && navigation) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navigation.classList.toggle("open");

        menuButton.classList.toggle(
          "active",
          isOpen
        );

        menuButton.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );

      }
    );


    navigation
      .querySelectorAll("a")
      .forEach(link => {

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

      });

  }


  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  const revealElements =
    document.querySelectorAll(
      "[data-reveal], [data-stagger]"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(
      element => observer.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add("visible")
    );

  }


  /* =====================================================
     HERO VIDEO
     ===================================================== */

  const heroVideo =
    document.querySelector(
      ".hero-video video"
    );


  if (heroVideo) {

    const playVideo = () => {

      const promise =
        heroVideo.play();

      if (promise !== undefined) {

        promise.catch(() => {});

      }

    };


    if (
      heroVideo.readyState >= 2
    ) {

      playVideo();

    } else {

      heroVideo.addEventListener(
        "loadeddata",
        playVideo,
        { once: true }
      );

    }

  }


  /* =====================================================
     CLINIC VIDEO
     ===================================================== */

  const clinicVideo =
    document.querySelector(
      ".clinic-video-section video"
    );


  if (clinicVideo) {

    const playClinicVideo = () => {

      const promise =
        clinicVideo.play();

      if (promise !== undefined) {

        promise.catch(() => {});

      }

    };


    if (
      clinicVideo.readyState >= 2
    ) {

      playClinicVideo();

    } else {

      clinicVideo.addEventListener(
        "loadeddata",
        playClinicVideo,
        { once: true }
      );

    }

  }


  /* =====================================================
     YEAR
     ===================================================== */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     SMOOTH ANCHORS
     ===================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =====================================================
     DR. SHEENU PORTRAIT
     ===================================================== */

  const portrait =
    document.querySelector(
      ".doctor-portrait img"
    );


  if (portrait) {

    if (portrait.complete) {

      portrait.classList.add(
        "loaded"
      );

    } else {

      portrait.addEventListener(
        "load",
        () => {

          portrait.classList.add(
            "loaded"
          );

        },
        { once: true }
      );

    }

  }


  /* =====================================================
     PAGE READY
     ===================================================== */

  setTimeout(() => {

    body.classList.add(
      "page-ready"
    );

  }, 50);

});
