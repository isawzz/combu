function mAddKeys(ofrom, oto) { for (const k in ofrom) if (mundef(oto[k])) oto[k] = ofrom[k]; return oto; }
function mAllNumbers(s) {
  let m = s.match(/\-.\d+|\-\d+|\.\d+|\d+\.\d+|\d+\b|\d+(?=\w)/g);
  if (m) return m.map(v => +v); else return null;
}
function marr2Dict(arr, prop) { let di = {}; for (const a of arr) { lookupAddToList(di, [a[prop]], a); } return di; }
function marr2Set(arr2d, func) {
  for (let i = 0; i < arr2d.length; i++) {
    for (let j = 0; j < arr2d[i].length; j++) {
      let o = arr2d[i][j];
      if (typeof o == 'object') {
        func(o, i, j);
      }
    }
  }
}
function marrAdd(arr1, arr2) {
  let i = 0; return arr1.map(x => x + arr2[i++]);
}
function marrAverage(arr, prop) {
  let n = arr.length; if (!n) return 0;
  let sum = marrSum(arr, prop);
  return sum / n;
}
function marrBuckets(arr, func, sortbystr) {
  let di = {};
  for (const a of arr) {
    let val = func(a);
    if (mundef(di[val])) di[val] = { val: val, list: [] };
    di[val].list.push(a);
  }
  let res = []
  let keys = get_keys(di);
  if (misdef(sortbystr)) {
    keys.sort((a, b) => sortbystr.indexOf(a) - sortbystr.indexOf(b));
  }
  return keys.map(x => di[x]);
}
function marrByClassName(classname, d) {
  if (mundef(d)) d = document;
  return Array.from(d.getElementsByClassName(classname));
}
function marrChildren(elem) { return [...mtoElem(elem).children]; }
function marrClear(arr) { arr.length = 0; }
function marrCount(arr, func) { return arr.filter(func).length; }
function marrCreate(n, func) {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(func(i));
  }
  return res;
}
function marrCycle(arr, count) { return marrRotate(arr, count); }
function marrCycleSwap(arr, prop, clockwise = true) {
  let n = arr.length;
  let h = arr[0].prop;
  for (let i = 1; i < n; i++) { arr[i - 1][prop] = arr[i][prop]; }
  arr[n - 1][prop] = h;
}
function marrExcept(arr, el) {
  let res = [];
  for (const a of arr) { if (a != el) res.push(a); }
  return res;
}
function marrExtend(arr, list) { list.map(x => arr.push(x)); return arr; }
function marrFirst(arr) { return arr.length > 0 ? arr[0] : null; }
function marrFirstOfLast(arr) { if (arr.length > 0) { let l = arrLast(arr); return misList(l) ? arrFirst(l) : null; } else return null; }
function marrFlatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      res.push(arr[i][j]);
    }
  }
  return res;
}
function marrFromIndex(arr, i) { return arr.slice(i); }
function marrFromTo(arr, iFrom, iTo) {
  if (isDict(arr)) {
    let keys = Object.keys(arr);
    return keys.slice(iFrom, iTo).map(x => (arr[x]));
  } else return arr.slice(iFrom, iTo);
}
function marrFunc(n, func) { let res = []; for (let i = 0; i < n; i++) res.push(func()); return res; }
function marrIndices(arr, func) {
  let indices = [];
  for (let i = 0; i < arr.length; i++) { if (func(arr[i])) indices.push(i); }
  return indices;
}
function marrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function marrLastOfLast(arr) { if (arr.length > 0) { let l = arrLast(arr); return misList(l) ? arrLast(l) : null; } else return null; }
function marrMax(arr, f) { return arrMinMax(arr, f).max; }
function marrMin(arr, f) { return arrMinMax(arr, f).min; }
function marrMinMax(arr, func) {
  if (mundef(func)) func = x => x;
  let min = func(arr[0]), max = func(arr[0]), imin = 0, imax = 0;
  for (let i = 1, len = arr.length; i < len; i++) {
    let v = func(arr[i]);
    if (v < min) {
      min = v; imin = i;
    } else if (v > max) {
      max = v; imax = i;
    }
  }
  return { min: min, imin: imin, max: max, imax: imax, elmin: arr[imin], elmax: arr[imax] };
}
function marrMinus(a, b) { if (misList(b)) return a.filter(x => !b.includes(x)); else return a.filter(x => x != b); }
function marrNext(list, el) {
  let iturn = list.indexOf(el);
  let nextplayer = list[(iturn + 1) % list.length];
  return nextplayer;
}
function marrNoDuplicates(arr) {
  let di = {};
  let arrNew = [];
  for (const el of arr) {
    if (!isLiteral(el)) continue;
    if (misdef(di[el])) continue;
    di[el] = true;
    arrNew.push(el);
  }
  return arrNew;
}
function marrPairs(a) {
  let res = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      res.push([a[i], a[j]]);
    }
  }
  return res;
}
function marrPlus(a, b) { b.map(x => a.push(x)); return a; }
function marrPrev(list, el) {
  let iturn = list.indexOf(el);
  if (iturn == 0) iturn = list.length;
  let nextplayer = list[(iturn - 1) % list.length];
  return nextplayer;
}
function marrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function marrRemove(arr, listweg) {
  arrReplace(arr, listweg, []);
}
function marrRemoveDuplicates(items, prop) {
  let di = {};
  let res = [];
  for (const item of items) {
    if (misdef(di[item[prop].toLowerCase()])) { continue; }
    res.push(item);
    di[item[prop].toLowerCase()] = true;
  }
  return res;
}
function marrRemoveLast(arr) { arr.length -= 1; }
function marrRepeat(n, el) { let res = []; for (let i = 0; i < n; i++) res.push(el); return res; }
function marrReplace(arr, listweg, listdazu) {
  arrExtend(arr, listdazu);
  listweg.map(x => arrRemovip(arr, x));
  return arr;
}
function marrReplaceAt(arr, index, val, inPlace = true) { return inPlace ? arrReplaceAtInPlace(arr, index, val) : arrReplaceAtCopy(arr, index, val); }
function marrReplaceAtCopy(arr, index, val) {
  let res = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (i == index) res[i] = val; else res[i] = arr[i];
  }
  return res;
}
function marrReplaceAtInPlace(arr, index, val) { arr[index] = val; }
function marrReverse(arr) { return jsCopy(arr).reverse(); }
function marrRotate(arr, count) {
  var unshift = Array.prototype.unshift,
    splice = Array.prototype.splice;
  var len = arr.length >>> 0, count = count >> 0;
  let arr1 = jsCopy(arr);
  unshift.apply(arr1, splice.call(arr1, count % len, len));
  return arr1;
}
function marrShuffle(arr) { if (misEmpty(arr)) return []; else return fisherYates(arr); }
function marrSplitAtIndex(arr, i) {
  return [arr.slice(0, i), arr.slice(i)];
}
function marrSplitByIndices(arr, indices) {
  let [a1, a2] = [[], jsCopy(arr)];
  for (let i = 0; i < indices.length; i++) {
    let el = arr[indices[i]];
    a1.push(el);
    marrRemoveInPlace(a2, el);
  }
  return [a1, a2];
}
function marrString(arr, func) {
  if (isEmpty(arr)) return '[]';
  let s = '[';
  for (const el of arr) {
    if (misList(el)) s += arrString(el, func) + ','; else s += (misdef(func) ? func(el) : el) + ',';
  }
  s = s.substring(0, s.length - 1);
  s += ']';
  return s;
}
function marrSum(arr, props) {
  if (mundef(props)) return arr.reduce((a, b) => a + b);
  if (!misList(props)) props = [props];
  return arr.reduce((a, b) => a + (lookup(b, props) || 0), 0);
}
function marrSwap(arr, i, j) { let h = arr[i]; arr[i] = arr[j]; arr[j] = h; }
function marrSwap2d(arr, r1, c1, r2, c2) { let h = arr[r1][c1]; arr[r1][c1] = arr[r2][c2]; arr[r2][c2] = h; }
function marrTail(arr) { return arr.slice(1); }
function marrTake(arr, n = 0, from = 0) {
  if (isDict(arr)) {
    let keys = Object.keys(arr);
    return n > 0 ? keys.slice(from, from + n).map(x => (arr[x])) : keys.slice(from).map(x => (arr[x]));
  } else return n > 0 ? arr.slice(from, from + n) : arr.slice(from);
}
function marrTakeFromEnd(arr, n) {
  if (arr.length <= n) return arr.map(x => x); else return arr.slice(arr.length - n);
}
function marrTakeFromTo(arr, a, b) { return marrFromTo(arr, a, b); }
function marrTakeLast(arr, n, from = 0) {
  let res = [];
  if (misDict(arr)) {
    let keys = Object.keys(arr);
    let ilast = keys.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[keys[i]]); }
  } else {
    let ilast = arr.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[i]); }
  }
  return res;
}
function marrTakeWhile(arr, func) {
  let res = [];
  for (const a of arr) {
    if (func(a)) res.push(a); else break;
  }
  return res;
}
function marrToggleMember(arr, el) { if (arr.includes(el)) marrRemoveInPlace(arr, el); else arr.push(el); }
function marrToMatrix(arr, rows, cols) {
  let i = 0, res = [];
  for (let r = 0; r < rows; r++) {
    let rarr = [];
    for (let c = 0; c < cols; c++) {
      let a = arr[i]; i++;
      rarr.push(a);
    }
    res.push(rarr);
  }
  return res;
}
function marrWithout(arr, b) { return marrMinus(arr, b); }
function marrZip(arr1, arr2) {
  let res = [];
  for (let i = 0; i < Math.min(arr1, arr2); i++) {
    let o = {};
    mAddKeys(arr1[i], o);
    mAddKeys(arr2[i], o);
    res.push(o);
  }
  return res;
}

