/**
 *	EasyHTML5Video JavaScript Extension API version 1.2
 *	Created by EasyHTML5Video.com
 *	Modified 13:05 25.07.2013
 *	This file content fullscreen api
 */
(function() {
    function j(t, s, i) {
        if (t.addEventListener) {
            t.addEventListener(s, i, false)
        } else {
            t.attachEvent("on" + s, i)
        }
    }

    function r(t, s, i) {
        if (t.removeEventListener) {
            t.removeEventListener(s, i)
        } else {
            t.detachEvent("on" + s, i)
        }
    }

    function o(u, t) {
        if (!u.length) {
            u = [u]
        }
        for (var v in t) {
            for (var s = 0; s < u.length; s++) {
                u[s].style[v] = t[v]
            }
        }
    }

    function m(t, v) {
        v = v || document;
        if (document.getElementsByClassName) {
            return v.getElementsByClassName(t)
        }
        var w = v.getElementsByTagName("*"),
            s = [];
        for (var u = 0; u < w.length; u++) {
            if ((new RegExp("(^|\\s+)" + t + "(\\s+|$)", "g")).test(w[u].className)) {
                s.push(w[u]);
                break
            }
        }
        return s
    }
    var h = 0,
        n = "";
    if (typeof document.cancelFullScreen != "undefined") {
        h = true
    } else {
        var e = "webkit moz o ms khtml".split(" ");
        for (var f = 0, l = e.length; f < l; f++) {
            n = e[f];
            if (typeof document[n + "CancelFullScreen"] != "undefined") {
                h = true;
                break
            }
        }
    }

    function g(i) {
        if (h) {
            switch (n) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[n + "FullScreen"]
            }
        } else {
            return !!i.eh5v
        }
    }
    var k = 0;

    function c(i) {
        if (h) {
            return (n === "") ? i.requestFullScreen() : i[n + "RequestFullScreen"]()
        } else {
            if (!i) {
                return
            }
            if (k) {
                d(k)
            }
            var t = {
                position: "fixed",
                left: 0,
                top: 0,
                right: "auto",
                bottom: "auto",
                width: window.innerWidth + "px",
                height: window.innerHeight + "px",
                backgroundColor: "rgba(0,0,0,0.9)",
                border: "none",
                zIndex: 9999999
            };
            i.eh5v = {};
            for (var s in t) {
                i.eh5v[s] = i.style[s]
            }
            for (var s in t) {
                i.style[s] = t[s]
            }
            j(document.body, "keydown", p);
            k = i
        }
    }

    function d(i) {
        if (h) {
            return (n === "") ? document.cancelFullScreen() : document[n + "CancelFullScreen"]()
        } else {
            if (!i) {
                return
            }
            for (var s in i.eh5v) {
                i.style[s] = i.eh5v[s]
            }
            i.eh5v = 0;
            r(document.body, "keydown", p);
            k = 0
        }
    }

    function p(i) {
        if (i.keyCode == 27) {
            d(k)
        }
    }
    var q;

    function a(t, H) {
        var u = t.getElementsByTagName("video")[0];
        if (u) {
            if (/(iPad|iPhone|iPod)/ig.test(navigator.userAgent)) {
                var A = new Image();
                A.style.visibility = "hidden";
                A.src = u.poster;
                t.appendChild(A);
                u.style.position = "absolute";
                u.style.height = "100%"
            }
            if (u.eh5v) {
                return
            }
            u.eh5v = {
                fullScreen: function(i) {
                    if (i) {
                        c(u)
                    } else {
                        if (g(u)) {
                            d(u)
                        }
                    }
                    return g(u)
                }
            };
            var B;
            if (!H.noFS && u.getAttribute("controls") && (window.opera || /MSIE/.test(navigator.userAgent) || navigator.mozVibrate)) {
                var G = /(.*\/)[^\/]+/.exec(u.poster)[1] + "fullscreen.png";
                if (!q) {
                    q = new Image();
                    q.src = G
                }
                B = document.createElement("div");
                o(B, {
                    position: "absolute",
                    zIndex: 10,
                    display: "none",
                    right: "0px",
                    top: "0px",
                    width: "28px",
                    height: "28px",
                    background: 'rgba(0,0,0,0.50) url("' + G + '") 50% 50% no-repeat',
                    border: "none"
                });
                u.parentNode.appendChild(B);

                function C() {
                    B.style.display = "none"
                }
                j(u, "mouseover", function() {
                    B.style.display = "block"
                });
                j(u, "mouseout", function() {
                    C()
                });
                j(B, "mouseover", function() {
                    B.style.display = "block"
                });
                j(B, "click", function() {
                    c(u);
                    C()
                })
            }
            j(u, "dblclick", function() {
                if (g(u)) {
                    d(u)
                } else {
                    c(u)
                }
                if (B) {
                    setTimeout(C, 100)
                }
            });
            if (!u.getAttribute("loop")) {
                j(u, "ended", function() {
                    setTimeout(function() {
                        u.load();
                        u.pause()
                    }, 400)
                })
            }
            if (/Android/.test(navigator.userAgent)) {
                var w = u.getElementsByTagName("source"),
                    D;
                for (var z = w.length - 1; z >= 0; z--) {
                    if (!w[z].type) {
                        D = w[z].src
                    } else {
                        if (D && /mp4/.test(w[z].type)) {
                            w[z].src = D;
                            u.load()
                        }
                    }
                }
            }
            var x = document.createElement("ul"),
                F = {
                    pause: {
                        label: "Pause",
                        click: function() {
                            u.pause()
                        }
                    },
                    play: {
                        label: "Play",
                        click: function() {
                            u.play()
                        }
                    },
                    mute: {
                        label: "Mute",
                        click: function() {
                            u.muted = true
                        }
                    },
                    unmute: {
                        label: "Unmute",
                        click: function() {
                            u.muted = false
                        }
                    }
                };
            o(x, {
                position: "fixed",
                display: "none",
                listStyleType: "none",
                margin: "0px",
                padding: "0px",
                background: "#fff",
                cursor: "pointer",
                zIndex: 2147483647,
                WebkitBoxShadow: "2px 2px 10px #313131",
                MozBoxShadow: "2px 2px 10px #313131",
                boxShadow: "2px 2px 10px #313131"
            });
            j(x, "contextmenu", function(i) {
                i.preventDefault()
            });

            function y() {
                x.style.display = "none"
            }
            j(x, "click", y);
            j(window, "scroll", y);
            j(document, "click", y);
            j(document, "contextmenu", y);
            for (var v in F) {
                var s = document.createElement("li");
                o(s, {
                    margin: "0px",
                    padding: "3px 20px"
                });
                s.innerHTML = F[v].label;
                x.appendChild(s);
                j(s, "click", F[v].click);
                j(s, "mouseover", function() {
                    o(this, {
                        backgroundColor: "#4281F4",
                        color: "#fff"
                    })
                });
                j(s, "mouseleave", function() {
                    o(this, {
                        backgroundColor: "transparent",
                        color: "#000"
                    })
                });
                F[v].item = s
            }
            t.appendChild(x);
            j(u, "contextmenu", function(i) {
                o(x, {
                    left: i.pageX + "px",
                    top: i.pageY + "px",
                    display: "block"
                });
                i.preventDefault();
                i.stopPropagation()
            });

            function E() {
                F.unmute.item.style.display = u.muted ? "block" : "none";
                F.mute.item.style.display = u.muted ? "none" : "block";
                F.play.item.style.display = u.paused ? "block" : "none";
                F.pause.item.style.display = u.paused ? "none" : "block"
            }
            j(window, "load", E);
            j(u, "pause", E);
            j(u, "play", E);
            j(u, "volumechange", E)
        }
    }
    var b = m("easyhtml5video");
    for (var f = 0; f < b.length; f++) {
        a(b[f], {
            noFS: 0
        })
    }
})();
