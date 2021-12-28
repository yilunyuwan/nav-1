// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var sitesStr = localStorage.getItem('sitesStr');
var sitesObj = JSON.parse(sitesStr);
var hashMap = sitesObj || [{
    logo: '<svg class="icon" aria-hidden="true">\n        <use xlink:href="#icon-weibo"></use>\n    </svg>', url: 'https://weibo.com'
}, {
    logo: '<svg class="icon" aria-hidden="true">\n                    <use xlink:href="#icon-bilibili-line"></use>\n                </svg>',
    url: 'https://www.bilibili.com'
}, {
    logo: '<svg class="icon" aria-hidden="true">\n                <use xlink:href="#icon-youtube"></use>\n            </svg>',
    url: 'https://www.youtube.com'
}, {
    logo: 'Y',
    url: 'https://www.yueing.org'
}, {
    logo: 'X',
    url: 'https://xiedaimala.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var render = function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        var logoStr = node.logo;

        var $newLi = $('\n        <li>\n            <div class="site">\n                <div class="logo">' + logoStr + '</div>\n                <div class="link">' + simplifyUrl(node.url) + '</div>\n                <div class="close">\n                    <svg class="icon">\n                        <use xlink:href="#icon-close"></use>\n                    </svg>\n                </div>\n            </div>\n        </li>\n        ').insertBefore($lastLi);
        $newLi.on('click', function () {
            window.open(node.url, '_self');
        });
        $newLi.on('click', '.close', function (e) {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};

$('.addButton').on('click', function () {
    var url = window.prompt('\u8BF7\u95EE\u8981\u6DFB\u52A0\u7684\u7F51\u5740\u4E3A\uFF1A');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({ logo: simplifyUrl(url)[0], url: url });
    render();
    var sitesStr = JSON.stringify(hashMap);
    localStorage.setItem('sitesStr', sitesStr);
});

$(document).on('keypress', function (e) {
    var key = e.key;

    console.log(e);
    for (var i = 0; i < hashMap.length; i++) {
        var fLetter = hashMap[i].logo.toLowerCase();
        if (hashMap[i].logo.length !== 1) {
            fLetter = simplifyUrl(hashMap[i].url)[0];
        }
        if (fLetter === key) {
            window.open(hashMap[i].url);
        }
    }
});

render();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.307b4927.map