function marrRemoveInPlace(arr, el) {
  let i = arr.indexOf(el);
  if (i > -1) arr.splice(i, 1);
  return i;
}
function mBy(id) { return document.getElementById(id); }
function mColor_(p, c0, c1, l) {
  function pSBCr(d) {
    let i = parseInt, m = Math.round, a = typeof c1 == 'string';
    let n = d.length,
      x = {};
    if (n > 9) {
      ([r, g, b, a] = d = d.split(',')), (n = d.length);
      if (n < 3 || n > 4) return null;
      (x.r = parseInt(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = parseInt(g)), (x.b = parseInt(b)), (x.a = a ? parseFloat(a) : -1);
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
      d = parseInt(d.slice(1), 16);
      if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
      else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
    }
    return x;
  }

  let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof c1 == 'string';
  if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
  h = c0.length > 9;
  h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h;
  f = pSBCr(c0);
  P = p < 0;
  t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 };
  p = P ? p * -1 : p;
  P = 1 - p;
  if (!f || !t) return null;
  if (l) { r = m(P * f.r + p * t.r); g = m(P * f.g + p * t.g); b = m(P * f.b + p * t.b); }
  else { r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5); g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5); b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5); }
  a = f.a;
  t = t.a;
  f = a >= 0 || t >= 0;
  a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0;
  if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
  else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
}
function mColorFrom(cAny, a, allowHsl = false) {
  if (misString(cAny)) {
    if (cAny[0] == '#') {
      if (a == undefined) return cAny;
      cAny = cAny.substring(0, 7);
      return cAny + (a == 1 ? '' : alphaToHex(a));
    } else if (misdef(ColorDi) && lookup(ColorDi, [cAny])) {
      let c = ColorDi[cAny].c;
      if (a == undefined) return c;
      c = c.substring(0, 7);
      return c + (a == 1 ? '' : alphaToHex(a));
    } else if (startsWith(cAny, 'rand')) {
      let spec = capitalize(cAny.substring(4));
      if (misdef(window['color' + spec])) {
        c = window['color' + spec]();
      } else c = rColor();
      if (a == undefined) return c;
      return c + (a == 1 ? '' : alphaToHex(a));
    } else if (startsWith(cAny, 'linear')) {
      return cAny;
    } else if (cAny[0] == 'r' && cAny[1] == 'g') {
      if (a == undefined) return cAny;
      if (cAny[3] == 'a') {
        if (a < 1) {
          return stringBeforeLast(cAny, ',') + ',' + a + ')';
        } else {
          let parts = cAny.split(',');
          let r = firstNumber(parts[0]);
          return 'rgb(' + r + ',' + parts[1] + ',' + parts[2] + ')';
        }
      } else {
        if (a < 1) {
          return 'rgba' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
        } else {
          return cAny;
        }
      }
    } else if (cAny[0] == 'h' && cAny[1] == 's') {
      if (allowHsl) {
        if (a == undefined) return cAny;
        if (cAny[3] == 'a') {
          if (a < 1) {
            return stringBeforeLast(cAny, ',') + ',' + a + ')';
          } else {
            let parts = cAny.split(',');
            let r = firstNumber(parts[0]);
            return 'hsl(' + r + ',' + parts[1] + ',' + parts[2] + ')';
          }
        } else {
          return a == 1 ? cAny : 'hsla' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
        }
      } else {
        if (cAny[3] == 'a') {
          cAny = HSLAToRGBA(cAny);
        } else {
          cAny = HSLToRGB(cAny);
        }
        return mColorFrom(cAny, a, false);
      }
    } else {
      ensureColorDict();
      let c = ColorDi[cAny];
      if (mundef(c)) {
        if (startsWith(cAny, 'rand')) {
          let spec = cAny.substring(4);
          if (misdef(window['color' + spec])) {
            c = window['color' + spec](res);
          } else c = rColor();
        } else {
          console.log('color not available:', cAny);
          throw new Error('color not found: ' + cAny)
          return '#00000000';
        }
      } else c = c.c;
      if (a == undefined) return c;
      c = c.substring(0, 7);
      return c + (a == 1 ? '' : alphaToHex(a));
    }
  } else if (Array.isArray(cAny)) {
    if (cAny.length == 3 && misNumber(cAny[0])) {
      let r = cAny[0];
      let g = cAny[1];
      let b = cAny[2];
      return a == undefined || a == 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
    } else {
      return rChoose(cAny);
    }
  } else if (typeof cAny == 'object') {
    if ('h' in cAny) {
      let hslString = '';
      if (a == undefined || a == 1) {
        hslString = `hsl(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%)`;
      } else {
        hslString = `hsla(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%,${a})`;
      }
      if (allowHsl) {
        return hslString;
      } else {
        return mColorFrom(hslString, a, allowHsl);
      }
    } else if ('r' in cAny) {
      if (a !== undefined && a < 1) {
        return `rgba(${cAny.r},${cAny.g},${cAny.b},${a})`;
      } else {
        return `rgb(${cAny.r},${cAny.g},${cAny.b})`;
      }
    }
  }
}
function mColorFromHSL(hue, sat = 100, lum = 50) {
  return hslToHex(valf(hue, rHue()), sat, lum);
}
function colorFromHue(h, s = 100, l = 50, asObject = false) {
  if (asObject) return { h: h, s: s, l: l }; else return `hsl(${h},${s},${l})`;
}
function colorG(cAny) {
  let rgb = colorRGB(cAny, true);
  return rgb.g;
}
function colorHex(cAny) {
  let c = mColorFrom(cAny);
  if (c[0] == '#') {
    return c;
  } else {
    let res = mColor_(0, c, 'c');
    return res;
  }
}
function colorHex_RGBAToHex9(cAny) {
  let c = mColorFrom(cAny);
  if (c[0] == '#') {
    return c;
  } else if (c[3] == '(') {
    return RGBToHex7(c);
  } else {
    let res = RGBAToHex9(c);
    return res;
  }
}
function mColorHSL(cAny, asObject = false) {
  let res = mColorFrom(cAny, undefined, true);
  let shsl = res;
  if (res[0] == '#') {
    if (res.length == 9) {
      shsl = hexAToHSLA(res);
    } else if (res.length == 7) {
      shsl = hexToHSL(res);
    }
  } else if (res[0] == 'r') {
    if (res[3] == 'a') {
      shsl = RGBAToHSLA(res);
    } else {
      shsl = RGBToHSL(res);
    }
  }
  let n = allNumbers(shsl);
  if (asObject) {
    return { h: n[0], s: n[1] / 100, l: n[2] / 100, a: n.length > 3 ? n[3] : 1 };
  } else {
    return shsl;
  }
}
function colorHSLBuild(hue, sat = 100, lum = 50) { let result = "hsl(" + hue + ',' + sat + '%,' + lum + '%)'; return result; }
function colorHue(cAny) { let hsl = mColorHSL(cAny, true); return hsl.h; }
function colorHueWheel(contrastTo, minDiff = 25, mod = 30, start = 0) {
  let hc = colorHue(contrastTo);
  let wheel = [];
  while (start < 360) {
    let d1 = Math.abs((start + 360) - hc);
    let d2 = Math.abs((start) - hc);
    let d3 = Math.abs((start - 360) - hc);
    let min = Math.min(d1, d2, d3);
    if (min > minDiff) wheel.push(start);
    start += mod;
  }
  return wheel;
}
function colorIdealText(bg, grayPreferred = false) {
  let rgb = colorRGB(bg, true);
  const nThreshold = 105;
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  var bgDelta = r * 0.299 + g * 0.587 + b * 0.114;
  var foreColor = 255 - bgDelta < nThreshold ? 'black' : 'white';
  if (grayPreferred) foreColor = 255 - bgDelta < nThreshold ? 'dimgray' : 'snow';
  return foreColor;
}
function mColorLight(c, percent = 20, log = true) {
  if (mundef(c)) {
    return mColorFromHSL(rHue(), 100, 85);
  } else c = mColorFrom(c);
  let zero1 = percent / 100;
  return mColor_(zero1, c, undefined, !log);
}
function colorLighter(c, zero1 = .2, log = true) {
  c = mColorFrom(c);
  return mColor_(zero1, c, undefined, !log);
}
function mColorLum(cAny) {
  let hsl = mColorHSL(cAny, true);
  return hsl.l;
}
function mClass(d) {
  d = mtoElem(d);
  if (arguments.length == 2) {
    let arg = arguments[1];
    if (misString(arg) && arg.indexOf(' ') > 0) { arg = [mtoWords(arg)]; }
    else if (misString(arg)) arg = [arg];
    if (misList(arg)) {
      for (let i = 0; i < arg.length; i++) {
        d.classList.add(arg[i]);
      }
    }
  } else for (let i = 1; i < arguments.length; i++) d.classList.add(arguments[i]);
}
function mDetectSessionType() {
  //port convention: flask:60xx, nodejs:40xx, live:50xx, sockets:3000, php:8080 | telecave
  //console.log('window.location', window.location.href);
  let loc = window.location.href;
  DA.sessionType =
    loc.includes('telecave') || loc.includes('8080') ? 'php'
      : loc.includes(':40') ? 'nodejs'
        : loc.includes(':60') ? 'flask' : 'live';
  return DA.sessionType;
}
function mFirstCond(arr, func) {
  if (mundef(arr)) return null;
  for (const a of arr) {
    if (func(a)) return a;
  }
  return null;
}
function mGetRect(elem, relto) {
  elem = mtoElem(elem);
  let res = elem.getBoundingClientRect();
  if (misdef(relto)) {
    let b2 = relto.getBoundingClientRect();
    let b1 = res;
    res = {
      x: b1.x - b2.x,
      y: b1.y - b2.y,
      left: b1.left - b2.left,
      top: b1.top - b2.top,
      right: b1.right - b2.right,
      bottom: b1.bottom - b2.bottom,
      width: b1.width,
      height: b1.height
    };
  }
  let r = { x: res.left, y: res.top, w: res.width, h: res.height };
  mAddKeys({ l: r.x, t: r.y, r: r.x + r.w, b: r.t + r.h }, r);
  return r;
}
function misCapitalLetter(s) { return /^[A-Z]$/i.test(s); }
function misCapitalLetterOrDigit(s) { return /^[A-Z0-9ÖÄÜ]$/i.test(s); }
function misdef(x) { return x !== null && x !== undefined; }
function misDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !misList(d); return res; }
function misDictOrList(d) { return typeof (d) == 'object'; }
function misDigit(s) { return /^[0-9]$/i.test(s); }
function misDOM(x) { let c = mLookup(x, ['constructor', 'name']); return c ? c.startsWith('HTML') || c.startsWith('SVG') : false; }
function misEmpty(arr) {
  return arr === undefined || !arr
    || (misString(arr) && (arr == 'undefined' || arr == ''))
    || (Array.isArray(arr) && arr.length == 0)
    || Object.entries(arr).length === 0;
}
function misEmptyDict(x) { return misDict(x) && misEmpty(Object.keys(x)); }
function misEmptyOrWhiteSpace(s) { return misEmpty(s.trim()); }
function misLetter(s) { return /^[a-zA-Z]$/i.test(s); }
function misLetterElement(elem) { return misCapitalLetterOrDigit(elem.innerHTML); }
function misList(arr) { return Array.isArray(arr); }
function misListOf(arr, predfunc) { return Array.isArray(arr) && !mFirstCond(arr, x => !predfunc(x)); }
function misNumber(x) { return x !== ' ' && x !== true && x !== false && misdef(x) && (x == 0 || !isNaN(+x)); }
function misString(param) { return typeof param == 'string'; }
async function mLoadAsset(name, ext = 'yaml') { return await mLoadFromBase(`assets/${name}.${ext}`); }
async function mLoadFromBase(filename) {
  let data = {
    path: DIR_BASE + filename,
    cmd: filename.includes('.') ? msAfterLast(filename, '.') : 'yaml',
  };
  return await mFetch(data);
}
function mLookup(dict, keys) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (k === undefined) break;
    let e = d[k];
    if (e === undefined || e === null) return null;
    d = d[k];
    if (i == ilast) return d;
    i += 1;
  }
  return d;
}
function mLookupAddIfToList(dict, keys, val) {
  let lst = mLookup(dict, keys);
  if (misList(lst) && lst.includes(val)) return;
  mLookupAddToList(dict, keys, val);
}
function mLookupAddToList(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (i == ilast) {
      if (mundef(k)) {
        console.assert(false, 'mLookupAddToList: last key indefined!' + keys.join(' '));
        return null;
      } else if (misList(d[k])) {
        d[k].push(val);
      } else {
        d[k] = [val];
      }
      return d[k];
    }
    if (mundef(k)) continue;
    if (d[k] === undefined) d[k] = {};
    d = d[k];
    i += 1;
  }
  return d;
}
function mLookupDef(o, proplist, def) { return mLookup(o, proplist) || def; }
function mLookupRemoveFromList(dict, keys, val, deleteIfEmpty = false) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (i == ilast) {
      if (mundef(k)) {
        alert('mLookupRemoveFromList: last key indefined!' + keys.join(' '));
        return null;
      } else if (misList(d[k])) {
        marrRemoveInPlace(d[k], val);
        if (deleteIfEmpty && misEmpty(d[k])) delete d[k];
      } else {
        if (d[k] === undefined) {
          error('mLookupRemoveFromList not a list ' + d[k]);
          return null;
        }
      }
      return d[k];
    }
    if (mundef(k)) continue;
    if (d[k] === undefined) {
      error('mLookupRemoveFromList key not found ' + k);
      return null;
    }
    d = d[k];
    i += 1;
  }
  return d;
}
function mLookupSet(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (mundef(k)) continue;
    if (d[k] === undefined) d[k] = (i == ilast ? val : {});
    if (mundef(d[k])) d[k] = (i == ilast ? val : {});
    d = d[k];
    if (i == ilast) return d;
    i += 1;
  }
  return d;
}
function mLookupSetOverride(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (i == ilast) {
      if (mundef(k)) {
        return null;
      } else {
        d[k] = val;
      }
      return d[k];
    }
    if (mundef(k)) continue;
    if (mundef(d[k])) d[k] = {};
    d = d[k];
    i += 1;
  }
  return d;
}
function mSection(styles = {}, id, inner, tag, classes) {
  let d = mBy(id);
  mAddKeys({ position: 'relative' }, styles);
  mStyle(d, styles);
  if (misdef(tag) && misdef(inner)) inner = `<${tag}>${inner}</${tag}>`;
  if (misdef(inner)) d.innerHTML = inner;
  if (misdef(classes)) mClass(d, classes);
  return d;
}
function mStyle(elem, styles, unit = 'px') {
  function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
    if (mundef(nOrString)) return defaultVal;
    if (misNumber(nOrString)) nOrString = '' + nOrString + unit;
    return nOrString;
  }
  elem = mtoElem(elem);
  if (misdef(styles.whrest)) { delete styles.whrest; styles.w = styles.h = 'rest'; } else if (misdef(styles.wh100)) { styles.w = styles.h = '100%'; delete styles.wh100; }
  if (misdef(styles.w100)) styles.w = '100%'; else if (misdef(styles.wrest)) styles.w = 'rest';
  if (misdef(styles.h100)) styles.h = '100%'; else if (misdef(styles.hrest)) styles.h = 'rest';
  let dParent = elem.parentNode;
  let pad = parseInt(mvalf(dParent.style.padding, '0'));
  let rp = mGetRect(dParent);
  let r = mGetRect(elem, dParent);
  if (styles.w == 'rest') {
    let left = r.l;
    let w = rp.w;
    let wrest = w - left - pad;
    styles.w = wrest;
  }
  if (styles.h == 'rest') {
    let r1 = mGetRect(dParent.lastChild, dParent);
    let hrest = rp.h - (r1.y) - pad;
    styles.h = hrest;
  }
  let bg, fg, alpha;
  if (misdef(styles.bg) || misdef(styles.fg)) {
    [bg, fg, alpha] = [styles.bg, styles.fg, styles.alpha];
    if (fg == 'contrast') {
      if (bg != 'inherit') bg = mColorFrom(bg, alpha);
      fg = colorIdealText(bg);
    } else if (bg == 'contrast') {
      fg = mColorFrom(fg);
      bg = colorIdealText(fg);
    } else {
      if (misdef(bg) && bg != 'inherit') bg = mColorFrom(bg, alpha);
      if (misdef(fg) && fg != 'inherit') fg = mColorFrom(fg);
    }
  }
  if (misdef(styles.vpadding) || misdef(styles.hpadding)) {
    styles.padding = mvalf(styles.vpadding, 0) + unit + ' ' + mvalf(styles.hpadding, 0) + unit;
  }
  if (misdef(styles.vmargin) || misdef(styles.hmargin)) {
    styles.margin = mvalf(styles.vmargin, 0) + unit + ' ' + mvalf(styles.hmargin, 0) + unit;
  }
  if (misdef(styles.upperRounding) || misdef(styles.lowerRounding)) {
    let rtop = '' + mvalf(styles.upperRounding, 0) + unit;
    let rbot = '' + mvalf(styles.lowerRounding, 0) + unit;
    styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
  }
  if (misdef(styles.box)) styles['box-sizing'] = 'border-box';
  if (misdef(styles.round)) styles['border-radius'] = '50%';
  for (const k in styles) {
    let val = styles[k];
    let key = k;
    if (misdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
    else if (k == 'font' && !misString(val)) {
      let fz = f.size; if (misNumber(fz)) fz = '' + fz + 'px';
      let ff = f.family;
      let fv = f.variant;
      let fw = misdef(f.bold) ? 'bold' : misdef(f.light) ? 'light' : f.weight;
      let fs = misdef(f.italic) ? 'italic' : f.style;
      if (mundef(fz) || mundef(ff)) return null;
      let s = fz + ' ' + ff;
      if (misdef(fw)) s = fw + ' ' + s;
      if (misdef(fv)) s = fv + ' ' + s;
      if (misdef(fs)) s = fs + ' ' + s;
      elem.style.setProperty(k, s);
      continue;
    } else if (k == 'classname') {
      mClass(elem, styles[k]);
    } else if (k == 'border') {
      if (misNumber(val)) val = `solid ${val}px ${misdef(styles.fg) ? styles.fg : '#ffffff80'}`;
      if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
    } else if (k == 'ajcenter') {
      elem.style.setProperty('justify-content', 'center');
      elem.style.setProperty('align-items', 'center');
    } else if (k == 'layout') {
      if (val[0] == 'f') {
        val = val.slice(1);
        elem.style.setProperty('display', 'flex');
        elem.style.setProperty('flex-wrap', 'wrap');
        let hor, vert;
        if (val.length == 1) hor = vert = 'center';
        else {
          let di = { c: 'center', s: 'start', e: 'end' };
          hor = di[val[1]];
          vert = di[val[2]];
        }
        let justStyle = val[0] == 'v' ? vert : hor;
        let alignStyle = val[0] == 'v' ? hor : vert;
        elem.style.setProperty('justify-content', justStyle);
        elem.style.setProperty('align-items', alignStyle);
        switch (val[0]) {
          case 'v': elem.style.setProperty('flex-direction', 'column'); break;
          case 'h': elem.style.setProperty('flex-direction', 'row'); break;
        }
      } else if (val[0] == 'g') {
        val = val.slice(1);
        elem.style.setProperty('display', 'grid');
        let n = mAllNumbers(val);
        let cols = n[0];
        let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
        elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
        elem.style.setProperty('place-content', 'center');
      }
    } else if (k == 'layflex') {
      elem.style.setProperty('display', 'flex');
      elem.style.setProperty('flex', '0 1 auto');
      elem.style.setProperty('flex-wrap', 'wrap');
      if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
    } else if (k == 'laygrid') {
      elem.style.setProperty('display', 'grid');
      let n = mAllNumbers(val);
      let cols = n[0];
      let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
      elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
      elem.style.setProperty('place-content', 'center');
    }
    if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
    else if (key == 'background-color') elem.style.background = bg;
    else if (key == 'color') elem.style.color = fg;
    else if (key == 'opacity') elem.style.opacity = val;
    else if (key == 'wrap') { if (val == 'hard') elem.setAttribute('wrap', 'hard'); else elem.style.flexWrap = 'wrap'; }
    else if (k.startsWith('dir')) {
      isCol = val[0] == 'c';
      elem.style.setProperty('flex-direction', 'column');
    } else if (key == 'flex') {
      if (misNumber(val)) val = '' + val + ' 1 0%';
      elem.style.setProperty(key, makeUnitString(val, unit));
    } else {
      elem.style.setProperty(key, makeUnitString(val, unit));
    }
  }
}
function mStyleGet(elem, prop) { return mGetStyle(elem, prop); }
function mStyleOrClass(elem, st) { if (misString(st)) mClass(elem, st); else mStyle(elem, st); }
function mStyleRemove(elem, prop) {
  if (misdef(STYLE_PARAMS[prop])) prop = STYLE_PARAMS[prop];
  elem.style.removeProperty(prop);
}
function msAfter(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return '';
  return sFull.substring(idx + sSub.length);
}
function msAfterLast(sFull, sSub) {
  let parts = sFull.split(sSub);
  return marrLast(parts);
}
function msAfterLeadingConsonants(s) {
  let regexpcons = /^([^aeiou])+/g;
  let x = s.match(regexpcons);
  return x ? s.substring(x[0].length) : s;
}
function msBefore(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return sFull;
  return sFull.substring(0, idx);
}
function msBeforeLast(sFull, sSub) {
  let parts = sFull.split(sSub);
  return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}
