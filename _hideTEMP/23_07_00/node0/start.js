
onload = start;

async function start() {
  Session.type = detectSessionType(); // console.log('session type:',Session.type);
  document.title = capitalize(Session.type);
  if (Session.type == 'live') { reload(); return; }
  else if (Session.type == 'nodejs') { //40xx
    console.log('YEAH!!!!');
    reload(); // da bleibt er einfach am client
  } else if (Session.type == 'flask') { //60xx

  } else { //php or telecave

  }
}

function reload() {
  document.body.innerHTML = ''
  console.log('Session', Session)
  flashMessages();
  showNavbar(); // bleibt am client!
  showLoaderHolder();
  showUserDependentUI();
  showFooter();
}

function flashMessages() { if (!isEmpty(Session.message)) { mPopupMessage(Session.message, { fg: 'red', paleft: 10 }); delete Session.message; } }
function flashMessages() {
  if (!isEmpty(Session.message)) {
    let d = mDiv(document.body, {}, 'dFlash', Session.message, 'flash-message fade-in');
    delete Session.message;
    setTimeout(() => {
      let d=mDiv('dFlash');
      d.classList.remove('fade-in');
      d.classList.add('fade-out');
      setTimeout(() => {
        let d=mDiv('dFlash');
        d.remove();
      }, 500); // Match the animation duration
    }, 3000); // Delay in milliseconds
  }
}

function onclickHome() { Session.message = 'clicked home'; reload(); }
function onclickLogin() { Session.message = 'clicked login'; reload(); }
function onclickLogout() { Session.message = 'clicked logout'; reload(); }

function showLoaderHolder() {
  let html = `
    <div id="loader_holder" class="loader_off"><img style="width: 70px" src="/base/assets/icons/giphy.gif" /></div>
  `;
}
function showFooter() {
  let html = `
    <div id="dFooter" class="my">loading..</div>
  `;
}
function showNavbar() {
  let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickHome()">home</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickLogin()">login</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickLogout()">logout</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.body.innerHTML += html;
}
function showUserDependentUI() {
  let html = `
    {% if username == '': %}
    <form action="#" method="post">
      <div>Enter username:</div>
      <p><input type="text" name="username" /></p>
      <p><input type="submit" value="submit"></p>
    </form>
    {% elif username == 'peter' %}
    <div>HALLO!!!! {{ username }}</div>
    <script>document.write('hallohallohallo!!!!!!!!!!!!! {{ username }}')</script>
    {% else %}
    <script>document.write('<h2 style="padding:10px">Hello, {{ username }}!</h2>')</script>
    <form onsubmit="loader_on()" action="ask" method="post"  style="padding-left:10px">
      <div>Enter query:</div>
      <p><input type="text" name="query" id="iQuery" style="width:100%" value="{{ query }}"/></p>
      <input type="submit" value="submit">
    </form>
    
    <div id="dMain">
      <!-- <p id="dResponse">answer: {{ answer }}</p> -->
      <textarea style="width:96%;height:50%;padding:10px" >{{ answer }}</textarea>
    </div>
    {% endif %}
  `;
}