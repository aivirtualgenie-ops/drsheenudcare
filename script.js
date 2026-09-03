(() => {

  /* =========================================================
     YEAR
  ========================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.classList.toggle("active", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================================
     PREMIUM LOGO INTRO
  ========================================================= */

  const loader = document.querySelector(".site-loader");

  const finishLoader = () => {

    if (!loader) return;

    loader.classList.add("is-done");

    document.body.classList.remove("is-loading");

    setTimeout(() => {

      loader.remove();

    }, 1200);

  };


  /*
    Wait for the page to load.

    The logo animation gets enough time to play,
    but we don't leave somebody staring at it forever.
  */

  window.addEventListener(
    "load",
    () => {

      setTimeout(
        finishLoader,
        2400
      );

    },
    { once:true }
  );


  /*
    Safety fallback for slower devices.
  */

  setTimeout(
    finishLoader,
    4500
  );


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealItems =
    document.querySelectorAll("[data-reveal]");

  const staggerItems =
    document.querySelectorAll("[data-stagger]");


  if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    const observer =
      new IntersectionObserver(

        (entries, obs) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              obs.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold:.12,

          rootMargin:
            "0px 0px -60px 0px"
        }

      );


    revealItems.forEach(item => {

      observer.observe(item);

    });


    staggerItems.forEach(item => {

      observer.observe(item);

    });

  }

  else {

    revealItems.forEach(item => {

      item.classList.add(
        "is-visible"
      );

    });


    staggerItems.forEach(item => {

      item.classList.add(
        "is-visible"
      );

    });

  }


  /* =========================================================
     HERO VIDEO PARALLAX
  ========================================================= */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const heroMedia =
    document.querySelector(".hero-media");


  if (
    heroMedia &&
    !reduceMotion
  ) {

    let ticking = false;


    const updateParallax = () => {

      if (
        window.innerWidth < 900
      ) {

        heroMedia.style.transform =
          "";

        ticking = false;

        return;

      }


      const rect =
        heroMedia.getBoundingClientRect();


      const viewportCenter =
        window.innerHeight / 2;

      const elementCenter =
        rect.top + rect.height / 2;


      const distance =
        viewportCenter - elementCenter;


      const shift =
        Math.max(
          -12,
          Math.min(
            12,
            distance * .018
          )
        );


      heroMedia.style.transform =
        `translateY(${shift}px)`;


      ticking = false;

    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateParallax
          );

          ticking = true;

        }

      },
      { passive:true }
    );

  }


  /* =========================================================
     SMOOTH ACTIVE NAV FEEL
  ========================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a[href^='#']"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;


            navLinks.forEach(link => {

              link.classList.remove(
                "active-link"
              );

              if (
                link.getAttribute("href") ===
                "#" + entry.target.id
              ) {

                link.classList.add(
                  "active-link"
                );

              }

            });

          });

        },

        {
          threshold:.35
        }

      );


    sections.forEach(section => {

      navObserver.observe(section);

    });

  }


  /* =========================================================
     MAGNETIC BUTTON FEEL
  ========================================================= */

  if (
    !reduceMotion &&
    window.innerWidth > 900
  ) {

    document
      .querySelectorAll(
        ".button.primary, .nav-cta"
      )
      .forEach(button => {

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
              `translate(${x * .08}px, ${y * .08}px)`;

          }
        );


        button.addEventListener(
          "mouseleave",
          () => {

            button.style.transform =
              "";

          }
        );

      });

  }

})();