function msBetween(sFull, sStart, sEnd) {
  return msBefore(msAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}
function msBetweenLast(sFull, sStart, sEnd) {
  let s1 = msBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
  return msAfterLast(s1, sStart);
}
function msCount(s, sSub, caseInsensitive = true) {
  let temp = "Welcome to W3Docs";
  let m = new RegExp(sSub, 'g' + (caseInsensitive ? 'i' : ''));
  let count = (s.match(m)).length;
  return count;
}
function msDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] != ' ' && str[p] != '-') {
      p--;
    }
    if (p > 0) {
      let left;
      if (str.substring(p, p + 1) == '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      const right = str.substring(p + 1);
      return left + spaceReplacer + msDivider(right, width, spaceReplacer);
    }
  }
  return str;
}
function msLast(s, n) { return s.substring(s.length - n, s.length); }
function msMinusLast(s, n = 1) {
  return s.substring(0, s.length - n);
}
function msToMatrix(s, rows, cols) {
  if (isNumber(s)) s = String(s);
  let letters = toLetterArray(s);
  let nums = letters.map(x => Number(x));
  let matrix = arrToMatrix(nums, rows, cols);
}
function mtoDegree(rad) { return Math.floor(180 * rad / Math.PI); }
function mtoElem(d) { return misString(d) ? mBy(d) : d; }
function mtoWords(s, allow_ = false) {
  let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
  return arr.filter(x => !misEmpty(x));
}
function mundef(x) { return x === null || x === undefined; }
function mvalf() {
  for (const arg of arguments) if (misdef(arg)) return arg;
  return null;
}

