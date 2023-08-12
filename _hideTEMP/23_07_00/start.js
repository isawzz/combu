onload = start

async function start() {
  let body = document.body;
  let d = mDiv(body, { position: 'fixed', top: 20, left: 20, padding: 10, rounding: 4, bg: '#333', fg: 'white', z: 9999 }, 'dFlash', 'hier ist ein super message!!!');
  //animationChain1(d)


  // Example usage
  const element = d; //document.querySelector('.animated-element');
  const animationList = [
    { propertyName: 'opacity', opacity: 1 },
    { propertyName: 'transform', transform: 'translateX(100px)' },
    { propertyName: 'opacity', opacity: 0 }
  ];

  animateChain(element, animationList);

}

function animationChain1(elem) {
  const element = toElem(elem);

  // Define animation properties
  const fadeInKeyframes = [
    { opacity: 0 },
    { opacity: 1 }
  ];

  const fadeOutKeyframes = [
    { opacity: 1 },
    { opacity: 0 }
  ];

  const animationOptions = {
    duration: 1000, // Animation duration in milliseconds
    fill: 'forwards' // Retain the final animation state
  };

  // Chain animations using .then()
  element.animate(fadeInKeyframes, animationOptions)
    .finished
    .then(() => {
      // Animation 1 (fadeIn) finished, start Animation 2 (fadeOut)
      return element.animate(fadeOutKeyframes, animationOptions).finished;
    })
    .then(() => {
      // Animation 2 (fadeOut) finished, perform another action
      console.log('All animations completed!');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });

}
function animateChain(element, animationList) {
  const animationPromises = [];

  // Create animation promises for each property in the list
  for (const anim of animationList) {
    const keyframes = [{ [anim.propertyName]: getComputedStyle(element)[anim.propertyName] }, anim];
    const animationOptions = {
      duration: 2000, // Animation duration in milliseconds
      fill: 'forwards' // Retain the final animation state
    };

    const animationPromise = element.animate(keyframes, animationOptions).finished;
    animationPromises.push(animationPromise);
  }

  // Chain animations using .then()
  Promise.all(animationPromises)
    .then(() => {
      // All animations completed, perform another action or callback
      console.log('All animations completed!');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}


function mist() {
  var ms = 2000;
  setTimeout(() => {
    var d = mBy('dFlash');
    d.classList.remove('fade-in');
    setTimeout(() => {
      var d = mBy('dFlash');
      d.classList.add('fade-out');
    }, ms); // Match the animation duration
  }, ms); // Delay in milliseconds

  console.log(d)


}