onload = start

async function start() {
  let body = document.body;
  let d = mDiv(body, { position: 'fixed', top: 20, left: 20, padding: 10, rounding: 4, bg: '#333', fg: 'white', z: 9999 }, 'dFlash', 'hier ist ein super message!!!');
  //animationChain1(d)
  Session.type = detectSessionType(); // console.log('session type:',Session.type);
  document.title = capitalize(Session.type);

  // Example usage
  const element = d; //document.querySelector('.animated-element');
  const animationList = [
    { propertyName: 'background', endValue: 'red', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-in-out' },
    { propertyName: 'opacity', endValue: 0.5, duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-in-out' },
    { propertyName: 'transform', endValue: 'translateX(100px)', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
    { propertyName: 'transform', endValue: 'translateX(0px)', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
    // { propertyName: 'border-radius', endValue: '100px', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
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
function animateZugleich(element, animationList) {
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
function animateChain(element, animationList, index = 0) {
  if (index >= animationList.length) {
    // All animations completed, perform another action or callback
    console.log('All animations completed!');
    return;
  }

  const anim = animationList[index];
  const keyframes = [{ [anim.propertyName]: getComputedStyle(element)[anim.propertyName] }, anim];
  const animationOptions = {
    duration: 1000, // Animation duration in milliseconds
    fill: 'forwards' // Retain the final animation state
  };

  const animationPromise = element.animate(keyframes, animationOptions).finished;

  // Chain the next animation after the current one finishes
  animationPromise.then(() => {
    animateChain(element, animationList, index + 1);
  }).catch((error) => {
    console.error('An error occurred:', error);
  });
}

// Function to animate properties using Element.animate()
function animateChain(element, animationList, index = 0) {
  if (index >= animationList.length) {
    // All animations completed, perform another action or callback
    console.log('All animations completed!');
    return;
  }

  const anim = animationList[index];
  const initialPropertyValue = getComputedStyle(element)[anim.propertyName];
  const keyframes = [{ [anim.propertyName]: initialPropertyValue }, { [anim.propertyName]: anim.endValue }];
  const animationOptions = {
    duration: anim.duration, // Animation duration in milliseconds
    delay: anim.delay || 0, // Animation delay in milliseconds
    fill: anim.fill || 'forwards', // Fill mode
    easing: anim.easing || 'linear' // Easing function
  };

  const animationPromise = element.animate(keyframes, animationOptions).finished;

  // Chain the next animation after the current one finishes
  animationPromise.then(() => {
    console.log('done',animationList[index].propertyName)
    animateChain(element, animationList, index + 1);
  }).catch((error) => {
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