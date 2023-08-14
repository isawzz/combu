onload = start
// live nodejs flask php
async function start() {
  //#region done
  Session.type = detectSessionType(); console.log('session type:', Session.type);
  Session.basedir = '../base/';
  document.title = capitalize(Session.type);

  // test0_flash_ani(); 
  // http GET: test1_simple_live_GET(); test1_simple_node_GET(); test1_simple_flask_GET(); test1_simple_php_GET(); test1_simple_telecave_GET() //geht solange der php echo NEIN sagt!
  //#endregion
  // http POST: live: cannot do post with live-server!
  //test1_simple_node_POST();
}

async function test1_simple_node_POST() {
  // simplest nodejs test for GET: genau wie live!
  // function post_json(url, o, callback) {
  //post_json('http://localhost:3000/db/add/code', code, r => console.log('resp', r));
  let o = {key:'key',value:23};
  let route = 'post';
  let loc = window.location.href;
  let callback=x=>console.log(typeof x,x)
  Session.port = loc.includes(':')?stringAfter(loc,':'):'80';
  let url = 'http://localhost:4001/post'; //loc+'/'+route;
  console.log('post to',url)
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(o)
  }).then(response => response.json()).then(response => callback(response));

  let result = await fetch('../base/DB.yaml').then(x => x.text());
  result = jsyaml.load(result);
  console.log('result', result)
}

//#region GET
async function test1_simple_telecave_GET() {
  // simplest telecave test for GET: genau wie live! GEHT DOCH!!!!!!!!!!!!
  let result = await fetch('../common/api.php').then(x => x.text());
  //result = jsyaml.load(result);
  console.log('result text', result)
}
async function test1_simple_php_GET() {
  // das geht weil es am localhost ist! auf telecave geht es NICHT!!!
  // simplest localhost php test for GET: genau wie live!
  let result = await fetch('../base/DB.yaml').then(x => x.text());
  result = jsyaml.load(result);
  console.log('result', result)
}
async function test1_simple_flask_GET() {
  // ==>dafuer muss ich in terminal
  //    >python app.py
  // simplest flask test for GET: genau wie live!
  let result = await fetch('../base/DB.yaml').then(x => x.text());
  result = jsyaml.load(result);
  console.log('result', result)
}
async function test1_simple_node_GET() {
  // ==>dafuer muss ich in terminal
  //    >cd pr1
  //    >npx nodemon appnode.js
  // simplest nodejs test for GET: genau wie live!
  let result = await fetch('../base/DB.yaml').then(x => x.text());
  result = jsyaml.load(result);
  console.log('result', result)
}
async function test1_simple_live_GET() {
  // ==>dafuer muss ich in terminal
  //    >npx live-server (in browser geh in pr1)
  // simplest live test for GET:
  let result = await fetch('../base/DB.yaml').then(x => x.text());
  result = jsyaml.load(result);
  console.log('result', result)
}
//#endregion

//#region animation

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
    console.log('done', animationList[index].propertyName)
    animateChain(element, animationList, index + 1);
  }).catch((error) => {
    console.error('An error occurred:', error);
  });
}
function test0_flash_ani() {
  let body = document.body;
  let d = mDiv(body, { position: 'fixed', top: 20, left: 20, padding: 10, rounding: 4, bg: '#333', fg: 'white', z: 9999 }, 'dFlash', 'hier ist ein super message!!!');
  const element = d;
  const animationList = [
    { propertyName: 'background', endValue: 'red', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-in-out' },
    { propertyName: 'opacity', endValue: 0.5, duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-in-out' },
    { propertyName: 'transform', endValue: 'translateX(100px)', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
    { propertyName: 'transform', endValue: 'translateX(0px)', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
    // { propertyName: 'border-radius', endValue: '100px', duration: 1000, delay: 0, fill: 'forwards', easing: 'ease-out' },
  ];

  animateChain(element, animationList);

}
//#endregion

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
async function mPost(data) {
  let sess = Session.type;
  console.log('sess', sess, 'data', data)
  if (sess == 'php') {
    console.log('PHP')
    let url = Session.basedir + 'php/api.php';
    data = { data: data, cmd: 'nix' };
    console.log('url', url, '\nactual data posted', data)
    let result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    console.log('___RESULT', typeof result, result)
    //let b=await result.body;

    // .then(x => console.log(x, typeof x, x.text())) //x.json())
    // // .then(async (x) => await console.log(x,typeof x,x.text())) //x.json())
    // //.then(x => jsyaml.load(x.res))
    // .catch(error => { console.error('Error:', error); });
  } else if (sess == 'live') {
    let result = await fetch(data.path).then(x => data.cmd == 'json' ? x.json() : x.text());
    if (data.cmd == 'yaml') result = jsyaml.load(result);
    return result;
  } else if (sess == 'nodejs') {
    let result = await fetch(data.path).then(x => data.cmd == 'json' ? x.json() : x.text());
    if (data.cmd == 'yaml') result = jsyaml.load(result);
    return result;

  }
}








