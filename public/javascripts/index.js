const variants = [
  {
    w1: {
      text: "medical patients",
      msize: "338px",
      dsize: "547px",
    },
    w2: {
      text: "identity thieves",
      msize: "308px",
      dsize: "498px",
    },
  },
  {
    w1: {
      text: "employees",
      msize: "220px",
      dsize: "351px",
    },
    w2: {
      text: "bad actors",
      msize: "231px",
      dsize: "369px",
    },
  },
  {
    w1: {
      text: "developers",
      msize: "230px",
      dsize: "368px",
    },
    w2: {
      text: "attackers",
      msize: "201px",
      dsize: "318px",
    },
  },
  {
    w1: {
      text: "everyone",
      msize: "194px",
      dsize: "307px",
    },
    w2: {
      text: "just anyone",
      msize: "242px",
      dsize: "387px",
    },
  },
  {
    w1: {
      text: "online shoppers",
      msize: "329px",
      dsize: "533px",
    },
    w2: {
      text: "scammmers",
      msize: "250px",
      dsize: "400px",
    },
  },
];

const loginScreens = [
  {
    img: "/images/home/WeTransfer.png",
  },
  {
    img: "/images/home/Toast.png",
  },
  {
    img: "/images/home/Pfizer.png",
  },
  {
    img: "/images/home/Zoom.png",
  },
];
const gradientword1 = document.getElementById("gradientword-1");
const gradientword2 = document.getElementById("gradientword-2");

const loginBoxesContainer = document.getElementById("loginboxes-container");

document.addEventListener("DOMContentLoaded", function () {
  var initialWidth1 = gradientword1.offsetWidth + "px";
  var initialWidth2 = gradientword2.offsetWidth + "px";

  gradientword1.style.width = initialWidth1;
  gradientword2.style.width = initialWidth2;
  // loginBoxesContainer.style.transform = "translateX(50px)";

  var counter = 0;

  setInterval(async () => {
    await runGradientTextAnimation(initialWidth1, initialWidth2, counter);
    counter = ++counter % 5;
  }, 6000);

  var boxSlideCnt = 1;
  setInterval(() => {
    runLoginBoxesAnimation(boxSlideCnt);
    boxSlideCnt = ++boxSlideCnt % 4;
  }, 4000);
});

////---------------------------------------------
//// **** main ****
async function runGradientTextAnimation(iw1, iw2, counter) {
  let isMobileView = false;
  if (window.innerWidth < 1020) isMobileView = true;

  gradientword1.appendChild(
    creategradientSpan(variants[counter].w1.text, "slide-enter-active", 1)
  );

  gradientword2.appendChild(
    creategradientSpan(variants[counter].w2.text, "slide-enter-active", 2)
  );

  gradientword1.style.width = isMobileView
    ? variants[counter].w1.msize
    : variants[counter].w1.dsize;

  gradientword2.style.width = isMobileView
    ? variants[counter].w2.msize
    : variants[counter].w2.dsize;

  gradientword1.children[0].classList.add("slide-exit-active");
  gradientword2.children[0].classList.add("slide-exit-active");

  setTimeout(() => {
    gradientword1.children[1].classList.remove("slide-enter-active");
    gradientword2.children[1].classList.remove("slide-enter-active");
    gradientword1.removeChild(gradientword1.children[0]);
    gradientword2.removeChild(gradientword2.children[0]);
  }, 2000);
}

function creategradientSpan(word, anime, option) {
  let wrapper = document.createElement("span");
  wrapper.innerHTML = word;

  if (option == 1) {
    wrapper.classList.add(
      anime,
      "inline-block",
      "bg-gradient-to-r",
      "from-indigo-600",
      "to-amber-200",
      "bg-clip-text",
      "text-transparent"
    );
  } else {
    wrapper.classList.add(
      anime,
      "inline-block",
      "bg-gradient-to-r",
      "from-indigo-500",
      "to-teal-300",
      "bg-clip-text",
      "text-transparent"
    );
  }

  return wrapper;
}

function runLoginBoxesAnimation(boxSlideCnt) {
  let slidePercent;

  if (boxSlideCnt === 0) slidePercent = 0 + "%";
  else slidePercent = -1 * boxSlideCnt * 100 + "%";

  loginBoxesContainer.style.transform = `translateX(${slidePercent})`;
}
