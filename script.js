window.addEventListener("load", () => {
  nameAnimation();
  addDescObservers();
  addTimelineObservers();
  laptopFlicker();
  returnToTop();
});

const nameAnimation = () => {
  const arr = document.getElementsByClassName("hovertext");
  const addClass = (index) => {
    if (index < arr.length) {
      if (index === 6) {
        removeClass(0);
      }
      arr[index].classList.add("hovering");
      setTimeout(() => {
        addClass(index + 1);
      }, 120);
    }
  };

  const removeClass = (index) => {
    if (index < arr.length) {
      arr[index].classList.remove("hovering");
      setTimeout(() => {
        removeClass(index + 1);
      }, 150);
    }
  };

  addClass(0);
};

const addDescObservers = () => {
  const elemsObj = document.getElementsByClassName("description");

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("description-bordered");
        } else {
          entry.target.classList.remove("description-bordered");
        }
      });
    },
    { threshold: 0.2, rootMargin: "-35% 0% -35% 0%" }
  );
  Object.keys(elemsObj).forEach((key) => {
    observer.observe(elemsObj[key]);
  });
};

let currentTimelineNode = null;

const addTimelineObservers = () => {
  const elemsObj = document.getElementsByClassName("timeline-step");
  elemsObj[0].classList.add("current-timeline-step");
  currentTimelineNode = elemsObj[0];

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentTimelineNode = entry.target;
          entry.target.classList.add("current-timeline-step");
        }
      });
      Object.keys(elemsObj).forEach((key) => {
        if (!elemsObj[key].isSameNode(currentTimelineNode)) {
          elemsObj[key].classList.remove("current-timeline-step");
        }
      });
    },
    { threshold: 0, rootMargin: "-35% 0% -35% 0%" }
  );
  Object.keys(elemsObj).forEach((key) => {
    observer.observe(elemsObj[key]);
  });
};

const laptopFlicker = () => {
  const elemsObj = document.querySelector("nav h1 [class*='fa-'] ");

  elemsObj.addEventListener("click", () => {
    if (elemsObj.classList.contains("header-alt-color")) {
      elemsObj.classList.remove("header-alt-color");
    } else {
      elemsObj.classList.add("header-alt-color");
    }
  });
};

const returnToTop = () => {
  const elem = document.getElementById("return-to-top");
  elem.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
};
