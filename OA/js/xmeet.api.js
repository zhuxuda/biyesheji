var _uid = 0,
	__ = function(e) {};
__.isFunction = function(e) {
	return typeof e == "function"
}, __.isObject = function(e) {
	return e === Object(e)
}, __.isArray = function(e) {
	return e.length !== undefined ? !0 : Object.prototype.toString.call(e) == "[object Array]"
}, __.isEmptyObject = function(e) {
	if (e == null) return !0;
	for (var t in e) if (__.has(e, t)) return !1;
	return !0
}, __.trim = function(e) {
	return e ? e.replace(/^\s*|\s*$/g, "") : ""
}, __.has = function(e, t) {
	return e != null && Object.prototype.hasOwnProperty.call(e, t)
}, __.keys = function(e) {
	if (!__.isObject(e)) return [];
	if (Object.keys) return Object.keys(e);
	var t = [];
	for (var n in e) __.has(e, n) && t.push(n);
	return t
}, __.each = function(e, t, n) {
	if (e == null) return e;
	if (e.length === +e.length) {
		for (var r = 0, i = e.length; r < i; r++) if (t.call(n, r, e[r], e)) return
	} else {
		var s = __.keys(e);
		for (var r = 0, i = s.length; r < i; r++) if (t.call(n, s[r], e[s[r]], e)) return
	}
	return e
}, __.extend = function(e) {
	return __.isObject(e) ? (__.each(Array.prototype.slice.call(arguments, 1), function(t, n) {
		for (var r in n) e[r] = n[r]
	}), e) : e
}, __.copy = function(e) {
	return __.isObject(e) ? (__.each(Array.prototype.slice.call(arguments, 1), function(t, n) {
		for (var r in n) e.prototype[r] = n[r]
	}), e) : e
}, __.clone = function(e) {
	return __.isObject(e) ? __.isArray(e) ? e.slice() : __.extend({}, e) : e
}, __.param = function(e) {
	var t = [];
	return __.each(e, function(e, n) {
		t.push(e + "=" + encodeURIComponent(n))
	}), t.join("&")
}, __.md5 = function(e) {
	var t = e || 3,
		n = 0,
		r = (+(new Date)).toString(32);
	for (; n < 5; n++) r += Math.floor(Math.random() * 65535).toString(32);
	return r
}, __.uuid = function() {
	return ++_uid
}, __.render = function(e, t, n) {
	return e.replace(/\{\{(.*?)\}\}/g, function(e, r) {
		if (__.isFunction(n)) return n(r, t);
		var i, s, o;
		if (r.indexOf("|") > 0) {
			var u = r.split("|");
			i = __.trim(u[0]), o = __.trim(u[1])
		} else i = __.trim(r);
		var a;
		if (i.indexOf(".") != -1) {
			var a = i.split("."),
				s = t[a[0]];
			__.each(a, function(e, t) {
				e > 0 && s && (s = s[t])
			})
		} else s = t[i];
		if (o) {
			var f = o.match(/\s*in(\{.*?\})/);
			if (f && f.length > 1) {
				var l = (new Function("", "return " + f[1]))();
				l && (s = l[s] ? l[s] : "")
			} else n.filter && n.filter[o] ? s = n.filter[o](s) : console.error("filter[" + o + "] not exist")
		}
		return s
	})
}, __.loadCss = function(e) {
	if (e) {
		var t = document.getElementsByTagName("head")[0],
			n = document.createElement("link");
		n.href = e, n.rel = "stylesheet", n.type = "text/css", t.appendChild(n)
	}
}, __.loadJs = function(e, t) {
	var n = document.getElementsByTagName("head")[0],
		r = document.createElement("script");
	return r.onreadystatechange = function() {
		this.readyState == "complete" && t && t()
	}, r.type = "text/javascript", r.src = url, n.appendChild(r), r
}, __.ajax = function() {
	function e(e, t, n, r, i, s) {
		var o = null;
		window.XMLHttpRequest ? o = new XMLHttpRequest : window.ActiveXObject && (o = new ActiveXObject("Microsoft.XMLHTTP"));
		if (o != null) {
			var u = e,
				a = __.param(n);
			a && (u = e + "?" + a), s && (o.responseType = s), o.open(t, u, !0), o.onreadystatechange = function() {
				if (o.readyState == 4 && o.status == 200) {
					var e = o.responseText;
					i && i(e)
				}
			}
		}
		var f;
		if (r) {
			var l = [];
			for (var c in r) l.push(c + "=" + encodeURIComponent(r[c]));
			f = l.join("&"), f.length && o.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		}
		o.send(f)
	}
	return {
		get: function(t, n, r, i) {
			e(t, "GET", n, null, r, i)
		},
		post: function(t, n, r, i) {
			e(t, "POST", n, r, i)
		}
	}
}(), __.dom = {}, __.dom.create = function(e) {
	var t = document.createElement("div");
	return t.innerHTML = e, Array.prototype.slice.call(t.children)
}, __.dom.get = function(e) {
	return typeof e == "string" ? document.querySelectorAll(e) : [e]
}, __.dom.hasClass = function(e, t) {
	var n = __.dom.get(e),
		r = new RegExp(t + "\\b", "g");
	return n[0].className.match(r)
}, __.dom.addClass = function(e, t) {
	return __.dom.hasClass(e, t) || (e.className += " " + t), e
}, __.dom.removeClass = function(e, t) {
	var n = e.ClassName;
	return __.dom.hasClass(e, t) && (e.className = e.className.replace(t, "")), e
}, __.dom.css = function(e, t, n) {
	function a(e) {
		return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}
	function f(e) {
		return e.replace(/-+(.)?/g, function(e, t) {
			return t ? t.toUpperCase() : ""
		})
	}
	function l(e, t) {
		var n = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		};
		return typeof t == "number" && !n[a(e)] ? t + "px" : t
	}
	var r = __.dom.get(e);
	if (arguments.length < 3) {
		var i, s = r[0];
		if (!s) return;
		i = getComputedStyle(s, "");
		if (typeof t == "string") return s.style[f(t)] || i.getPropertyValue(t);
		if (__.isArray(t)) {
			var o = {};
			return __.each(t, function(e, t) {
				o[t] = s.style[f(t)] || i.getPropertyValue(t)
			}), o
		}
	}
	var u = "";
	if (typeof t == "string")!n && n !== 0 ? __.each(r, function(e, n) {
		n.style.removeProperty(a(t))
	}) : u = a(t) + ":" + l(t, n);
	else for (key in t)!t[key] && t[key] !== 0 ? __.each(r, function(e, t) {
		t.style.removeProperty(a(key))
	}) : u += a(key) + ":" + l(key, t[key]) + ";";
	__.each(r, function(e, t) {
		t.style.cssText += ";" + u
	})
}, __.dom.offset = function(e) {
	var t = __.dom.get(e);
	if (!t) return;
	var n = t[0].getBoundingClientRect();
	return {
		left: n.left + window.pageXOffset,
		top: n.top + window.pageYOffset,
		width: Math.round(n.width),
		height: Math.round(n.height)
	}
}, __.dom.position = function(e) {
	var t = __.dom.get(e);
	if (!t) return;
	var n = t[0],
		r = __.dom.offsetParent(),
		i = __.dom.offset(n),
		s = __.dom.offset(r[0]);
	return i.top -= parseFloat(__.dom.css(n, "margin-top")) || 0, i.left -= parseFloat(__.dom.css(n, "margin-left")) || 0, s.top += parseFloat(__.dom.css(r[0], "border-top-width")) || 0, s.left += parseFloat(__.dom.css(r[0], "border-left-width")) || 0, {
		top: i.top - s.top,
		left: i.left - s.left
	}
}, __.dom.offsetParent = function(e) {
	var t = __.dom.get(e);
	return t.map(function() {
		var e = this.offsetParent || document.body;
		while (e && !/^(?:body|html)$/i.test(e.nodeName) && __.dom.css(e, "position") == "static") e = e.offsetParent;
		return e
	})
}, __.dom.on = function(e, t, n) {
	var r = __.dom.get(e);
	return __.each(r, function(e, r) {
		DomEvent.on(t, r, n)
	}), r
}, __.dom.off = function(e, t, n) {
	if (typeof e == "string") {
		var r = __.dom.get(e);
		return r && __.each(r, function(e, r) {
			DomEvent.off(t, r, n)
		}), r
	}
	return DomEvent.off(t, e, n), e
}, __.dom.show = function(e) {
	__.each(__.dom.get(e), function(e, t) {
		t.style.display = "block"
	})
}, __.dom.hide = function(e) {
	__.each(__.dom.get(e), function(e, t) {
		t.style.display = "none"
	})
}, __.dom.toggle = function(e) {
	var t = __.dom.css(e, "display");
	t == "none" ? __.dom.show(e) : __.dom.hide(e)
}, __.cookies = {
	getItem: function(e) {
		return e ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
	},
	setItem: function(e, t, n, r, i, s) {
		if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
		var o = "";
		if (n) switch (n.constructor) {
		case Number:
			o = n === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
			break;
		case String:
			o = "; expires=" + n;
			break;
		case Date:
			o = "; expires=" + n.toUTCString()
		}
		return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + o + (i ? "; domain=" + i : "") + (r ? "; path=" + r : "") + (s ? "; secure" : ""), !0
	},
	removeItem: function(e, t, n) {
		return this.hasItem(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0) : !1
	},
	hasItem: function(e) {
		return e ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie) : !1
	},
	keys: function() {
		var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var t = e.length, n = 0; n < t; n++) e[n] = decodeURIComponent(e[n]);
		return e
	}
};
var DomEvent = {
	on: function(e, t, n, r) {
		var i = "",
			s = r === undefined ? !0 : r,
			o = null;
		return window.addEventListener === undefined ? (i = "on" + e, o = function(e, n) {
			return t.attachEvent(e, n), n
		}) : (i = e, o = function(e, n, r) {
			return t.addEventListener(e, n, r), n
		}), o.apply(t, [i, function(e) {
			var t = e || event,
				r = t.srcElement || t.target;
			n(t, r)
		},
		s])
	},
	off: function(e, t, n, r) {
		var i = "",
			s = r === undefined ? !0 : r;
		window.removeEventListener === undefined ? (i = "on" + e, t[i] = null) : (i = e, t.removeEventListener(i, n, s))
	},
	stopPropagation: function(e) {
		e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
	},
	preventDefault: function(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1
	}
},
	Event = {
		on: function(e, t) {
			this._events || (this._events = {}), this._events[e] = t
		},
		off: function(e) {
			delete this._events[e]
		},
		dispatchEvent: function() {
			var e = Array.prototype.slice.call(arguments, 1),
				t = arguments[0];
			if (t && this._events) {
				var n = this._events[t];
				n && n.apply(this, __.isArray(e) ? e : [e])
			}
		}
	};
(function(e) {
	function s(e, t, n, r) {
		this.roomId = e, this.roomName = t, this.nickname = n, this.encryption = r, this.msgCount = 0, this.initialize()
	}
	function o(e) {
		console.log("history_nickname" + i);
		if (i[e] != undefined) return i[e];
		var t = u(!1);
		return i[e] = t, t
	}
	function u(e) {
		var t = {
			Cat: "凯特",
			Dog: "多格",
			Zebra: "泽布拉",
			Rihno: "蕾哈娜",
			Elephant: "爱丽芬",
			Hippo: "黑普",
			Giraffe: "格拉菲",
			Duck: "达克",
			Leopard: "莱昂帕多",
			Goose: "古斯",
			Lion: "莱恩",
			Fox: "福克斯",
			Wolf: "沃尔夫",
			Tigger: "泰格",
			Beatles: "比特斯",
			Eagle: "伊格",
			Goat: "勾特",
			Python: "派森",
			Cobra: "科波拉",
			Monkey: "芒可",
			Octopus: "奥克托帕斯",
			Tortoise: "托特斯",
			Horse: "霍斯",
			Panda: "胖达",
			Kaola: "考拉",
			Boar: "伯恩",
			Squirrel: "斯奎尔",
			Rabbit: "拉比特",
			Sardine: "沙丁",
			Salmon: "莎尔蒙",
			Sloth: "斯洛兹",
			buffalo: "巴伐罗",
			gnu: "格鲁",
			jellyfish: "杰丽菲诗",
			shark: "沙奎尔",
			crocodile: "克拉克戴尔",
			penguin: "平格温",
			pigeon: "匹金",
			bat: "波特",
			lizard: "李札特",
			mosquito: "马斯奎特",
			frog: "弗洛格",
			squid: "斯奎德",
			lobster: "罗伯斯特",
			ant: "安特",
			butterfly: "巴特弗莱",
			flamingo: "弗拉明戈",
			peacock: "皮科克",
			swan: "斯万",
			spider: "斯派德尔",
			owl: "欧尔",
			ostrich: "奥斯纯齐",
			camel: "凯梅尔",
			crab: "克拉伯",
			mongoose: "芒古斯",
			deer: "迪尔",
			antelope: "艾迪路普",
			mustang: "木斯唐"
		},
			n = Object.keys(t),
			r = t[n[Math.floor(n.length * Math.random())]];
		return e == 1 && (__.cookies.setItem("nickname", r, Infinity, "/", "xpro.im"), console.log("set cookie" + r)), r
	}
	function a(e, t) {
		__.ajax.get("/api/" + e, null, function(e) {
			t(e)
		})
	}
	var t, n, r, i;
	s.prototype.initialize = function() {
		var e = this;
		__.loadCss("http://meet.xpro.im/v2/api/xmeet.api.css");
		var t = '<div id="uxc3402wg2q" class="xmeet-chat-logo">\n	<img width="48" height="48" src="http://meet.xpro.im/v2/api/img/chat.png"/>\n</div>\n',
			r = __.dom.create(t);
		document.body.appendChild(r[0]), __.dom.on(".xmeet-chat-logo img", "click", function(t) {
			e.stopShine(), __.dom.hide(".xmeet-chat-logo");
			var r = e.name = e.nickname || __.cookies.getItem("nickname") || u(!1);
			console.log("get cookie : " + __.cookies.getItem("nickname")), n ? n.show() : e.createChatWindow(r)
		}), e.originTitle = document.title, e.startShine()
	}, s.prototype.startShine = function(e) {
		function r() {
			document.title = "●" + n[t.msgCount] + " " + t.originTitle, t.titleTimer && clearTimeout(t.titleTimer), t.titleTimer = setTimeout(function() {
				document.title = "○" + n[t.msgCount] + " " + t.originTitle, t.titleTimer && clearTimeout(t.titleTimer), t.titleTimer = setTimeout(function() {
					r()
				}, 1e3)
			}, 1e3)
		}
		var t = this,
			n = ["", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑩+"];
		__.dom.css(".xmeet-chat-logo", "background", "#32C8F6"), t.shineTimer && clearTimeout(t.shineTimer), t.shineTimer = setTimeout(function() {
			__.dom.css(".xmeet-chat-logo", "background", "#e0e0e0"), t.shineTimer && clearTimeout(t.shineTimer), t.shineTimer = setTimeout(function() {
				t.startShine()
			}, 500)
		}, 500), e && (t.msgCount += 1, t.msgCount > 10 && (t.msgCount = 10), r())
	}, s.prototype.stopShine = function() {
		this.shineTimer && clearTimeout(this.shineTimer), this.titleTimer && clearTimeout(this.titleTimer), document.title = this.originTitle, this.msgCount = 0
	}, s.prototype.createChatWindow = function(e) {
		var s = this;
		t || (t = new SocketChat(s.name, s.roomId, s.roomName, s.encryption), t.on("connected", function(t) {
			n = new GroupChatWindow(t.roomId, s.roomName, {
				uid: t.from,
				name: e
			}), s.bindChatEvent()
		}), t.on("members", function(e) {
			r = {};
			for (var t = e.content.length; t > 0; t--) {
				var i = e.content[t - 1];
				r[i.pid] = {
					uid: i.pid,
					name: i.nickname
				}
			}
			n && n.updateUsers(r)
		}), t.on("joined", function(e) {
			r[e.from] = {
				uid: e.from,
				name: e.content
			};
			var t = r[e.from];
			 n && n.updateUsers(r), n && !n.isShow && s.startShine(!0)
		}), t.on("leaved", function(e) {
			var t = r[e.from];
			 delete r[e.from], n && n.updateUsers(r), n && !n.isShow && s.startShine(!0)
		}), t.on("changeName", function(e) {
			var t = r[e.from];
			n && n.receiveMessage("activity", t.name + "&nbsp;&nbsp;使用了新名字&nbsp;&nbsp;" + e.content, t), r[e.from] = {
				uid: e.from,
				name: e.content
			}, n && n.updateUsers(r), n && !n.isShow && s.startShine(!0)
		}), t.on("history", function(e) {
			i = {}, e.content.forEach(function(e) {
				var t = r[e.from];
				t || (t = {
					uid: e.from,
					name: o(e.from)
				}), n && n.receiveMessage("history", (new FilterChain(e.payload)).filter("emotionIn"), t, e.send_time)
			}), e.content.length > 0 && n && n.receiveMessage("system", "", {
				uid: ""
			})
		}), t.on("receive", function(e) {
			var t = r[e.from];
			t && (n && n.receiveMessage("message", (new FilterChain(e.content)).filter("emotionIn"), t, e.time), n && !n.isShow && s.startShine(!0))
		}))
	}, s.prototype.bindChatEvent = function() {
		n.on("send", function(e) {
			t.send((new FilterChain(e.message)).filter("emotionOut"))
		}), n.on("changeName", function(e) {
			t.send(e.message)
		}), n.on("hide", function(e) {
			__.dom.show(".xmeet-chat-logo")
		})
	};
	var f = {
		Chat: function(e, t, n, r) {
			var i = new s(e, t, n, r)
		}
	};
	e.XMeet = f, e.addEventListener("load", function() {
		var e = document.getElementsByTagName("script");
		for (var t = 0; t < e.length; t++) {
			var n = e[t],
				r = n.getAttribute("src");
			if (r && r.indexOf("xmeet") != -1) {
				var i = {},
					s = r.split("?");
				if (s.length > 1) {
					var o = s[1].split("&");
					for (var t = 0, u = o.length; t < u; t++) {
						var a = o[t].split("=");
						i[a[0].toLowerCase()] = a[1]
					}
				}
				var f = i.xnest || "",
					l = i.nickname || !1,
					c = i.xnest_name || "",
					h = i.security || !1;
				new XMeet.Chat(f, c, l, h);
				break
			}
		}
	})
})(window);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
		var r = function(e) {
				var t, n = [],
					r = e.length;
				for (t = 0; t !== r; n.push(e[t++]));
				return n
			},
			i = function(e, t, r) {
				n.call(this, e, t, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = i.prototype.render
			},
			s = 1e-10,
			o = n._internals,
			u = o.isSelector,
			a = o.isArray,
			f = i.prototype = n.to({}, .1, {}),
			l = [];
		i.version = "1.16.1", f.constructor = i, f.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf, i.getTweensOf = n.getTweensOf, i.lagSmoothing = n.lagSmoothing, i.ticker = n.ticker, i.render = n.render, f.invalidate = function() {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), n.prototype.invalidate.call(this)
		}, f.updateTo = function(e, t) {
			var r, i = this.ratio,
				s = this.vars.immediateRender || e.immediateRender;
			t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
			for (r in e) this.vars[r] = e[r];
			if (this._initted || s) if (t) this._initted = !1, s && this.render(0, !0, !0);
			else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
				var o = this._time;
				this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
			} else if (this._time > 0 || s) {
				this._initted = !1, this._init();
				for (var u, a = 1 / (1 - i), f = this._firstPT; f;) u = f.s + f.c, f.c *= a, f.s = u - f.c, f = f._next
			}
			return this
		}, f.render = function(e, t, n) {
			this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
			var r, i, u, a, f, c, h, p, d = this._dirty ? this.totalDuration() : this._totalDuration,
				v = this._time,
				m = this._totalTime,
				g = this._cycle,
				y = this._duration,
				b = this._rawPrevTime;
			if (e >= d ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > b || b === s) && b !== e && (n = !0, b > s && (i = "onReverseComplete")), this._rawPrevTime = p = !t || e || b === e ? e : s)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === y && b > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0), this._rawPrevTime = p = !t || e || b === e ? e : s)), this._initted || (n = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (a = y + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 !== (1 & this._cycle) && (this._time = y - this._time), this._time > y ? this._time = y : 0 > this._time && (this._time = 0)), this._easeType ? (f = this._time / y, c = this._easeType, h = this._easePower, (1 === c || 3 === c && f >= .5) && (f = 1 - f), 3 === c && (f *= 2), 1 === h ? f *= f : 2 === h ? f *= f * f : 3 === h ? f *= f * f * f : 4 === h && (f *= f * f * f * f), this.ratio = 1 === c ? 1 - f : 2 === c ? f : .5 > this._time / y ? f / 2 : 1 - f / 2) : this.ratio = this._ease.getRatio(this._time / y)), v === this._time && !n && g === this._cycle) return m !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), void 0;
			if (!this._initted) {
				if (this._init(), !this._initted || this._gc) return;
				if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = v, this._totalTime = m, this._rawPrevTime = b, this._cycle = g, o.lazyTweens.push(this), this._lazy = [e, t], void 0;
				this._time && !r ? this.ratio = this._ease.getRatio(this._time / y) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
			}
			for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== v && e >= 0 && (this._active = !0), 0 === m && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === y) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l))), u = this._firstPT; u;) u.f ? u.t[u.p](u.c * this.ratio + u.s) : u.t[u.p] = u.c * this.ratio + u.s, u = u._next;
			this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._totalTime !== m || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), this._cycle !== g && (t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || l)), i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || l), 0 === y && this._rawPrevTime === s && p !== s && (this._rawPrevTime = 0))
		}, i.to = function(e, t, n) {
			return new i(e, t, n)
		}, i.from = function(e, t, n) {
			return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new i(e, t, n)
		}, i.fromTo = function(e, t, n, r) {
			return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new i(e, t, r)
		}, i.staggerTo = i.allTo = function(e, t, s, o, f, c, h) {
			o = o || 0;
			var p, d, v, m, g = s.delay || 0,
				y = [],
				b = function() {
					s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), f.apply(h || this, c || l)
				};
			for (a(e) || ("string" == typeof e && (e = n.selector(e) || e), u(e) && (e = r(e))), e = e || [], 0 > o && (e = r(e), e.reverse(), o *= -1), p = e.length - 1, v = 0; p >= v; v++) {
				d = {};
				for (m in s) d[m] = s[m];
				d.delay = g, v === p && f && (d.onComplete = b), y[v] = new i(e[v], t, d), g += o
			}
			return y
		}, i.staggerFrom = i.allFrom = function(e, t, n, r, s, o, u) {
			return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, i.staggerTo(e, t, n, r, s, o, u)
		}, i.staggerFromTo = i.allFromTo = function(e, t, n, r, s, o, u, a) {
			return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, i.staggerTo(e, t, r, s, o, u, a)
		}, i.delayedCall = function(e, t, n, r, s) {
			return new i(t, 0, {
				delay: e,
				onComplete: t,
				onCompleteParams: n,
				onCompleteScope: r,
				onReverseComplete: t,
				onReverseCompleteParams: n,
				onReverseCompleteScope: r,
				immediateRender: !1,
				useFrames: s,
				overwrite: 0
			})
		}, i.set = function(e, t) {
			return new i(e, 0, t)
		}, i.isTweening = function(e) {
			return n.getTweensOf(e, !0).length > 0
		};
		var c = function(e, t) {
				for (var r = [], i = 0, s = e._first; s;) s instanceof n ? r[i++] = s : (t && (r[i++] = s), r = r.concat(c(s, t)), i = r.length), s = s._next;
				return r
			},
			h = i.getAllTweens = function(t) {
				return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
			};
		i.killAll = function(e, n, r, i) {
			null == n && (n = !0), null == r && (r = !0);
			var s, o, u, a = h(0 != i),
				f = a.length,
				l = n && r && i;
			for (u = 0; f > u; u++) o = a[u], (l || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && (e ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
		}, i.killChildTweensOf = function(e, t) {
			if (null != e) {
				var s, f, l, c, h, p = o.tweenLookup;
				if ("string" == typeof e && (e = n.selector(e) || e), u(e) && (e = r(e)), a(e)) for (c = e.length; --c > -1;) i.killChildTweensOf(e[c], t);
				else {
					s = [];
					for (l in p) for (f = p[l].target.parentNode; f;) f === e && (s = s.concat(p[l].tweens)), f = f.parentNode;
					for (h = s.length, c = 0; h > c; c++) t && s[c].totalTime(s[c].totalDuration()), s[c]._enabled(!1, !1)
				}
			}
		};
		var p = function(e, n, r, i) {
				n = n !== !1, r = r !== !1, i = i !== !1;
				for (var s, o, u = h(i), a = n && r && i, f = u.length; --f > -1;) o = u[f], (a || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && o.paused(e)
			};
		return i.pauseAll = function(e, t, n) {
			p(!0, e, t, n)
		}, i.resumeAll = function(e, t, n) {
			p(!1, e, t, n)
		}, i.globalTimeScale = function(t) {
			var r = e._rootTimeline,
				i = n.ticker.time;
			return arguments.length ? (t = t || s, r._startTime = i - (i - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, i = n.ticker.frame, r._startTime = i - (i - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
		}, f.progress = function(e) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
		}, f.totalProgress = function(e) {
			return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
		}, f.time = function(e, t) {
			return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
		}, f.duration = function(t) {
			return arguments.length ? e.prototype.duration.call(this, t) : this._duration
		}, f.totalDuration = function(e) {
			return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
		}, f.repeat = function(e) {
			return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
		}, f.repeatDelay = function(e) {
			return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
		}, f.yoyo = function(e) {
			return arguments.length ? (this._yoyo = e, this) : this._yoyo
		}, i
	}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
		var r = function(e) {
				t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
				var n, r, i = this.vars;
				for (r in i) n = i[r], a(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
				a(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
			},
			i = 1e-10,
			s = n._internals,
			o = r._internals = {},
			u = s.isSelector,
			a = s.isArray,
			f = s.lazyTweens,
			l = s.lazyRender,
			c = [],
			h = _gsScope._gsDefine.globals,
			p = function(e) {
				var t, n = {};
				for (t in e) n[t] = e[t];
				return n
			},
			d = o.pauseCallback = function(e, t, n, r) {
				var s, o = e._timeline,
					u = o._totalTime,
					a = e._startTime,
					f = 0 > e._rawPrevTime || 0 === e._rawPrevTime && o._reversed,
					l = f ? 0 : i,
					h = f ? i : 0;
				if (t || !this._forcingPlayhead) {
					for (o.pause(a), s = e._prev; s && s._startTime === a;) s._rawPrevTime = h, s = s._prev;
					for (s = e._next; s && s._startTime === a;) s._rawPrevTime = l, s = s._next;
					t && t.apply(r || o, n || c), (this._forcingPlayhead || !o._paused) && o.seek(u)
				}
			},
			v = function(e) {
				var t, n = [],
					r = e.length;
				for (t = 0; t !== r; n.push(e[t++]));
				return n
			},
			m = r.prototype = new t;
		return r.version = "1.16.1", m.constructor = r, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(e, t, r, i) {
			var s = r.repeat && h.TweenMax || n;
			return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
		}, m.from = function(e, t, r, i) {
			return this.add((r.repeat && h.TweenMax || n).from(e, t, r), i)
		}, m.fromTo = function(e, t, r, i, s) {
			var o = i.repeat && h.TweenMax || n;
			return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
		}, m.staggerTo = function(e, t, i, s, o, a, f, l) {
			var c, h = new r({
				onComplete: a,
				onCompleteParams: f,
				onCompleteScope: l,
				smoothChildTiming: this.smoothChildTiming
			});
			for ("string" == typeof e && (e = n.selector(e) || e), e = e || [], u(e) && (e = v(e)), s = s || 0, 0 > s && (e = v(e), e.reverse(), s *= -1), c = 0; e.length > c; c++) i.startAt && (i.startAt = p(i.startAt)), h.to(e[c], t, p(i), c * s);
			return this.add(h, o)
		}, m.staggerFrom = function(e, t, n, r, i, s, o, u) {
			return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
		}, m.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
			return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(e, t, r, i, s, o, u, a)
		}, m.call = function(e, t, r, i) {
			return this.add(n.delayedCall(0, e, t, r), i)
		}, m.set = function(e, t, r) {
			return r = this._parseTimeOrLabel(r, 0, !0), null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
		}, r.exportRoot = function(e, t) {
			e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
			var i, s, o = new r(e),
				u = o._timeline;
			for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i;) s = i._next, t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
			return u.add(o, 0), o
		}, m.add = function(i, s, o, u) {
			var f, l, c, h, p, d;
			if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
				if (i instanceof Array || i && i.push && a(i)) {
					for (o = o || "normal", u = u || 0, f = s, l = i.length, c = 0; l > c; c++) a(h = i[c]) && (h = new r({
						tweens: h
					})), this.add(h, f), "string" != typeof h && "function" != typeof h && ("sequence" === o ? f = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), f += u;
					return this._uncache(!0)
				}
				if ("string" == typeof i) return this.addLabel(i, s);
				if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
				i = n.delayedCall(0, i)
			}
			if (t.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (p = this, d = p.rawTime() > i._startTime; p._timeline;) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
			return this
		}, m.remove = function(t) {
			if (t instanceof e) return this._remove(t, !1);
			if (t instanceof Array || t && t.push && a(t)) {
				for (var n = t.length; --n > -1;) this.remove(t[n]);
				return this
			}
			return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
		}, m._remove = function(e, n) {
			t.prototype._remove.call(this, e, n);
			var r = this._last;
			return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
		}, m.append = function(e, t) {
			return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
		}, m.insert = m.insertMultiple = function(e, t, n, r) {
			return this.add(e, t || 0, n, r)
		}, m.appendMultiple = function(e, t, n, r) {
			return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
		}, m.addLabel = function(e, t) {
			return this._labels[e] = this._parseTimeOrLabel(t), this
		}, m.addPause = function(e, t, r, i) {
			var s = n.delayedCall(0, d, ["{self}", t, r, i], this);
			return s.data = "isPause", this.add(s, e)
		}, m.removeLabel = function(e) {
			return delete this._labels[e], this
		}, m.getLabelTime = function(e) {
			return null != this._labels[e] ? this._labels[e] : -1
		}, m._parseTimeOrLabel = function(t, n, r, i) {
			var s;
			if (i instanceof e && i.timeline === this) this.remove(i);
			else if (i && (i instanceof Array || i.push && a(i))) for (s = i.length; --s > -1;) i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
			if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
			if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
			else {
				if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
				n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
			}
			return Number(t) + n
		}, m.seek = function(e, t) {
			return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
		}, m.stop = function() {
			return this.paused(!0)
		}, m.gotoAndPlay = function(e, t) {
			return this.play(e, t)
		}, m.gotoAndStop = function(e, t) {
			return this.pause(e, t)
		}, m.render = function(e, t, n) {
			this._gc && this._enabled(!0, !1);
			var r, s, o, u, a, h = this._dirty ? this.totalDuration() : this._totalDuration,
				p = this._time,
				d = this._startTime,
				v = this._timeScale,
				m = this._paused;
			if (e >= h) this._totalTime = this._time = h, this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", a = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > i && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = h + 1e-4;
			else if (1e-7 > e) if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (u = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (a = s = !0, u = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (a = !0), this._rawPrevTime = e;
			else {
				if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, 0 === e && s) for (r = this._first; r && 0 === r._startTime;) r._duration || (s = !1), r = r._next;
				e = 0, this._initted || (a = !0)
			} else this._totalTime = this._time = this._rawPrevTime = e;
			if (this._time !== p && this._first || n || a) {
				if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && e > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || c)), this._time >= p) for (r = this._first; r && (o = r._next, !this._paused || m);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
				else for (r = this._last; r && (o = r._prev, !this._paused || m);)(r._active || p >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
				this._onUpdate && (t || (f.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c))), u && (this._gc || (d === this._startTime || v !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (f.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this.vars[u].apply(this.vars[u + "Scope"] || this, this.vars[u + "Params"] || c)))
			}
		}, m._hasPausedChild = function() {
			for (var e = this._first; e;) {
				if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
				e = e._next
			}
			return !1
		}, m.getChildren = function(e, t, r, i) {
			i = i || -9999999999;
			for (var s = [], o = this._first, u = 0; o;) i > o._startTime || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
			return s
		}, m.getTweensOf = function(e, t) {
			var r, i, s = this._gc,
				o = [],
				u = 0;
			for (s && this._enabled(!0, !0), r = n.getTweensOf(e), i = r.length; --i > -1;)(r[i].timeline === this || t && this._contains(r[i])) && (o[u++] = r[i]);
			return s && this._enabled(!1, !0), o
		}, m.recent = function() {
			return this._recent
		}, m._contains = function(e) {
			for (var t = e.timeline; t;) {
				if (t === this) return !0;
				t = t.timeline
			}
			return !1
		}, m.shiftChildren = function(e, t, n) {
			n = n || 0;
			for (var r, i = this._first, s = this._labels; i;) i._startTime >= n && (i._startTime += e), i = i._next;
			if (t) for (r in s) s[r] >= n && (s[r] += e);
			return this._uncache(!0)
		}, m._kill = function(e, t) {
			if (!e && !t) return this._enabled(!1, !1);
			for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1;) n[r]._kill(e, t) && (i = !0);
			return i
		}, m.clear = function(e) {
			var t = this.getChildren(!1, !0, !0),
				n = t.length;
			for (this._time = this._totalTime = 0; --n > -1;) t[n]._enabled(!1, !1);
			return e !== !1 && (this._labels = {}), this._uncache(!0)
		}, m.invalidate = function() {
			for (var t = this._first; t;) t.invalidate(), t = t._next;
			return e.prototype.invalidate.call(this)
		}, m._enabled = function(e, n) {
			if (e === this._gc) for (var r = this._first; r;) r._enabled(e, !0), r = r._next;
			return t.prototype._enabled.call(this, e, n)
		}, m.totalTime = function() {
			this._forcingPlayhead = !0;
			var t = e.prototype.totalTime.apply(this, arguments);
			return this._forcingPlayhead = !1, t
		}, m.duration = function(e) {
			return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
		}, m.totalDuration = function(e) {
			if (!arguments.length) {
				if (this._dirty) {
					for (var t, n, r = 0, i = this._last, s = 999999999999; i;) t = i._prev, i._dirty && i.totalDuration(), i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime, 0 > i._startTime && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = t;
					this._duration = this._totalDuration = r, this._dirty = !1
				}
				return this._totalDuration
			}
			return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
		}, m.paused = function(t) {
			if (!t) for (var n = this._first, r = this._time; n;) n._startTime === r && "isPause" === n.data && (n._rawPrevTime = 0), n = n._next;
			return e.prototype.paused.apply(this, arguments)
		}, m.usesFrames = function() {
			for (var t = this._timeline; t._timeline;) t = t._timeline;
			return t === e._rootFramesTimeline
		}, m.rawTime = function() {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
		}, r
	}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
		var r = function(t) {
				e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
			},
			i = 1e-10,
			s = [],
			o = t._internals,
			u = o.lazyTweens,
			a = o.lazyRender,
			f = new n(null, null, 1, 0),
			l = r.prototype = new e;
		return l.constructor = r, l.kill()._gc = !1, r.version = "1.16.1", l.invalidate = function() {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
		}, l.addCallback = function(e, n, r, i) {
			return this.add(t.delayedCall(0, e, r, i), n)
		}, l.removeCallback = function(e, t) {
			if (e) if (null == t) this._kill(null, e);
			else for (var n = this.getTweensOf(e, !1), r = n.length, i = this._parseTimeOrLabel(t); --r > -1;) n[r]._startTime === i && n[r]._enabled(!1, !1);
			return this
		}, l.removePause = function(t) {
			return this.removeCallback(e._internals.pauseCallback, t)
		}, l.tweenTo = function(e, n) {
			n = n || {};
			var r, i, o, u = {
				ease: f,
				useFrames: this.usesFrames(),
				immediateRender: !1
			};
			for (i in n) u[i] = n[i];
			return u.time = this._parseTimeOrLabel(e), r = Math.abs(Number(u.time) - this._time) / this._timeScale || .001, o = new t(this, r, u), u.onStart = function() {
				o.target.paused(!0), o.vars.time !== o.target.time() && r === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), n.onStart && n.onStart.apply(n.onStartScope || o, n.onStartParams || s)
			}, o
		}, l.tweenFromTo = function(e, t, n) {
			n = n || {}, e = this._parseTimeOrLabel(e), n.startAt = {
				onComplete: this.seek,
				onCompleteParams: [e],
				onCompleteScope: this
			}, n.immediateRender = n.immediateRender !== !1;
			var r = this.tweenTo(t, n);
			return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
		}, l.render = function(e, t, n) {
			this._gc && this._enabled(!0, !1);
			var r, o, f, l, c, p, d = this._dirty ? this.totalDuration() : this._totalDuration,
				v = this._duration,
				m = this._time,
				g = this._totalTime,
				y = this._startTime,
				b = this._timeScale,
				w = this._rawPrevTime,
				E = this._paused,
				S = this._cycle;
			if (e >= d) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (o = !0, l = "onComplete", c = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > w || w === i) && w !== e && this._first && (c = !0, w > i && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = v, e = v + 1e-4);
			else if (1e-7 > e) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === v && w !== i && (w > 0 || 0 > e && w >= 0) && !this._locked) && (l = "onReverseComplete", o = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = o = !0, l = "onReverseComplete") : w >= 0 && this._first && (c = !0), this._rawPrevTime = e;
			else {
				if (this._rawPrevTime = v || !t || e || this._rawPrevTime === e ? e : i, 0 === e && o) for (r = this._first; r && 0 === r._startTime;) r._duration || (o = !1), r = r._next;
				e = 0, this._initted || (c = !0)
			} else 0 === v && 0 > w && (c = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (p = v + this._repeatDelay, this._cycle = this._totalTime / p >> 0, 0 !== this._cycle && this._cycle === this._totalTime / p && this._cycle--, this._time = this._totalTime - this._cycle * p, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? (this._time = v, e = v + 1e-4) : 0 > this._time ? this._time = e = 0 : e = this._time));
			if (this._cycle !== S && !this._locked) {
				var x = this._yoyo && 0 !== (1 & S),
					T = x === (this._yoyo && 0 !== (1 & this._cycle)),
					N = this._totalTime,
					C = this._cycle,
					k = this._rawPrevTime,
					L = this._time;
				if (this._totalTime = S * v, S > this._cycle ? x = !x : this._totalTime += v, this._time = m, this._rawPrevTime = 0 === v ? w - 1e-4 : w, this._cycle = S, this._locked = !0, m = x ? 0 : v, this.render(m, t, 0 === v), t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s), T && (m = x ? v + 1e-4 : -0.0001, this.render(m, !0, !1)), this._locked = !1, this._paused && !E) return;
				this._time = L, this._totalTime = N, this._cycle = C, this._rawPrevTime = k
			}
			if (!(this._time !== m && this._first || n || c)) return g !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)), void 0;
			if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && e > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= m) for (r = this._first; r && (f = r._next, !this._paused || E);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = f;
			else for (r = this._last; r && (f = r._prev, !this._paused || E);)(r._active || m >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = f;
			this._onUpdate && (t || (u.length && a(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s))), l && (this._locked || this._gc || (y === this._startTime || b !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (o && (u.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || s)))
		}, l.getActive = function(e, t, n) {
			null == e && (e = !0), null == t && (t = !0), null == n && (n = !1);
			var r, i, s = [],
				o = this.getChildren(e, t, n),
				u = 0,
				a = o.length;
			for (r = 0; a > r; r++) i = o[r], i.isActive() && (s[u++] = i);
			return s
		}, l.getLabelAfter = function(e) {
			e || 0 !== e && (e = this._time);
			var t, n = this.getLabelsArray(),
				r = n.length;
			for (t = 0; r > t; t++) if (n[t].time > e) return n[t].name;
			return null
		}, l.getLabelBefore = function(e) {
			null == e && (e = this._time);
			for (var t = this.getLabelsArray(), n = t.length; --n > -1;) if (e > t[n].time) return t[n].name;
			return null
		}, l.getLabelsArray = function() {
			var e, t = [],
				n = 0;
			for (e in this._labels) t[n++] = {
				time: this._labels[e],
				name: e
			};
			return t.sort(function(e, t) {
				return e.time - t.time
			}), t
		}, l.progress = function(e, t) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
		}, l.totalProgress = function(e, t) {
			return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
		}, l.totalDuration = function(t) {
			return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
		}, l.time = function(e, t) {
			return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
		}, l.repeat = function(e) {
			return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
		}, l.repeatDelay = function(e) {
			return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
		}, l.yoyo = function(e) {
			return arguments.length ? (this._yoyo = e, this) : this._yoyo
		}, l.currentLabel = function(e) {
			return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
		}, r
	}, !0), function() {
		var e = 180 / Math.PI,
			t = [],
			n = [],
			r = [],
			i = {},
			s = _gsScope._gsDefine.globals,
			o = function(e, t, n, r) {
				this.a = e, this.b = t, this.c = n, this.d = r, this.da = r - e, this.ca = n - e, this.ba = t - e
			},
			u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			a = function(e, t, n, r) {
				var i = {
					a: e
				},
					s = {},
					o = {},
					u = {
						c: r
					},
					a = (e + t) / 2,
					f = (t + n) / 2,
					l = (n + r) / 2,
					c = (a + f) / 2,
					h = (f + l) / 2,
					p = (h - c) / 8;
				return i.b = a + (e - a) / 4, s.b = c + p, i.c = s.a = (i.b + s.b) / 2, s.c = o.a = (c + h) / 2, o.b = h - p, u.b = l + (r - l) / 4, o.c = u.a = (o.b + u.b) / 2, [i, s, o, u]
			},
			f = function(e, i, s, o, u) {
				var f, l, c, h, p, d, v, m, g, y, b, w, E, S = e.length - 1,
					x = 0,
					T = e[0].a;
				for (f = 0; S > f; f++) p = e[x], l = p.a, c = p.d, h = e[x + 1].d, u ? (b = t[f], w = n[f], E = .25 * (w + b) * i / (o ? .5 : r[f] || .5), d = c - (c - l) * (o ? .5 * i : 0 !== b ? E / b : 0), v = c + (h - c) * (o ? .5 * i : 0 !== w ? E / w : 0), m = c - (d + ((v - d) * (3 * b / (b + w) + .5) / 4 || 0))) : (d = c - .5 * (c - l) * i, v = c + .5 * (h - c) * i, m = c - (d + v) / 2), d += m, v += m, p.c = g = d, p.b = 0 !== f ? T : T = p.a + .6 * (p.c - p.a), p.da = c - l, p.ca = g - l, p.ba = T - l, s ? (y = a(l, T, g, c), e.splice(x, 1, y[0], y[1], y[2], y[3]), x += 4) : x++, T = v;
				p = e[x], p.b = T, p.c = T + .4 * (p.d - T), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = T - p.a, s && (y = a(p.a, T, p.c, p.d), e.splice(x, 1, y[0], y[1], y[2], y[3]))
			},
			l = function(e, r, i, s) {
				var u, a, f, l, c, h, p = [];
				if (s) for (e = [s].concat(e), a = e.length; --a > -1;)"string" == typeof(h = e[a][r]) && "=" === h.charAt(1) && (e[a][r] = s[r] + Number(h.charAt(0) + h.substr(2)));
				if (u = e.length - 2, 0 > u) return p[0] = new o(e[0][r], 0, 0, e[-1 > u ? 0 : 1][r]), p;
				for (a = 0; u > a; a++) f = e[a][r], l = e[a + 1][r], p[a] = new o(f, 0, 0, l), i && (c = e[a + 2][r], t[a] = (t[a] || 0) + (l - f) * (l - f), n[a] = (n[a] || 0) + (c - l) * (c - l));
				return p[a] = new o(e[a][r], 0, 0, e[a + 1][r]), p
			},
			c = function(e, s, o, a, c, h) {
				var p, d, v, m, g, y, b, w, E = {},
					S = [],
					x = h || e[0];
				c = "string" == typeof c ? "," + c + "," : u, null == s && (s = 1);
				for (d in e[0]) S.push(d);
				if (e.length > 1) {
					for (w = e[e.length - 1], b = !0, p = S.length; --p > -1;) if (d = S[p], Math.abs(x[d] - w[d]) > .05) {
						b = !1;
						break
					}
					b && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
				}
				for (t.length = n.length = r.length = 0, p = S.length; --p > -1;) d = S[p], i[d] = -1 !== c.indexOf("," + d + ","), E[d] = l(e, d, i[d], h);
				for (p = t.length; --p > -1;) t[p] = Math.sqrt(t[p]), n[p] = Math.sqrt(n[p]);
				if (!a) {
					for (p = S.length; --p > -1;) if (i[d]) for (v = E[S[p]], y = v.length - 1, m = 0; y > m; m++) g = v[m + 1].da / n[m] + v[m].da / t[m], r[m] = (r[m] || 0) + g * g;
					for (p = r.length; --p > -1;) r[p] = Math.sqrt(r[p])
				}
				for (p = S.length, m = o ? 4 : 1; --p > -1;) d = S[p], v = E[d], f(v, s, o, a, i[d]), b && (v.splice(0, m), v.splice(v.length - m, m));
				return E
			},
			h = function(e, t, n) {
				t = t || "soft";
				var r, i, s, u, a, f, l, c, h, p, d, v = {},
					m = "cubic" === t ? 3 : 2,
					g = "soft" === t,
					y = [];
				if (g && n && (e = [n].concat(e)), null == e || m + 1 > e.length) throw "invalid Bezier data";
				for (h in e[0]) y.push(h);
				for (f = y.length; --f > -1;) {
					for (h = y[f], v[h] = a = [], p = 0, c = e.length, l = 0; c > l; l++) r = null == n ? e[l][h] : "string" == typeof(d = e[l][h]) && "=" === d.charAt(1) ? n[h] + Number(d.charAt(0) + d.substr(2)) : Number(d), g && l > 1 && c - 1 > l && (a[p++] = (r + a[p - 2]) / 2), a[p++] = r;
					for (c = p - m + 1, p = 0, l = 0; c > l; l += m) r = a[l], i = a[l + 1], s = a[l + 2], u = 2 === m ? 0 : a[l + 3], a[p++] = d = 3 === m ? new o(r, i, s, u) : new o(r, (2 * i + r) / 3, (2 * i + s) / 3, s);
					a.length = p
				}
				return v
			},
			p = function(e, t, n) {
				for (var r, i, s, o, u, a, f, l, c, h, p, d = 1 / n, v = e.length; --v > -1;) for (h = e[v], s = h.a, o = h.d - s, u = h.c - s, a = h.b - s, r = i = 0, l = 1; n >= l; l++) f = d * l, c = 1 - f, r = i - (i = (f * f * o + 3 * c * (f * u + c * a)) * f), p = v * n + l - 1, t[p] = (t[p] || 0) + r * r
			},
			d = function(e, t) {
				t = t >> 0 || 6;
				var n, r, i, s, o = [],
					u = [],
					a = 0,
					f = 0,
					l = t - 1,
					c = [],
					h = [];
				for (n in e) p(e[n], o, t);
				for (i = o.length, r = 0; i > r; r++) a += Math.sqrt(o[r]), s = r % t, h[s] = a, s === l && (f += a, s = r / t >> 0, c[s] = h, u[s] = f, a = 0, h = []);
				return {
					length: f,
					lengths: u,
					segments: c
				}
			},
			v = _gsScope._gsDefine.plugin({
				propName: "bezier",
				priority: -1,
				version: "1.3.4",
				API: 2,
				global: !0,
				init: function(e, t, n) {
					this._target = e, t instanceof Array && (t = {
						values: t
					}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
					var r, i, s, o, u, a = t.values || [],
						f = {},
						l = a[0],
						p = t.autoRotate || n.vars.orientToBezier;
					this._autoRotate = p ? p instanceof Array ? p : [
						["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
					] : null;
					for (r in l) this._props.push(r);
					for (s = this._props.length; --s > -1;) r = this._props[s], this._overwriteProps.push(r), i = this._func[r] = "function" == typeof e[r], f[r] = i ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), u || f[r] !== a[0][r] && (u = f);
					if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? c(a, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, u) : h(a, t.type, f), this._segCount = this._beziers[r].length, this._timeRes) {
						var v = d(this._beziers, this._timeRes);
						this._length = v.length, this._lengths = v.lengths, this._segments = v.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
					}
					if (p = this._autoRotate) for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
						for (o = 0; 3 > o; o++) r = p[s][o], this._func[r] = "function" == typeof e[r] ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)] : !1;
						r = p[s][2], this._initialRotations[s] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
					}
					return this._startRatio = n.vars.runBackwards ? 1 : 0, !0
				},
				set: function(t) {
					var n, r, i, s, o, u, a, f, l, c, h = this._segCount,
						p = this._func,
						d = this._target,
						v = t !== this._startRatio;
					if (this._timeRes) {
						if (l = this._lengths, c = this._curSeg, t *= this._length, i = this._li, t > this._l2 && h - 1 > i) {
							for (f = h - 1; f > i && t >= (this._l2 = l[++i]););
							this._l1 = l[i - 1], this._li = i, this._curSeg = c = this._segments[i], this._s2 = c[this._s1 = this._si = 0]
						} else if (this._l1 > t && i > 0) {
							for (; i > 0 && (this._l1 = l[--i]) >= t;);
							0 === i && this._l1 > t ? this._l1 = 0 : i++, this._l2 = l[i], this._li = i, this._curSeg = c = this._segments[i], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
						}
						if (n = i, t -= this._l1, i = this._si, t > this._s2 && c.length - 1 > i) {
							for (f = c.length - 1; f > i && t >= (this._s2 = c[++i]););
							this._s1 = c[i - 1], this._si = i
						} else if (this._s1 > t && i > 0) {
							for (; i > 0 && (this._s1 = c[--i]) >= t;);
							0 === i && this._s1 > t ? this._s1 = 0 : i++, this._s2 = c[i], this._si = i
						}
						u = (i + (t - this._s1) / (this._s2 - this._s1)) * this._prec
					} else n = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, u = (t - n * (1 / h)) * h;
					for (r = 1 - u, i = this._props.length; --i > -1;) s = this._props[i], o = this._beziers[s][n], a = (u * u * o.da + 3 * r * (u * o.ca + r * o.ba)) * u + o.a, this._round[s] && (a = Math.round(a)), p[s] ? d[s](a) : d[s] = a;
					if (this._autoRotate) {
						var m, g, y, b, w, E, S, x = this._autoRotate;
						for (i = x.length; --i > -1;) s = x[i][2], E = x[i][3] || 0, S = x[i][4] === !0 ? 1 : e, o = this._beziers[x[i][0]], m = this._beziers[x[i][1]], o && m && (o = o[n], m = m[n], g = o.a + (o.b - o.a) * u, b = o.b + (o.c - o.b) * u, g += (b - g) * u, b += (o.c + (o.d - o.c) * u - b) * u, y = m.a + (m.b - m.a) * u, w = m.b + (m.c - m.b) * u, y += (w - y) * u, w += (m.c + (m.d - m.c) * u - w) * u, a = v ? Math.atan2(w - y, b - g) * S + E : this._initialRotations[i], p[s] ? d[s](a) : d[s] = a)
					}
				}
			}),
			m = v.prototype;
		v.bezierThrough = c, v.cubicToQuadratic = a, v._autoCSS = !0, v.quadraticToCubic = function(e, t, n) {
			return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
		}, v._cssRegister = function() {
			var e = s.CSSPlugin;
			if (e) {
				var t = e._internals,
					n = t._parseToProxy,
					r = t._setPluginRatio,
					i = t.CSSPropTween;
				t._registerComplexSpecialProp("bezier", {
					parser: function(e, t, s, o, u, a) {
						t instanceof Array && (t = {
							values: t
						}), a = new v;
						var f, l, c, h = t.values,
							p = h.length - 1,
							d = [],
							m = {};
						if (0 > p) return u;
						for (f = 0; p >= f; f++) c = n(e, h[f], o, u, a, p !== f), d[f] = c.end;
						for (l in t) m[l] = t[l];
						return m.values = d, u = new i(e, "bezier", 0, 0, c.pt, 2), u.data = c, u.plugin = a, u.setRatio = r, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (f = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
							["left", "top", "rotation", f, !1]
						] : null != c.end.x ? [
							["x", "y", "rotation", f, !1]
						] : !1), m.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform), a._onInitTween(c.proxy, m, o._tween), u
					}
				})
			}
		}, m._roundProps = function(e, t) {
			for (var n = this._overwriteProps, r = n.length; --r > -1;)(e[n[r]] || e.bezier || e.bezierThrough) && (this._round[n[r]] = t)
		}, m._kill = function(e) {
			var t, n, r = this._props;
			for (t in this._beziers) if (t in e) for (delete this._beziers[t], delete this._func[t], n = r.length; --n > -1;) r[n] === t && r.splice(n, 1);
			return this._super._kill.call(this, e)
		}
	}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
		var n, r, i, s, o = function() {
				e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
			},
			u = _gsScope._gsDefine.globals,
			a = {},
			f = o.prototype = new e("css");
		f.constructor = o, o.version = "1.16.1", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", f = "px", o.suffixMap = {
			top: f,
			right: f,
			bottom: f,
			left: f,
			width: f,
			height: f,
			fontSize: f,
			padding: f,
			margin: f,
			perspective: f,
			lineHeight: ""
		};
		var l, c, h, p, d, v, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
			g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
			b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
			w = /(?:\d|\-|\+|=|#|\.)*/g,
			E = /opacity *= *([^)]*)/i,
			S = /opacity:([^;]*)/i,
			x = /alpha\(opacity *=.+?\)/i,
			T = /^(rgb|hsl)/,
			N = /([A-Z])/g,
			C = /-([a-z])/gi,
			k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
			L = function(e, t) {
				return t.toUpperCase()
			},
			A = /(?:Left|Right|Width)/i,
			O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_ = /,(?=[^\)]*(?:\(|$))/gi,
			D = Math.PI / 180,
			P = 180 / Math.PI,
			H = {},
			B = document,
			j = function(e) {
				return B.createElementNS ? B.createElementNS("http://www.w3.org/1999/xhtml", e) : B.createElement(e)
			},
			F = j("div"),
			I = j("img"),
			q = o._internals = {
				_specialProps: a
			},
			R = navigator.userAgent,
			U = function() {
				var e = R.indexOf("Android"),
					t = j("a");
				return h = -1 !== R.indexOf("Safari") && -1 === R.indexOf("Chrome") && (-1 === e || Number(R.substr(e + 8, 1)) > 3), d = h && 6 > Number(R.substr(R.indexOf("Version/") + 8, 1)), p = -1 !== R.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(R) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(R)) && (v = parseFloat(RegExp.$1)), t ? (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity)) : !1
			}(),
			z = function(e) {
				return E.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
			},
			W = function(e) {
				window.console && console.log(e)
			},
			X = "",
			V = "",
			$ = function(e, t) {
				t = t || F;
				var n, r, i = t.style;
				if (void 0 !== i[e]) return e;
				for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e];);
				return r >= 0 ? (V = 3 === r ? "ms" : n[r], X = "-" + V.toLowerCase() + "-", V + e) : null
			},
			J = B.defaultView ? B.defaultView.getComputedStyle : function() {},
			K = o.getStyle = function(e, t, n, r, i) {
				var s;
				return U || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || J(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(N, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : z(e)
			},
			Q = q.convertToPixels = function(e, n, r, i, s) {
				if ("px" === i || !i) return r;
				if ("auto" === i || !r) return 0;
				var u, a, f, l = A.test(n),
					c = e,
					h = F.style,
					p = 0 > r;
				if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) u = r / 100 * (l ? e.clientWidth : e.clientHeight);
				else {
					if (h.cssText = "border:0 solid red;position:" + K(e, "position") + ";line-height:0;", "%" !== i && c.appendChild) h[l ? "borderLeftWidth" : "borderTopWidth"] = r + i;
					else {
						if (c = e.parentNode || B.body, a = c._gsCache, f = t.ticker.frame, a && l && a.time === f) return a.width * r / 100;
						h[l ? "width" : "height"] = r + i
					}
					c.appendChild(F), u = parseFloat(F[l ? "offsetWidth" : "offsetHeight"]), c.removeChild(F), l && "%" === i && o.cacheWidths !== !1 && (a = c._gsCache = c._gsCache || {}, a.time = f, a.width = 100 * (u / r)), 0 !== u || s || (u = Q(e, n, r, i, !0))
				}
				return p ? -u : u
			},
			G = q.calculateOffset = function(e, t, n) {
				if ("absolute" !== K(e, "position", n)) return 0;
				var r = "left" === t ? "Left" : "Top",
					i = K(e, "margin" + r, n);
				return e["offset" + r] - (Q(e, t, parseFloat(i), i.replace(w, "")) || 0)
			},
			Y = function(e, t) {
				var n, r, i, s = {};
				if (t = t || J(e, null)) if (n = t.length) for (; --n > -1;) i = t[n], (-1 === i.indexOf("-transform") || xt === i) && (s[i.replace(C, L)] = t.getPropertyValue(i));
				else for (n in t)(-1 === n.indexOf("Transform") || St === n) && (s[n] = t[n]);
				else if (t = e.currentStyle || e.style) for (n in t)"string" == typeof n && void 0 === s[n] && (s[n.replace(C, L)] = t[n]);
				return U || (s.opacity = z(e)), r = _t(e, t, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, Nt && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
			},
			Z = function(e, t, n, r, i) {
				var s, o, u, a = {},
					f = e.style;
				for (o in n)"cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : G(e, o), void 0 !== f[o] && (u = new pt(f, o, f[o], u)));
				if (r) for (o in r)"className" !== o && (a[o] = r[o]);
				return {
					difs: a,
					firstMPT: u
				}
			},
			et = {
				width: ["Left", "Right"],
				height: ["Top", "Bottom"]
			},
			tt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
			nt = function(e, t, n) {
				var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
					i = et[t],
					s = i.length;
				for (n = n || J(e, null); --s > -1;) r -= parseFloat(K(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat(K(e, "border" + i[s] + "Width", n, !0)) || 0;
				return r
			},
			rt = function(e, t) {
				(null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
				var n = e.split(" "),
					r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
					i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
				return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e = r + " " + i + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(i.replace(b, "")), t.v = e), t || e
			},
			it = function(e, t) {
				return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
			},
			st = function(e, t) {
				return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
			},
			ot = function(e, t, n, r) {
				var i, s, o, u, a, f = 1e-6;
				return null == e ? u = t : "number" == typeof e ? u = e : (i = 360, s = e.split("_"), a = "=" === e.charAt(1), o = (a ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : P) - (a ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (0 | o / i) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (0 | o / i) * i)), u = t + o), f > u && u > -f && (u = 0), u
			},
			ut = {
				aqua: [0, 255, 255],
				lime: [0, 255, 0],
				silver: [192, 192, 192],
				black: [0, 0, 0],
				maroon: [128, 0, 0],
				teal: [0, 128, 128],
				blue: [0, 0, 255],
				navy: [0, 0, 128],
				white: [255, 255, 255],
				fuchsia: [255, 0, 255],
				olive: [128, 128, 0],
				yellow: [255, 255, 0],
				orange: [255, 165, 0],
				gray: [128, 128, 128],
				purple: [128, 0, 128],
				green: [0, 128, 0],
				red: [255, 0, 0],
				pink: [255, 192, 203],
				cyan: [0, 255, 255],
				transparent: [255, 255, 255, 0]
			},
			at = function(e, t, n) {
				return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
			},
			ft = o.parseColor = function(e) {
				var t, n, r, i, s, o;
				return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ut[e] ? ut[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(m), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = .5 >= o ? o * (s + 1) : o + s - o * s, t = 2 * o - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = at(i + 1 / 3, t, n), e[1] = at(i, t, n), e[2] = at(i - 1 / 3, t, n), e) : (e = e.match(m) || ut.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : ut.black
			},
			lt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
		for (f in ut) lt += "|" + f + "\\b";
		lt = RegExp(lt + ")", "gi");
		var ct = function(e, t, n, r) {
				if (null == e) return function(e) {
					return e
				};
				var i, s = t ? (e.match(lt) || [""])[0] : "",
					o = e.split(s).join("").match(y) || [],
					u = e.substr(0, e.indexOf(o[0])),
					a = ")" === e.charAt(e.length - 1) ? ")" : "",
					f = -1 !== e.indexOf(" ") ? " " : ",",
					l = o.length,
					c = l > 0 ? o[0].replace(m, "") : "";
				return l ? i = t ?
				function(e) {
					var t, h, p, d;
					if ("number" == typeof e) e += c;
					else if (r && __.test(e)) {
						for (d = e.replace(_, "|").split("|"), p = 0; d.length > p; p++) d[p] = i(d[p]);
						return d.join(",")
					}
					if (t = (e.match(lt) || [s])[0], h = e.split(t).join("").match(y) || [], p = h.length, l > p--) for (; l > ++p;) h[p] = n ? h[0 | (p - 1) / 2] : o[p];
					return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
				} : function(e) {
					var t, s, h;
					if ("number" == typeof e) e += c;
					else if (r && __.test(e)) {
						for (s = e.replace(_, "|").split("|"), h = 0; s.length > h; h++) s[h] = i(s[h]);
						return s.join(",")
					}
					if (t = e.match(y) || [], h = t.length, l > h--) for (; l > ++h;) t[h] = n ? t[0 | (h - 1) / 2] : o[h];
					return u + t.join(f) + a
				} : function(e) {
					return e
				}
			},
			ht = function(e) {
				return e = e.split(","), function(t, n, r, i, s, o, u) {
					var a, f = (n + "").split(" ");
					for (u = {}, a = 0; 4 > a; a++) u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
					return i.parse(t, u, s, o)
				}
			},
			pt = (q._setPluginRatio = function(e) {
				this.plugin.setRatio(e);
				for (var t, n, r, i, s = this.data, o = s.proxy, u = s.firstMPT, a = 1e-6; u;) t = o[u.v], u.r ? t = Math.round(t) : a > t && t > -a && (t = 0), u.t[u.p] = t, u = u._next;
				if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === e) for (u = s.firstMPT; u;) {
					if (n = u.t, n.type) {
						if (1 === n.type) {
							for (i = n.xs0 + n.s + n.xs1, r = 1; n.l > r; r++) i += n["xn" + r] + n["xs" + (r + 1)];
							n.e = i
						}
					} else n.e = n.s + n.xs0;
					u = u._next
				}
			}, function(e, t, n, r, i) {
				this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
			}),
			dt = (q._parseToProxy = function(e, t, n, r, i, s) {
				var o, u, a, f, l, c = r,
					h = {},
					p = {},
					d = n._transform,
					v = H;
				for (n._transform = null, H = t, r = l = n.parse(e, t, r, i), H = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
					if (1 >= r.type && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new pt(r, "s", u, f, r.r), r.c = 0), 1 === r.type)) for (o = r.l; --o > 0;) a = "xn" + o, u = r.p + "_" + a, p[u] = r.data[a], h[u] = r[a], s || (f = new pt(r, a, u, f, r.rxp[a]));
					r = r._next
				}
				return {
					proxy: h,
					end: p,
					firstMPT: f,
					pt: l
				}
			}, q.CSSPropTween = function(e, t, r, i, o, u, a, f, l, c, h) {
				this.t = e, this.p = t, this.s = r, this.c = i, this.n = a || t, e instanceof dt || s.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, n = !0), this.b = void 0 === c ? r : c, this.e = void 0 === h ? r + i : h, o && (this._next = o, o._prev = this)
			}),
			vt = o.parseComplex = function(e, t, n, r, i, s, o, u, a, f) {
				n = n || s || "", o = new dt(e, t, 0, 0, o, f ? 2 : 1, null, !1, u, n, r), r += "";
				var c, h, p, d, v, y, b, w, E, S, x, N, C = n.split(", ").join(",").split(" "),
					k = r.split(", ").join(",").split(" "),
					L = C.length,
					A = l !== !1;
				for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(_, ", ").split(" "), k = k.join(" ").replace(_, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = f, c = 0; L > c; c++) if (d = C[c], v = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, it(v, w), v.replace(g, ""), A && -1 !== v.indexOf("px"), !0);
				else if (i && ("#" === d.charAt(0) || ut[d] || T.test(d))) N = "," === v.charAt(v.length - 1) ? ")," : ")", d = ft(d), v = ft(v), E = d.length + v.length > 6, E && !U && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (U || (E = !1), o.appendXtra(E ? "rgba(" : "rgb(", d[0], v[0] - d[0], ",", !0, !0).appendXtra("", d[1], v[1] - d[1], ",", !0).appendXtra("", d[2], v[2] - d[2], E ? "," : N, !0), E && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > v.length ? 1 : v[3]) - d, N, !1)));
				else if (y = d.match(m)) {
					if (b = v.match(g), !b || b.length !== y.length) return o;
					for (p = 0, h = 0; y.length > h; h++) x = y[h], S = d.indexOf(x, p), o.appendXtra(d.substr(p, S - p), Number(x), it(b[h], x), "", A && "px" === d.substr(S + x.length, 2), 0 === h), p = S + x.length;
					o["xs" + o.l] += d.substr(p)
				} else o["xs" + o.l] += o.l ? " " + d : d;
				if (-1 !== r.indexOf("=") && o.data) {
					for (N = o.xs0 + o.data.s, c = 1; o.l > c; c++) N += o["xs" + c] + o.data["xn" + c];
					o.e = N + o["xs" + c]
				}
				return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
			},
			mt = 9;
		for (f = dt.prototype, f.l = f.pr = 0; --mt > 0;) f["xn" + mt] = 0, f["xs" + mt] = "";
		f.xs0 = "", f._next = f._prev = f.xfirst = f.data = f.plugin = f.setRatio = f.rxp = null, f.appendXtra = function(e, t, n, r, i, s) {
			var o = this,
				u = o.l;
			return o["xs" + u] += s && u ? " " + e : e || "", n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
				s: t + n
			}, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
		};
		var gt = function(e, t) {
				t = t || {}, this.p = t.prefix ? $(e) || e : e, a[e] = a[this.p] = this, this.format = t.formatter || ct(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
			},
			yt = q._registerComplexSpecialProp = function(e, t, n) {
				"object" != typeof t && (t = {
					parser: n
				});
				var r, i, s = e.split(","),
					o = t.defaultValue;
				for (n = n || [o], r = 0; s.length > r; r++) t.prefix = 0 === r && t.prefix, t.defaultValue = n[r] || o, i = new gt(s[r], t)
			},
			bt = function(e) {
				if (!a[e]) {
					var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
					yt(e, {
						parser: function(e, n, r, i, s, o, f) {
							var l = u.com.greensock.plugins[t];
							return l ? (l._cssRegister(), a[r].parse(e, n, r, i, s, o, f)) : (W("Error: " + t + " js file not loaded."), s)
						}
					})
				}
			};
		f = gt.prototype, f.parseComplex = function(e, t, n, r, i, s) {
			var o, u, a, f, l, c, h = this.keyword;
			if (this.multi && (__.test(n) || __.test(t) ? (u = t.replace(_, "|").split("|"), a = n.replace(_, "|").split("|")) : h && (u = [t], a = [n])), a) {
				for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++) t = u[o] = u[o] || this.dflt, n = a[o] = a[o] || this.dflt, h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (-1 === c ? u[o] = u[o].split(h).join("") : -1 === l && (u[o] += " " + h)));
				t = u.join(", "), n = a.join(", ")
			}
			return vt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
		}, f.parse = function(e, t, n, r, s, o) {
			return this.parseComplex(e.style, this.format(K(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
		}, o.registerSpecialProp = function(e, t, n) {
			yt(e, {
				parser: function(e, r, i, s, o, u) {
					var a = new dt(e, i, 0, 0, o, 2, i, !1, n);
					return a.plugin = u, a.setRatio = t(e, r, s._tween, i), a
				},
				priority: n
			})
		}, o.useSVGTransformAttr = h;
		var wt, Et = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
			St = $("transform"),
			xt = X + "transform",
			Tt = $("transformOrigin"),
			Nt = null !== $("perspective"),
			Ct = q.Transform = function() {
				this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Nt ? o.defaultForce3D || "auto" : !1
			},
			kt = window.SVGElement,
			Lt = function(e, t, n) {
				var r, i = B.createElementNS("http://www.w3.org/2000/svg", e),
					s = /([a-z])([A-Z])/g;
				for (r in n) i.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), n[r]);
				return t.appendChild(i), i
			},
			At = B.documentElement,
			Ot = function() {
				var e, t, n, r = v || /Android/i.test(R) && !window.chrome;
				return B.createElementNS && !r && (e = Lt("svg", At), t = Lt("rect", e, {
					width: 100,
					height: 50,
					x: 100
				}), n = t.getBoundingClientRect().width, t.style[Tt] = "50% 50%", t.style[St] = "scaleX(0.5)", r = n === t.getBoundingClientRect().width && (!p || !Nt), At.removeChild(e)), r
			}(),
			Mt = function(e, t, n, r) {
				var i, s;
				r && (s = r.split(" ")).length || (i = e.getBBox(), t = rt(t).split(" "), s = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * i.width : parseFloat(t[0])) + i.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * i.height : parseFloat(t[1])) + i.y]), n.xOrigin = parseFloat(s[0]), n.yOrigin = parseFloat(s[1]), e.setAttribute("data-svg-origin", s.join(" "))
			},
			_t = q.getTransform = function(e, t, n, r) {
				if (e._gsTransform && n && !r) return e._gsTransform;
				var s, u, a, f, l, c, h, p, d, v, m = n ? e._gsTransform || new Ct : new Ct,
					g = 0 > m.scaleX,
					y = 2e-5,
					b = 1e5,
					w = Nt ? parseFloat(K(e, Tt, t, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
					E = parseFloat(o.defaultTransformPerspective) || 0;
				if (St ? u = K(e, xt, t, !0) : e.currentStyle && (u = e.currentStyle.filter.match(O), u = u && 4 === u.length ? [u[0].substr(4), Number(u[2].substr(4)), Number(u[1].substr(4)), u[3].substr(4), m.x || 0, m.y || 0].join(",") : ""), s = !u || "none" === u || "matrix(1, 0, 0, 1, 0, 0)" === u, m.svg = !! (kt && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM)), m.svg && (s && -1 !== (e.style[St] + "").indexOf("matrix") && (u = e.style[St], s = !1), Mt(e, K(e, Tt, i, !1, "50% 50%") + "", m, e.getAttribute("data-svg-origin")), wt = o.useSVGTransformAttr || Ot, a = e.getAttribute("transform"), s && a && -1 !== a.indexOf("matrix") && (u = a, s = 0)), !s) {
					for (a = (u || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], f = a.length; --f > -1;) l = Number(a[f]), a[f] = (c = l - (l |= 0)) ? (0 | c * b + (0 > c ? -0.5 : .5)) / b + l : l;
					if (16 === a.length) {
						var S, x, T, N, C, k = a[0],
							L = a[1],
							A = a[2],
							M = a[3],
							_ = a[4],
							D = a[5],
							H = a[6],
							B = a[7],
							j = a[8],
							F = a[9],
							I = a[10],
							q = a[12],
							R = a[13],
							U = a[14],
							z = a[11],
							W = Math.atan2(H, I);
						m.zOrigin && (U = -m.zOrigin, q = j * U - a[12], R = F * U - a[13], U = I * U + m.zOrigin - a[14]), m.rotationX = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), S = _ * N + j * C, x = D * N + F * C, T = H * N + I * C, j = _ * -C + j * N, F = D * -C + F * N, I = H * -C + I * N, z = B * -C + z * N, _ = S, D = x, H = T), W = Math.atan2(j, I), m.rotationY = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), S = k * N - j * C, x = L * N - F * C, T = A * N - I * C, F = L * C + F * N, I = A * C + I * N, z = M * C + z * N, k = S, L = x, A = T), W = Math.atan2(L, k), m.rotation = W * P, W && (N = Math.cos(-W), C = Math.sin(-W), k = k * N + _ * C, x = L * N + D * C, D = L * -C + D * N, H = A * -C + H * N, L = x), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY += 180), m.scaleX = (0 | Math.sqrt(k * k + L * L) * b + .5) / b, m.scaleY = (0 | Math.sqrt(D * D + F * F) * b + .5) / b, m.scaleZ = (0 | Math.sqrt(H * H + I * I) * b + .5) / b, m.skewX = 0, m.perspective = z ? 1 / (0 > z ? -z : z) : 0, m.x = q, m.y = R, m.z = U, m.svg && (m.x -= m.xOrigin - (m.xOrigin * k - m.yOrigin * _), m.y -= m.yOrigin - (m.yOrigin * L - m.xOrigin * D))
					} else if (!(Nt && !r && a.length && m.x === a[4] && m.y === a[5] && (m.rotationX || m.rotationY) || void 0 !== m.x && "none" === K(e, "display", t))) {
						var X = a.length >= 6,
							V = X ? a[0] : 1,
							$ = a[1] || 0,
							J = a[2] || 0,
							Q = X ? a[3] : 1;
						m.x = a[4] || 0, m.y = a[5] || 0, h = Math.sqrt(V * V + $ * $), p = Math.sqrt(Q * Q + J * J), d = V || $ ? Math.atan2($, V) * P : m.rotation || 0, v = J || Q ? Math.atan2(J, Q) * P + d : m.skewX || 0, Math.abs(v) > 90 && 270 > Math.abs(v) && (g ? (h *= -1, v += 0 >= d ? 180 : -180, d += 0 >= d ? 180 : -180) : (p *= -1, v += 0 >= v ? 180 : -180)), m.scaleX = h, m.scaleY = p, m.rotation = d, m.skewX = v, Nt && (m.rotationX = m.rotationY = m.z = 0, m.perspective = E, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * V - m.yOrigin * $), m.y -= m.yOrigin - (m.yOrigin * Q - m.xOrigin * J))
					}
					m.zOrigin = w;
					for (f in m) y > m[f] && m[f] > -y && (m[f] = 0)
				}
				return n && (e._gsTransform = m, m.svg && (wt && e.style[St] ? Bt(e.style, St) : !wt && e.getAttribute("transform") && e.removeAttribute("transform"))), m
			},
			Dt = function(e) {
				var t, n, r = this.data,
					i = -r.rotation * D,
					s = i + r.skewX * D,
					o = 1e5,
					u = (0 | Math.cos(i) * r.scaleX * o) / o,
					a = (0 | Math.sin(i) * r.scaleX * o) / o,
					f = (0 | Math.sin(s) * -r.scaleY * o) / o,
					l = (0 | Math.cos(s) * r.scaleY * o) / o,
					c = this.t.style,
					h = this.t.currentStyle;
				if (h) {
					n = a, a = -f, f = -n, t = h.filter, c.filter = "";
					var p, d, m = this.t.offsetWidth,
						g = this.t.offsetHeight,
						y = "absolute" !== h.position,
						b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
						S = r.x + m * r.xPercent / 100,
						x = r.y + g * r.yPercent / 100;
					if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, S += p - (p * u + d * a), x += d - (p * f + d * l)), y ? (p = m / 2, d = g / 2, b += ", Dx=" + (p - (p * u + d * a) + S) + ", Dy=" + (d - (p * f + d * l) + x) + ")") : b += ", sizingMethod='auto expand')", c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(M, b) : b + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === b.indexOf("Dx=0, Dy=0") || E.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
						var T, N, C, k = 8 > v ? 1 : -1;
						for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), mt = 0; 4 > mt; mt++) N = tt[mt], T = h[N], n = -1 !== T.indexOf("px") ? parseFloat(T) : Q(this.t, N, parseFloat(T), T.replace(w, "")) || 0, C = n !== r[N] ? 2 > mt ? -r.ieOffsetX : -r.ieOffsetY : 2 > mt ? p - r.ieOffsetX : d - r.ieOffsetY, c[N] = (r[N] = Math.round(n - C * (0 === mt || 2 === mt ? 1 : k))) + "px"
					}
				}
			},
			Pt = q.set3DTransformRatio = q.setTransformRatio = function(e) {
				var t, n, r, i, s, o, u, a, f, l, c, h, d, v, m, g, y, b, w, E, S, x, T, N = this.data,
					C = this.t.style,
					k = N.rotation,
					L = N.rotationX,
					A = N.rotationY,
					O = N.scaleX,
					M = N.scaleY,
					_ = N.scaleZ,
					P = N.x,
					H = N.y,
					B = N.z,
					j = N.svg,
					F = N.perspective,
					I = N.force3D;
				if (!((1 !== e && 0 !== e || "auto" !== I || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && I || B || F || A || L) || !! wt && !! j || !Nt) return k || N.skewX || j ? (k *= D, x = N.skewX * D, T = 1e5, t = Math.cos(k) * O, i = Math.sin(k) * O, n = Math.sin(k - x) * -M, s = Math.cos(k - x) * M, x && "simple" === N.skewType && (y = Math.tan(x), y = Math.sqrt(1 + y * y), n *= y, s *= y, N.skewY && (t *= y, i *= y)), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n), H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s), v = 1e-6, v > P && P > -v && (P = 0), v > H && H > -v && (H = 0)), w = (0 | t * T) / T + "," + (0 | i * T) / T + "," + (0 | n * T) / T + "," + (0 | s * T) / T + "," + P + "," + H + ")", j && wt ? this.t.setAttribute("transform", "matrix(" + w) : C[St] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + w) : C[St] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + M + "," + P + "," + H + ")", void 0;
				if (p && (v = 1e-4, v > O && O > -v && (O = _ = 2e-5), v > M && M > -v && (M = _ = 2e-5), !F || N.z || N.rotationX || N.rotationY || (F = 0)), k || N.skewX) k *= D, m = t = Math.cos(k), g = i = Math.sin(k), N.skewX && (k -= N.skewX * D, m = Math.cos(k), g = Math.sin(k), "simple" === N.skewType && (y = Math.tan(N.skewX * D), y = Math.sqrt(1 + y * y), m *= y, g *= y, N.skewY && (t *= y, i *= y))), n = -g, s = m;
				else {
					if (!(A || L || 1 !== _ || F || j)) return C[St] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) translate3d(" : "translate3d(") + P + "px," + H + "px," + B + "px)" + (1 !== O || 1 !== M ? " scale(" + O + "," + M + ")" : ""), void 0;
					t = s = 1, n = i = 0
				}
				f = 1, r = o = u = a = l = c = 0, h = F ? -1 / F : 0, d = N.zOrigin, v = 1e-6, E = ",", S = "0", k = A * D, k && (m = Math.cos(k), g = Math.sin(k), u = -g, l = h * -g, r = t * g, o = i * g, f = m, h *= m, t *= m, i *= m), k = L * D, k && (m = Math.cos(k), g = Math.sin(k), y = n * m + r * g, b = s * m + o * g, a = f * g, c = h * g, r = n * -g + r * m, o = s * -g + o * m, f *= m, h *= m, n = y, s = b), 1 !== _ && (r *= _, o *= _, f *= _, h *= _), 1 !== M && (n *= M, s *= M, a *= M, c *= M), 1 !== O && (t *= O, i *= O, u *= O, l *= O), (d || j) && (d && (P += r * -d, H += o * -d, B += f * -d + d), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n), H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s)), v > P && P > -v && (P = S), v > H && H > -v && (H = S), v > B && B > -v && (B = 0)), w = N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix3d(" : "matrix3d(", w += (v > t && t > -v ? S : t) + E + (v > i && i > -v ? S : i) + E + (v > u && u > -v ? S : u), w += E + (v > l && l > -v ? S : l) + E + (v > n && n > -v ? S : n) + E + (v > s && s > -v ? S : s), L || A ? (w += E + (v > a && a > -v ? S : a) + E + (v > c && c > -v ? S : c) + E + (v > r && r > -v ? S : r), w += E + (v > o && o > -v ? S : o) + E + (v > f && f > -v ? S : f) + E + (v > h && h > -v ? S : h) + E) : w += ",0,0,0,0,1,0,", w += P + E + H + E + B + E + (F ? 1 + -B / F : 1) + ")", C[St] = w
			};
		f = Ct.prototype, f.x = f.y = f.z = f.skewX = f.skewY = f.rotation = f.rotationX = f.rotationY = f.zOrigin = f.xPercent = f.yPercent = 0, f.scaleX = f.scaleY = f.scaleZ = 1, yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
			parser: function(e, t, n, r, s, u, a) {
				if (r._lastParsedTransform === a) return s;
				r._lastParsedTransform = a;
				var f, l, c, h, p, d, v, m = r._transform = _t(e, i, !0, a.parseTransform),
					g = e.style,
					y = 1e-6,
					b = Et.length,
					w = a,
					E = {};
				if ("string" == typeof w.transform && St) c = F.style, c[St] = w.transform, c.display = "block", c.position = "absolute", B.body.appendChild(F), f = _t(F, null, !1), B.body.removeChild(F);
				else if ("object" == typeof w) {
					if (f = {
						scaleX: st(null != w.scaleX ? w.scaleX : w.scale, m.scaleX),
						scaleY: st(null != w.scaleY ? w.scaleY : w.scale, m.scaleY),
						scaleZ: st(w.scaleZ, m.scaleZ),
						x: st(w.x, m.x),
						y: st(w.y, m.y),
						z: st(w.z, m.z),
						xPercent: st(w.xPercent, m.xPercent),
						yPercent: st(w.yPercent, m.yPercent),
						perspective: st(w.transformPerspective, m.perspective)
					}, v = w.directionalRotation, null != v) if ("object" == typeof v) for (c in v) w[c] = v[c];
					else w.rotation = v;
					"string" == typeof w.x && -1 !== w.x.indexOf("%") && (f.x = 0, f.xPercent = st(w.x, m.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (f.y = 0, f.yPercent = st(w.y, m.yPercent)), f.rotation = ot("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : m.rotation, m.rotation, "rotation", E), Nt && (f.rotationX = ot("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", E), f.rotationY = ot("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", E)), f.skewX = null == w.skewX ? m.skewX : ot(w.skewX, m.skewX), f.skewY = null == w.skewY ? m.skewY : ot(w.skewY, m.skewY), (l = f.skewY - m.skewY) && (f.skewX += l, f.rotation += l)
				}
				for (Nt && null != w.force3D && (m.force3D = w.force3D, d = !0), m.skewType = w.skewType || m.skewType || o.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || f.z || f.rotationX || f.rotationY || f.perspective, p || null == w.scale || (f.scaleZ = 1); --b > -1;) n = Et[b], h = f[n] - m[n], (h > y || -y > h || null != w[n] || null != H[n]) && (d = !0, s = new dt(m, n, m[n], h, s), n in E && (s.e = E[n]), s.xs0 = 0, s.plugin = u, r._overwriteProps.push(s.n));
				return h = w.transformOrigin, m.svg && (h || w.svgOrigin) && (Mt(e, rt(h), f, w.svgOrigin), s = new dt(m, "xOrigin", m.xOrigin, f.xOrigin - m.xOrigin, s, -1, "transformOrigin"), s.b = m.xOrigin, s.e = s.xs0 = f.xOrigin, s = new dt(m, "yOrigin", m.yOrigin, f.yOrigin - m.yOrigin, s, -1, "transformOrigin"), s.b = m.yOrigin, s.e = s.xs0 = f.yOrigin, h = wt ? null : "0px 0px"), (h || Nt && p && m.zOrigin) && (St ? (d = !0, n = Tt, h = (h || K(e, n, i, !1, "50% 50%")) + "", s = new dt(g, n, 0, 0, s, -1, "transformOrigin"), s.b = g[n], s.plugin = u, Nt ? (c = m.zOrigin, h = h.split(" "), m.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, s.xs0 = s.e = h[0] + " " + (h[1] || "50%") + " 0px", s = new dt(m, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = m.zOrigin) : s.xs0 = s.e = h) : rt(h + "", m)), d && (r._transformType = m.svg && wt || !p && 3 !== this._transformType ? 2 : 3), s
			},
			prefix: !0
		}), yt("boxShadow", {
			defaultValue: "0px 0px 0px 0px #999",
			prefix: !0,
			color: !0,
			multi: !0,
			keyword: "inset"
		}), yt("borderRadius", {
			defaultValue: "0px",
			parser: function(e, t, n, s, o) {
				t = this.format(t);
				var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
					T = e.style;
				for (v = parseFloat(e.offsetWidth), m = parseFloat(e.offsetHeight), u = t.split(" "), a = 0; x.length > a; a++) this.p.indexOf("border") && (x[a] = $(x[a])), c = l = K(e, x[a], i, !1, "0px"), -1 !== c.indexOf(" ") && (l = c.split(" "), c = l[0], l = l[1]), h = f = u[a], p = parseFloat(c), y = c.substr((p + "").length), b = "=" === h.charAt(1), b ? (d = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), d *= parseFloat(h), g = h.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(h), g = h.substr((d + "").length)), "" === g && (g = r[n] || y), g !== y && (w = Q(e, "borderLeft", p, y), E = Q(e, "borderTop", p, y), "%" === g ? (c = 100 * (w / v) + "%", l = 100 * (E / m) + "%") : "em" === g ? (S = Q(e, "borderLeft", 1, "em"), c = w / S + "em", l = E / S + "em") : (c = w + "px", l = E + "px"), b && (h = parseFloat(c) + d + g, f = parseFloat(l) + d + g)), o = vt(T, x[a], c + " " + l, h + " " + f, !1, "0px", o);
				return o
			},
			prefix: !0,
			formatter: ct("0px 0px 0px 0px", !1, !0)
		}), yt("backgroundPosition", {
			defaultValue: "0 0",
			parser: function(e, t, n, r, s, o) {
				var u, a, f, l, c, h, p = "background-position",
					d = i || J(e, null),
					m = this.format((d ? v ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
					g = this.format(t);
				if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = K(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
					for (u = m.split(" "), a = g.split(" "), I.setAttribute("src", h), f = 2; --f > -1;) m = u[f], l = -1 !== m.indexOf("%"), l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - I.width : e.offsetHeight - I.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
					m = u.join(" ")
				}
				return this.parseComplex(e.style, m, g, s, o)
			},
			formatter: rt
		}), yt("backgroundSize", {
			defaultValue: "0 0",
			formatter: rt
		}), yt("perspective", {
			defaultValue: "0px",
			prefix: !0
		}), yt("perspectiveOrigin", {
			defaultValue: "50% 50%",
			prefix: !0
		}), yt("transformStyle", {
			prefix: !0
		}), yt("backfaceVisibility", {
			prefix: !0
		}), yt("userSelect", {
			prefix: !0
		}), yt("margin", {
			parser: ht("marginTop,marginRight,marginBottom,marginLeft")
		}), yt("padding", {
			parser: ht("paddingTop,paddingRight,paddingBottom,paddingLeft")
		}), yt("clip", {
			defaultValue: "rect(0px,0px,0px,0px)",
			parser: function(e, t, n, r, s, o) {
				var u, a, f;
				return 9 > v ? (a = e.currentStyle, f = 8 > v ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format(K(e, this.p, i, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, s, o)
			}
		}), yt("textShadow", {
			defaultValue: "0px 0px 0px #999",
			color: !0,
			multi: !0
		}), yt("autoRound,strictUnits", {
			parser: function(e, t, n, r, i) {
				return i
			}
		}), yt("border", {
			defaultValue: "0px solid #000",
			parser: function(e, t, n, r, s, o) {
				return this.parseComplex(e.style, this.format(K(e, "borderTopWidth", i, !1, "0px") + " " + K(e, "borderTopStyle", i, !1, "solid") + " " + K(e, "borderTopColor", i, !1, "#000")), this.format(t), s, o)
			},
			color: !0,
			formatter: function(e) {
				var t = e.split(" ");
				return t[0] + " " + (t[1] || "solid") + " " + (e.match(lt) || ["#000"])[0]
			}
		}), yt("borderWidth", {
			parser: ht("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
		}), yt("float,cssFloat,styleFloat", {
			parser: function(e, t, n, r, i) {
				var s = e.style,
					o = "cssFloat" in s ? "cssFloat" : "styleFloat";
				return new dt(s, o, 0, 0, i, -1, n, !1, 0, s[o], t)
			}
		});
		var Ht = function(e) {
				var t, n = this.t,
					r = n.filter || K(this.data, "filter") || "",
					i = 0 | this.s + this.c * e;
				100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), t = !K(this.data, "filter")) : (n.filter = r.replace(x, ""), t = !0)), t || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(E, "opacity=" + i))
			};
		yt("opacity,alpha,autoAlpha", {
			defaultValue: "1",
			parser: function(e, t, n, r, s, o) {
				var u = parseFloat(K(e, "opacity", i, !1, "1")),
					a = e.style,
					f = "autoAlpha" === n;
				return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + u), f && 1 === u && "hidden" === K(e, "visibility", i) && 0 !== t && (u = 0), U ? s = new dt(a, "opacity", u, t - u, s) : (s = new dt(a, "opacity", 100 * u, 100 * (t - u), s), s.xn1 = f ? 1 : 0, a.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Ht), f && (s = new dt(a, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== u ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)), s
			}
		});
		var Bt = function(e, t) {
				t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(N, "-$1").toLowerCase())) : e.removeAttribute(t))
			},
			jt = function(e) {
				if (this.t._gsClassPT = this, 1 === e || 0 === e) {
					this.t.setAttribute("class", 0 === e ? this.b : this.e);
					for (var t = this.data, n = this.t.style; t;) t.v ? n[t.p] = t.v : Bt(n, t.p), t = t._next;
					1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
				} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
			};
		yt("className", {
			parser: function(e, t, r, s, o, u, a) {
				var f, l, c, h, p, d = e.getAttribute("class") || "",
					v = e.style.cssText;
				if (o = s._classNamePT = new dt(e, r, 0, 0, o, 2), o.setRatio = jt, o.pr = -11, n = !0, o.b = d, l = Y(e, i), c = e._gsClassPT) {
					for (h = {}, p = c.data; p;) h[p.p] = 1, p = p._next;
					c.setRatio(1)
				}
				return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : d.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), f = Z(e, l, Y(e), a, h), e.setAttribute("class", d), o.data = f.firstMPT, e.style.cssText = v, o = o.xfirst = s.parse(e, f.difs, o, u)
			}
		});
		var Ft = function(e) {
				if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
					var t, n, r, i, s, o = this.t.style,
						u = a.transform.parse;
					if ("all" === this.e) o.cssText = "", i = !0;
					else for (t = this.e.split(" ").join("").split(","), r = t.length; --r > -1;) n = t[r], a[n] && (a[n].parse === u ? i = !0 : n = "transformOrigin" === n ? Tt : a[n].p), Bt(o, n);
					i && (Bt(o, St), s = this.t._gsTransform, s && (s.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
				}
			};
		for (yt("clearProps", {
			parser: function(e, t, r, i, s) {
				return s = new dt(e, r, 0, 0, s, 2), s.setRatio = Ft, s.e = t, s.pr = -10, s.data = i._tween, n = !0, s
			}
		}), f = "bezier,throwProps,physicsProps,physics2D".split(","), mt = f.length; mt--;) bt(f[mt]);
		f = o.prototype, f._firstPT = f._lastParsedTransform = f._transform = null, f._onInitTween = function(e, t, u) {
			if (!e.nodeType) return !1;
			this._target = e, this._tween = u, this._vars = t, l = t.autoRound, n = !1, r = t.suffixMap || o.suffixMap, i = J(e, ""), s = this._overwriteProps;
			var f, p, v, m, g, y, b, w, E, x = e.style;
			if (c && "" === x.zIndex && (f = K(e, "zIndex", i), ("auto" === f || "" === f) && this._addLazySet(x, "zIndex", 0)), "string" == typeof t && (m = x.cssText, f = Y(e, i), x.cssText = m + ";" + t, f = Z(e, f, Y(e)).difs, !U && S.test(t) && (f.opacity = parseFloat(RegExp.$1)), t = f, x.cssText = m), this._firstPT = p = t.className ? a.className.parse(e, t.className, "className", this, null, null, t) : this.parse(e, t, null), this._transformType) {
				for (E = 3 === this._transformType, St ? h && (c = !0, "" === x.zIndex && (b = K(e, "zIndex", i), ("auto" === b || "" === b) && this._addLazySet(x, "zIndex", 0)), d && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (E ? "visible" : "hidden"))) : x.zoom = 1, v = p; v && v._next;) v = v._next;
				w = new dt(e, "transform", 0, 0, null, 2), this._linkCSSP(w, null, v), w.setRatio = St ? Pt : Dt, w.data = this._transform || _t(e, i, !0), w.tween = u, w.pr = -1, s.pop()
			}
			if (n) {
				for (; p;) {
					for (y = p._next, v = m; v && v.pr > p.pr;) v = v._next;
					(p._prev = v ? v._prev : g) ? p._prev._next = p : m = p, (p._next = v) ? v._prev = p : g = p, p = y
				}
				this._firstPT = m
			}
			return !0
		}, f.parse = function(e, t, n, s) {
			var o, u, f, c, h, p, d, v, m, g, y = e.style;
			for (o in t) p = t[o], u = a[o], u ? n = u.parse(e, p, o, this, n, s, t) : (h = K(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && T.test(p) ? (m || (p = ft(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = vt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (f = parseFloat(h), d = f || 0 === f ? h.substr((f + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (f = nt(e, o, i), d = "px") : "left" === o || "top" === o ? (f = G(e, o, i), d = "px") : (f = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(w, "")) : (c = parseFloat(p), v = m ? p.replace(w, "") : ""), "" === v && (v = o in r ? r[o] : d), p = c || 0 === c ? (g ? c + f : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && f && (f = Q(e, o, f, d), "%" === v ? (f /= Q(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = f + "%")) : "em" === v ? f /= Q(e, o, 1, "em") : "px" !== v && (c = Q(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + f + v)), g && (c += f), !f && 0 !== f || !c && 0 !== c ? void 0 !== y[o] && (p || "NaN" != p + "" && null != p) ? (n = new dt(y, o, c || f || 0, 0, n, -1, o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : W("invalid " + o + " tween value: " + t[o]) : (n = new dt(y, o, f, c - f, n, 0, o, l !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = vt(y, o, h, p, !0, null, n, 0, s)), s && n && !n.plugin && (n.plugin = s);
			return n
		}, f.setRatio = function(e) {
			var t, n, r, i = this._firstPT,
				s = 1e-6;
			if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001) for (; i;) {
				if (t = i.c * e + i.s, i.r ? t = Math.round(t) : s > t && t > -s && (t = 0), i.type) if (1 === i.type) if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
				else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
				else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
				else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
				else {
					for (n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++) n += i["xn" + r] + i["xs" + (r + 1)];
					i.t[i.p] = n
				} else - 1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e);
				else i.t[i.p] = t + i.xs0;
				i = i._next
			} else for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e), i = i._next;
			else for (; i;) 2 !== i.type ? i.t[i.p] = i.e : i.setRatio(e), i = i._next
		}, f._enableTransforms = function(e) {
			this._transform = this._transform || _t(this._target, i, !0), this._transformType = this._transform.svg && wt || !e && 3 !== this._transformType ? 2 : 3
		};
		var It = function() {
				this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
			};
		f._addLazySet = function(e, t, n) {
			var r = this._firstPT = new dt(e, t, 0, 0, this._firstPT, 2);
			r.e = n, r.setRatio = It, r.data = this
		}, f._linkCSSP = function(e, t, n, r) {
			return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = n), e
		}, f._kill = function(t) {
			var n, r, i, s = t;
			if (t.autoAlpha || t.alpha) {
				s = {};
				for (r in t) s[r] = t[r];
				s.opacity = 1, s.autoAlpha && (s.visibility = 1)
			}
			return t.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
		};
		var qt = function(e, t, n) {
				var r, i, s, o;
				if (e.slice) for (i = e.length; --i > -1;) qt(e[i], t, n);
				else for (r = e.childNodes, i = r.length; --i > -1;) s = r[i], o = s.type, s.style && (t.push(Y(s)), n && n.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || qt(s, t, n)
			};
		return o.cascadeTo = function(e, n, r) {
			var i, s, o, u, a = t.to(e, n, r),
				f = [a],
				l = [],
				c = [],
				h = [],
				p = t._internals.reservedProps;
			for (e = a._targets || a.target, qt(e, l, h), a.render(n, !0, !0), qt(e, c), a.render(0, !0, !0), a._enabled(!0), i = h.length; --i > -1;) if (s = Z(h[i], l[i], c[i]), s.firstMPT) {
				s = s.difs;
				for (o in r) p[o] && (s[o] = r[o]);
				u = {};
				for (o in s) u[o] = l[i][o];
				f.push(t.fromTo(h[i], n, u, s))
			}
			return f
		}, e.activate([o]), o
	}, !0), function() {
		var e = _gsScope._gsDefine.plugin({
			propName: "roundProps",
			priority: -1,
			API: 2,
			init: function(e, t, n) {
				return this._tween = n, !0
			}
		}),
			t = e.prototype;
		t._onInitAllProps = function() {
			for (var e, t, n, r = this._tween, i = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), s = i.length, o = {}, u = r._propLookup.roundProps; --s > -1;) o[i[s]] = 1;
			for (s = i.length; --s > -1;) for (e = i[s], t = r._firstPT; t;) n = t._next, t.pg ? t.t._roundProps(o, !0) : t.n === e && (this._add(t.t, e, t.s, t.c), n && (n._prev = t._prev), t._prev ? t._prev._next = n : r._firstPT === t && (r._firstPT = n), t._next = t._prev = null, r._propLookup[e] = u), t = n;
			return !1
		}, t._add = function(e, t, n, r) {
			this._addTween(e, t, n, n + r, t, !0), this._overwriteProps.push(t)
		}
	}(), _gsScope._gsDefine.plugin({
		propName: "attr",
		API: 2,
		version: "0.3.3",
		init: function(e, t) {
			var n, r, i;
			if ("function" != typeof e.setAttribute) return !1;
			this._target = e, this._proxy = {}, this._start = {}, this._end = {};
			for (n in t) this._start[n] = this._proxy[n] = r = e.getAttribute(n), i = this._addTween(this._proxy, n, parseFloat(r), t[n], n), this._end[n] = i ? i.s + i.c : t[n], this._overwriteProps.push(n);
			return !0
		},
		set: function(e) {
			this._super.setRatio.call(this, e);
			for (var t, n = this._overwriteProps, r = n.length, i = 1 === e ? this._end : e ? this._proxy : this._start; --r > -1;) t = n[r], this._target.setAttribute(t, i[t] + "")
		}
	}), _gsScope._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.2.1",
		API: 2,
		init: function(e, t) {
			"object" != typeof t && (t = {
				rotation: t
			}), this.finals = {};
			var n, r, i, s, o, u, a = t.useRadians === !0 ? 2 * Math.PI : 360,
				f = 1e-6;
			for (n in t)"useRadians" !== n && (u = (t[n] + "").split("_"), r = u[0], i = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), s = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? i + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, o = s - i, u.length && (r = u.join("_"), -1 !== r.indexOf("short") && (o %= a, o !== o % (a / 2) && (o = 0 > o ? o + a : o - a)), -1 !== r.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * a) % a - (0 | o / a) * a : -1 !== r.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * a) % a - (0 | o / a) * a)), (o > f || -f > o) && (this._addTween(e, n, i, i + o, n), this._overwriteProps.push(n)));
			return !0
		},
		set: function(e) {
			var t;
			if (1 !== e) this._super.setRatio.call(this, e);
			else for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
		}
	})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
		var t, n, r, i = _gsScope.GreenSockGlobals || _gsScope,
			s = i.com.greensock,
			o = 2 * Math.PI,
			u = Math.PI / 2,
			a = s._class,
			f = function(t, n) {
				var r = a("easing." + t, function() {}, !0),
					i = r.prototype = new e;
				return i.constructor = r, i.getRatio = n, r
			},
			l = e.register ||
		function() {}, c = function(e, t, n, r) {
			var i = a("easing." + e, {
				easeOut: new t,
				easeIn: new n,
				easeInOut: new r
			}, !0);
			return l(i, e), i
		}, h = function(e, t, n) {
			this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
		}, p = function(t, n) {
			var r = a("easing." + t, function(e) {
				this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
			}, !0),
				i = r.prototype = new e;
			return i.constructor = r, i.getRatio = n, i.config = function(e) {
				return new r(e)
			}, r
		}, d = c("Back", p("BackOut", function(e) {
			return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
		}), p("BackIn", function(e) {
			return e * e * ((this._p1 + 1) * e - this._p1)
		}), p("BackInOut", function(e) {
			return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
		})), v = a("easing.SlowMo", function(e, t, n) {
			t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
		}, !0), m = v.prototype = new e;
		return m.constructor = v, m.getRatio = function(e) {
			var t = e + (.5 - e) * this._p;
			return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
		}, v.ease = new v(.7, .7), m.config = v.config = function(e, t, n) {
			return new v(e, t, n)
		}, t = a("easing.SteppedEase", function(e) {
			e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
		}, !0), m = t.prototype = new e, m.constructor = t, m.getRatio = function(e) {
			return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
		}, m.config = t.config = function(e) {
			return new t(e)
		}, n = a("easing.RoughEase", function(t) {
			t = t || {};
			for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c, d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) n = d ? Math.random() : 1 / c * p, r = m ? m.getRatio(n) : n, "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = .5 * s * s * g) : (s = 2 * (1 - n), i = .5 * s * s * g), d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i, v && (r > 1 ? r = 1 : 0 > r && (r = 0)), f[l++] = {
				x: n,
				y: r
			};
			for (f.sort(function(e, t) {
				return e.x - t.x
			}), u = new h(1, 1, null), p = c; --p > -1;) o = f[p], u = new h(o.x, o.y, u);
			this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
		}, !0), m = n.prototype = new e, m.constructor = n, m.getRatio = function(e) {
			var t = this._prev;
			if (e > t.t) {
				for (; t.next && e >= t.t;) t = t.next;
				t = t.prev
			} else for (; t.prev && t.t >= e;) t = t.prev;
			return this._prev = t, t.v + (e - t.t) / t.gap * t.c
		}, m.config = function(e) {
			return new n(e)
		}, n.ease = new n, c("Bounce", f("BounceOut", function(e) {
			return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
		}), f("BounceIn", function(e) {
			return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
		}), f("BounceInOut", function(e) {
			var t = .5 > e;
			return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
		})), c("Circ", f("CircOut", function(e) {
			return Math.sqrt(1 - (e -= 1) * e)
		}), f("CircIn", function(e) {
			return -(Math.sqrt(1 - e * e) - 1)
		}), f("CircInOut", function(e) {
			return 1 > (e *= 2) ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
		})), r = function(t, n, r) {
			var i = a("easing." + t, function(e, t) {
				this._p1 = e >= 1 ? e : 1, this._p2 = (t || r) / (1 > e ? e : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
			}, !0),
				s = i.prototype = new e;
			return s.constructor = i, s.getRatio = n, s.config = function(e, t) {
				return new i(e, t)
			}, i
		}, c("Elastic", r("ElasticOut", function(e) {
			return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
		}, .3), r("ElasticIn", function(e) {
			return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
		}, .3), r("ElasticInOut", function(e) {
			return 1 > (e *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) + 1
		}, .45)), c("Expo", f("ExpoOut", function(e) {
			return 1 - Math.pow(2, -10 * e)
		}), f("ExpoIn", function(e) {
			return Math.pow(2, 10 * (e - 1)) - .001
		}), f("ExpoInOut", function(e) {
			return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
		})), c("Sine", f("SineOut", function(e) {
			return Math.sin(e * u)
		}), f("SineIn", function(e) {
			return -Math.cos(e * u) + 1
		}), f("SineInOut", function(e) {
			return -0.5 * (Math.cos(Math.PI * e) - 1)
		})), a("easing.EaseLookup", {
			find: function(t) {
				return e.map[t]
			}
		}, !0), l(i.SlowMo, "SlowMo", "ease,"), l(n, "RoughEase", "ease,"), l(t, "SteppedEase", "ease,"), d
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(e, t) {
	"use strict";
	var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
	if (!n.TweenLite) {
		var r, i, s, o, u, a = function(e) {
				var t, r = e.split("."),
					i = n;
				for (t = 0; r.length > t; t++) i[r[t]] = i = i[r[t]] || {};
				return i
			},
			f = a("com.greensock"),
			l = 1e-10,
			c = function(e) {
				var t, n = [],
					r = e.length;
				for (t = 0; t !== r; n.push(e[t++]));
				return n
			},
			h = function() {},
			p = function() {
				var e = Object.prototype.toString,
					t = e.call([]);
				return function(n) {
					return null != n && (n instanceof Array || "object" == typeof n && !! n.push && e.call(n) === t)
				}
			}(),
			d = {},
			v = function(r, i, s, o) {
				this.sc = d[r] ? d[r].sc : [], d[r] = this, this.gsClass = null, this.func = s;
				var u = [];
				this.check = function(f) {
					for (var l, c, h, p, m = i.length, g = m; --m > -1;)(l = d[i[m]] || new v(i[m], [])).gsClass ? (u[m] = l.gsClass, g--) : f && l.sc.push(this);
					if (0 === g && s) for (c = ("com.greensock." + r).split("."), h = c.pop(), p = a(c.join("."))[h] = this.gsClass = s.apply(s, u), o && (n[h] = p, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
						return p
					}) : r === t && "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++) this.sc[m].check()
				}, this.check(!0)
			},
			m = e._gsDefine = function(e, t, n, r) {
				return new v(e, t, n, r)
			},
			g = f._class = function(e, t, n) {
				return t = t ||
				function() {}, m(e, [], function() {
					return t
				}, n), t
			};
		m.globals = n;
		var y = [0, 0, 1, 1],
			b = [],
			w = g("easing.Ease", function(e, t, n, r) {
				this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? y.concat(t) : y
			}, !0),
			E = w.map = {},
			S = w.register = function(e, t, n, r) {
				for (var i, s, o, u, a = t.split(","), l = a.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1;) for (s = a[l], i = r ? g("easing." + s, null, !0) : f.easing[s] || {}, o = c.length; --o > -1;) u = c[o], E[s + "." + u] = E[u + s] = i[u] = e.getRatio ? e : e[u] || new e
			};
		for (s = w.prototype, s._calcEnd = !1, s.getRatio = function(e) {
			if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
			var t = this._type,
				n = this._power,
				r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
			return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
		}, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = r.length; --i > -1;) s = r[i] + ",Power" + i, S(new w(null, null, 1, i), s, "easeOut", !0), S(new w(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")), S(new w(null, null, 3, i), s, "easeInOut");
		E.linear = f.easing.Linear.easeIn, E.swing = f.easing.Quad.easeInOut;
		var x = g("events.EventDispatcher", function(e) {
			this._listeners = {}, this._eventTarget = e || this
		});
		s = x.prototype, s.addEventListener = function(e, t, n, r, i) {
			i = i || 0;
			var s, a, f = this._listeners[e],
				l = 0;
			for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1;) s = f[a], s.c === t && s.s === n ? f.splice(a, 1) : 0 === l && i > s.pr && (l = a + 1);
			f.splice(l, 0, {
				c: t,
				s: n,
				up: r,
				pr: i
			}), this !== o || u || o.wake()
		}, s.removeEventListener = function(e, t) {
			var n, r = this._listeners[e];
			if (r) for (n = r.length; --n > -1;) if (r[n].c === t) return r.splice(n, 1), void 0
		}, s.dispatchEvent = function(e) {
			var t, n, r, i = this._listeners[e];
			if (i) for (t = i.length, n = this._eventTarget; --t > -1;) r = i[t], r && (r.up ? r.c.call(r.s || n, {
				type: e,
				target: n
			}) : r.c.call(r.s || n))
		};
		var T = e.requestAnimationFrame,
			N = e.cancelAnimationFrame,
			C = Date.now ||
		function() {
			return (new Date).getTime()
		}, k = C();
		for (r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !T;) T = e[r[i] + "RequestAnimationFrame"], N = e[r[i] + "CancelAnimationFrame"] || e[r[i] + "CancelRequestAnimationFrame"];
		g("Ticker", function(e, t) {
			var n, r, i, s, a, f = this,
				c = C(),
				p = t !== !1 && T,
				d = 500,
				v = 33,
				m = "tick",
				g = function(e) {
					var t, o, u = C() - k;
					u > d && (c += u - v), k += u, f.time = (k - c) / 1e3, t = f.time - a, (!n || t > 0 || e === !0) && (f.frame++, a += t + (t >= s ? .004 : s - t), o = !0), e !== !0 && (i = r(g)), o && f.dispatchEvent(m)
				};
			x.call(f), f.time = f.frame = 0, f.tick = function() {
				g(!0)
			}, f.lagSmoothing = function(e, t) {
				d = e || 1 / l, v = Math.min(t, d, 0)
			}, f.sleep = function() {
				null != i && (p && N ? N(i) : clearTimeout(i), r = h, i = null, f === o && (u = !1))
			}, f.wake = function() {
				null !== i ? f.sleep() : f.frame > 10 && (k = C() - d + 5), r = 0 === n ? h : p && T ? T : function(e) {
					return setTimeout(e, 0 | 1e3 * (a - f.time) + 1)
				}, f === o && (u = !0), g(2)
			}, f.fps = function(e) {
				return arguments.length ? (n = e, s = 1 / (n || 60), a = this.time + s, f.wake(), void 0) : n
			}, f.useRAF = function(e) {
				return arguments.length ? (f.sleep(), p = e, f.fps(n), void 0) : p
			}, f.fps(e), setTimeout(function() {
				p && 5 > f.frame && f.useRAF(!1)
			}, 1500)
		}), s = f.Ticker.prototype = new f.events.EventDispatcher, s.constructor = f.Ticker;
		var L = g("core.Animation", function(e, t) {
			if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, z) {
				u || o.wake();
				var n = this.vars.useFrames ? U : z;
				n.add(this, n._time), this.vars.paused && this.paused(!0)
			}
		});
		o = L.ticker = new f.Ticker, s = L.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
		var A = function() {
				u && C() - k > 2e3 && o.wake(), setTimeout(A, 2e3)
			};
		A(), s.play = function(e, t) {
			return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
		}, s.pause = function(e, t) {
			return null != e && this.seek(e, t), this.paused(!0)
		}, s.resume = function(e, t) {
			return null != e && this.seek(e, t), this.paused(!1)
		}, s.seek = function(e, t) {
			return this.totalTime(Number(e), t !== !1)
		}, s.restart = function(e, t) {
			return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
		}, s.reverse = function(e, t) {
			return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
		}, s.render = function() {}, s.invalidate = function() {
			return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
		}, s.isActive = function() {
			var e, t = this._timeline,
				n = this._startTime;
			return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && n + this.totalDuration() / this._timeScale > e
		}, s._enabled = function(e, t) {
			return u || o.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
		}, s._kill = function() {
			return this._enabled(!1, !1)
		}, s.kill = function(e, t) {
			return this._kill(e, t), this
		}, s._uncache = function(e) {
			for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
			return this
		}, s._swapSelfInParams = function(e) {
			for (var t = e.length, n = e.concat(); --t > -1;)"{self}" === e[t] && (n[t] = this);
			return n
		}, s.eventCallback = function(e, t, n, r) {
			if ("on" === (e || "").substr(0, 2)) {
				var i = this.vars;
				if (1 === arguments.length) return i[e];
				null == t ? delete i[e] : (i[e] = t, i[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r), "onUpdate" === e && (this._onUpdate = t)
			}
			return this
		}, s.delay = function(e) {
			return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
		}, s.duration = function(e) {
			return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
		}, s.totalDuration = function(e) {
			return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
		}, s.time = function(e, t) {
			return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
		}, s.totalTime = function(e, t, n) {
			if (u || o.wake(), !arguments.length) return this._totalTime;
			if (this._timeline) {
				if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
					this._dirty && this.totalDuration();
					var r = this._totalDuration,
						i = this._timeline;
					if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1), i._timeline) for (; i._timeline;) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
				}
				this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), P.length && X())
			}
			return this
		}, s.progress = s.totalProgress = function(e, t) {
			return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
		}, s.startTime = function(e) {
			return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
		}, s.endTime = function(e) {
			return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
		}, s.timeScale = function(e) {
			if (!arguments.length) return this._timeScale;
			if (e = e || l, this._timeline && this._timeline.smoothChildTiming) {
				var t = this._pauseTime,
					n = t || 0 === t ? t : this._timeline.totalTime();
				this._startTime = n - (n - this._startTime) * this._timeScale / e
			}
			return this._timeScale = e, this._uncache(!1)
		}, s.reversed = function(e) {
			return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
		}, s.paused = function(e) {
			if (!arguments.length) return this._paused;
			var t, n, r = this._timeline;
			return e != this._paused && r && (u || e || o.wake(), t = r.rawTime(), n = t - this._pauseTime, !e && r.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== n && this._initted && this.duration() && this.render(r.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, !0, !0)), this._gc && !e && this._enabled(!0, !1), this
		};
		var O = g("core.SimpleTimeline", function(e) {
			L.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
		});
		s = O.prototype = new L, s.constructor = O, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(e, t) {
			var n, r;
			if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren) for (r = e._startTime; n && n._startTime > r;) n = n._prev;
			return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = n, this._recent = e, this._timeline && this._uncache(!0), this
		}, s._remove = function(e, t) {
			return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
		}, s.render = function(e, t, n) {
			var r, i = this._first;
			for (this._totalTime = this._time = this._rawPrevTime = e; i;) r = i._next, (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)), i = r
		}, s.rawTime = function() {
			return u || o.wake(), this._totalTime
		};
		var M = g("TweenLite", function(t, n, r) {
			if (L.call(this, n, r), this.render = M.prototype.render, null == t) throw "Cannot tween a null target.";
			this.target = t = "string" != typeof t ? t : M.selector(t) || t;
			var i, s, o, u = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
				a = this.vars.overwrite;
			if (this._overwrite = a = null == a ? R[M.defaultOverwrite] : "number" == typeof a ? a >> 0 : R[a], (u || t instanceof Array || t.push && p(t)) && "number" != typeof t[0]) for (this._targets = o = c(t), this._propLookup = [], this._siblings = [], i = 0; o.length > i; i++) s = o[i], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(i--, 1), this._targets = o = o.concat(c(s))) : (this._siblings[i] = V(s, this, !1), 1 === a && this._siblings[i].length > 1 && J(s, this, null, 1, this._siblings[i])) : (s = o[i--] = M.selector(s), "string" == typeof s && o.splice(i + 1, 1)) : o.splice(i--, 1);
			else this._propLookup = {}, this._siblings = V(t, this, !1), 1 === a && this._siblings.length > 1 && J(t, this, null, 1, this._siblings);
			(this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(-this._delay))
		}, !0),
			_ = function(t) {
				return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
			},
			D = function(e, t) {
				var n, r = {};
				for (n in e) q[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!j[n] || j[n] && j[n]._autoCSS) || (r[n] = e[n], delete e[n]);
				e.css = r
			};
		s = M.prototype = new L, s.constructor = M, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, M.version = "1.16.1", M.defaultEase = s._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = o, M.autoSleep = 120, M.lagSmoothing = function(e, t) {
			o.lagSmoothing(e, t)
		}, M.selector = e.$ || e.jQuery ||
		function(t) {
			var n = e.$ || e.jQuery;
			return n ? (M.selector = n, n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
		};
		var P = [],
			H = {},
			B = M._internals = {
				isArray: p,
				isSelector: _,
				lazyTweens: P
			},
			j = M._plugins = {},
			F = B.tweenLookup = {},
			I = 0,
			q = B.reservedProps = {
				ease: 1,
				delay: 1,
				overwrite: 1,
				onComplete: 1,
				onCompleteParams: 1,
				onCompleteScope: 1,
				useFrames: 1,
				runBackwards: 1,
				startAt: 1,
				onUpdate: 1,
				onUpdateParams: 1,
				onUpdateScope: 1,
				onStart: 1,
				onStartParams: 1,
				onStartScope: 1,
				onReverseComplete: 1,
				onReverseCompleteParams: 1,
				onReverseCompleteScope: 1,
				onRepeat: 1,
				onRepeatParams: 1,
				onRepeatScope: 1,
				easeParams: 1,
				yoyo: 1,
				immediateRender: 1,
				repeat: 1,
				repeatDelay: 1,
				data: 1,
				paused: 1,
				reversed: 1,
				autoCSS: 1,
				lazy: 1,
				onOverwrite: 1
			},
			R = {
				none: 0,
				all: 1,
				auto: 2,
				concurrent: 3,
				allOnStart: 4,
				preexisting: 5,
				"true": 1,
				"false": 0
			},
			U = L._rootFramesTimeline = new O,
			z = L._rootTimeline = new O,
			W = 30,
			X = B.lazyRender = function() {
				var e, t = P.length;
				for (H = {}; --t > -1;) e = P[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
				P.length = 0
			};
		z._startTime = o.time, U._startTime = o.frame, z._active = U._active = !0, setTimeout(X, 1), L._updateRoot = M.render = function() {
			var e, t, n;
			if (P.length && X(), z.render((o.time - z._startTime) * z._timeScale, !1, !1), U.render((o.frame - U._startTime) * U._timeScale, !1, !1), P.length && X(), o.frame >= W) {
				W = o.frame + (parseInt(M.autoSleep, 10) || 120);
				for (n in F) {
					for (t = F[n].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
					0 === t.length && delete F[n]
				}
				if (n = z._first, (!n || n._paused) && M.autoSleep && !U._first && 1 === o._listeners.tick.length) {
					for (; n && n._paused;) n = n._next;
					n || o.sleep()
				}
			}
		}, o.addEventListener("tick", L._updateRoot);
		var V = function(e, t, n) {
				var r, i, s = e._gsTweenID;
				if (F[s || (e._gsTweenID = s = "t" + I++)] || (F[s] = {
					target: e,
					tweens: []
				}), t && (r = F[s].tweens, r[i = r.length] = t, n)) for (; --i > -1;) r[i] === t && r.splice(i, 1);
				return F[s].tweens
			},
			$ = function(e, t, n, r) {
				var i, s, o = e.vars.onOverwrite;
				return o && (i = o(e, t, n, r)), o = M.onOverwrite, o && (s = o(e, t, n, r)), i !== !1 && s !== !1
			},
			J = function(e, t, n, r, i) {
				var s, o, u, a;
				if (1 === r || r >= 4) {
					for (a = i.length, s = 0; a > s; s++) if ((u = i[s]) !== t) u._gc || $(u, t) && u._enabled(!1, !1) && (o = !0);
					else if (5 === r) break;
					return o
				}
				var f, c = t._startTime + l,
					h = [],
					p = 0,
					d = 0 === t._duration;
				for (s = i.length; --s > -1;)(u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (f = f || K(t, 0, d), 0 === K(u, f, d) && (h[p++] = u)) : c >= u._startTime && u._startTime + u.totalDuration() / u._timeScale > c && ((d || !u._initted) && 2e-10 >= c - u._startTime || (h[p++] = u)));
				for (s = p; --s > -1;) if (u = h[s], 2 === r && u._kill(n, e, t) && (o = !0), 2 !== r || !u._firstPT && u._initted) {
					if (2 !== r && !$(u, t)) continue;
					u._enabled(!1, !1) && (o = !0)
				}
				return o
			},
			K = function(e, t, n) {
				for (var r = e._timeline, i = r._timeScale, s = e._startTime; r._timeline;) {
					if (s += r._startTime, i *= r._timeScale, r._paused) return -100;
					r = r._timeline
				}
				return s /= i, s > t ? s - t : n && s === t || !e._initted && 2 * l > s - t ? l : (s += e.totalDuration() / e._timeScale / i) > t + l ? 0 : s - t - l
			};
		s._init = function() {
			var e, t, n, r, i, s = this.vars,
				o = this._overwrittenProps,
				u = this._duration,
				a = !! s.immediateRender,
				f = s.ease;
			if (s.startAt) {
				this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), i = {};
				for (r in s.startAt) i[r] = s.startAt[r];
				if (i.overwrite = !1, i.immediateRender = !0, i.lazy = a && s.lazy !== !1, i.startAt = i.delay = null, this._startAt = M.to(this.target, 0, i), a) if (this._time > 0) this._startAt = null;
				else if (0 !== u) return
			} else if (s.runBackwards && 0 !== u) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
			else {
				0 !== this._time && (a = !1), n = {};
				for (r in s) q[r] && "autoCSS" !== r || (n[r] = s[r]);
				if (n.overwrite = 0, n.data = "isFromStart", n.lazy = a && s.lazy !== !1, n.immediateRender = a, this._startAt = M.to(this.target, 0, n), a) {
					if (0 === this._time) return
				} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
			}
			if (this._ease = f = f ? f instanceof w ? f : "function" == typeof f ? new w(f, s.easeParams) : E[f] || M.defaultEase : M.defaultEase, s.easeParams instanceof Array && f.config && (this._ease = f.config.apply(f, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], o ? o[e] : null) && (t = !0);
			else t = this._initProps(this.target, this._propLookup, this._siblings, o);
			if (t && M._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards) for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
			this._onUpdate = s.onUpdate, this._initted = !0
		}, s._initProps = function(t, n, r, i) {
			var s, o, u, a, f, l;
			if (null == t) return !1;
			H[t._gsTweenID] && X(), this.vars.css || t.style && t !== e && t.nodeType && j.css && this.vars.autoCSS !== !1 && D(this.vars, t);
			for (s in this.vars) {
				if (l = this.vars[s], q[s]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[s] = l = this._swapSelfInParams(l, this));
				else if (j[s] && (a = new j[s])._onInitTween(t, this.vars[s], this)) {
					for (this._firstPT = f = {
						_next: this._firstPT,
						t: a,
						p: "setRatio",
						s: 0,
						c: 1,
						f: !0,
						n: s,
						pg: !0,
						pr: a._priority
					}, o = a._overwriteProps.length; --o > -1;) n[a._overwriteProps[o]] = this._firstPT;
					(a._priority || a._onInitAllProps) && (u = !0), (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
				} else this._firstPT = n[s] = f = {
					_next: this._firstPT,
					t: t,
					p: s,
					f: "function" == typeof t[s],
					n: s,
					pg: !1,
					pr: 0
				}, f.s = f.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), f.c = "string" == typeof l && "=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0;
				f && f._next && (f._next._prev = f)
			}
			return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && J(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (H[t._gsTweenID] = !0), u)
		}, s.render = function(e, t, n) {
			var r, i, s, o, u = this._time,
				a = this._duration,
				f = this._rawPrevTime;
			if (e >= a) this._totalTime = this._time = a, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === a && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > f || f === l && "isPause" !== this.data) && f !== e && (n = !0, f > l && (i = "onReverseComplete")), this._rawPrevTime = o = !t || e || f === e ? e : l);
			else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== u || 0 === a && f > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === a && (this._initted || !this.vars.lazy || n) && (f >= 0 && (f !== l || "isPause" !== this.data) && (n = !0), this._rawPrevTime = o = !t || e || f === e ? e : l)), this._initted || (n = !0);
			else if (this._totalTime = this._time = e, this._easeType) {
				var c = e / a,
					h = this._easeType,
					p = this._easePower;
				(1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), this.ratio = 1 === h ? 1 - c : 2 === h ? c : .5 > e / a ? c / 2 : 1 - c / 2
			} else this.ratio = this._ease.getRatio(e / a);
			if (this._time !== u || n) {
				if (!this._initted) {
					if (this._init(), !this._initted || this._gc) return;
					if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = u, this._rawPrevTime = f, P.push(this), this._lazy = [e, t], void 0;
					this._time && !r ? this.ratio = this._ease.getRatio(this._time / a) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
				}
				for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== u && e >= 0 && (this._active = !0), 0 === u && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === a) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || b))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
				this._onUpdate && (0 > e && this._startAt && e !== -0.0001 && this._startAt.render(e, t, n), t || (this._time !== u || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || b)), i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -0.0001 && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || b), 0 === a && this._rawPrevTime === l && o !== l && (this._rawPrevTime = 0))
			}
		}, s._kill = function(e, t, n) {
			if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
				t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
				var r, i, s, o, u, a, f, l, c;
				if ((p(t) || _(t)) && "number" != typeof t[0]) for (r = t.length; --r > -1;) this._kill(e, t[r]) && (a = !0);
				else {
					if (this._targets) {
						for (r = this._targets.length; --r > -1;) if (t === this._targets[r]) {
							u = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], i = this._overwrittenProps[r] = e ? this._overwrittenProps[r] || {} : "all";
							break
						}
					} else {
						if (t !== this.target) return !1;
						u = this._propLookup, i = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
					}
					if (u) {
						if (f = e || u, l = e !== i && "all" !== i && e !== u && ("object" != typeof e || !e._tempKill), n && (M.onOverwrite || this.vars.onOverwrite)) {
							for (s in f) u[s] && (c || (c = []), c.push(s));
							if (!$(this, n, t, c)) return !1
						}
						for (s in f)(o = u[s]) && (o.pg && o.t._kill(f) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete u[s]), l && (i[s] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return a
			}
			return this._lazy = !1, this._enabled(!1, !1)
		}, s.invalidate = function() {
			return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], L.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -l, this.render(-this._delay)), this
		}, s._enabled = function(e, t) {
			if (u || o.wake(), e && this._gc) {
				var n, r = this._targets;
				if (r) for (n = r.length; --n > -1;) this._siblings[n] = V(r[n], this, !0);
				else this._siblings = V(this.target, this, !0)
			}
			return L.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
		}, M.to = function(e, t, n) {
			return new M(e, t, n)
		}, M.from = function(e, t, n) {
			return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new M(e, t, n)
		}, M.fromTo = function(e, t, n, r) {
			return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new M(e, t, r)
		}, M.delayedCall = function(e, t, n, r, i) {
			return new M(t, 0, {
				delay: e,
				onComplete: t,
				onCompleteParams: n,
				onCompleteScope: r,
				onReverseComplete: t,
				onReverseCompleteParams: n,
				onReverseCompleteScope: r,
				immediateRender: !1,
				lazy: !1,
				useFrames: i,
				overwrite: 0
			})
		}, M.set = function(e, t) {
			return new M(e, 0, t)
		}, M.getTweensOf = function(e, t) {
			if (null == e) return [];
			e = "string" != typeof e ? e : M.selector(e) || e;
			var n, r, i, s;
			if ((p(e) || _(e)) && "number" != typeof e[0]) {
				for (n = e.length, r = []; --n > -1;) r = r.concat(M.getTweensOf(e[n], t));
				for (n = r.length; --n > -1;) for (s = r[n], i = n; --i > -1;) s === r[i] && r.splice(n, 1)
			} else for (r = V(e).concat(), n = r.length; --n > -1;)(r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1);
			return r
		}, M.killTweensOf = M.killDelayedCallsTo = function(e, t, n) {
			"object" == typeof t && (n = t, t = !1);
			for (var r = M.getTweensOf(e, t), i = r.length; --i > -1;) r[i]._kill(n, e)
		};
		var Q = g("plugins.TweenPlugin", function(e, t) {
			this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = Q.prototype
		}, !0);
		if (s = Q.prototype, Q.version = "1.10.1", Q.API = 2, s._firstPT = null, s._addTween = function(e, t, n, r, i, s) {
			var o, u;
			return null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = u = {
				_next: this._firstPT,
				t: e,
				p: t,
				s: n,
				c: o,
				f: "function" == typeof e[t],
				n: i || t,
				r: s
			}, u._next && (u._next._prev = u), u) : void 0
		}, s.setRatio = function(e) {
			for (var t, n = this._firstPT, r = 1e-6; n;) t = n.c * e + n.s, n.r ? t = Math.round(t) : r > t && t > -r && (t = 0), n.f ? n.t[n.p](t) : n.t[n.p] = t, n = n._next
		}, s._kill = function(e) {
			var t, n = this._overwriteProps,
				r = this._firstPT;
			if (null != e[this._propName]) this._overwriteProps = [];
			else for (t = n.length; --t > -1;) null != e[n[t]] && n.splice(t, 1);
			for (; r;) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
			return !1
		}, s._roundProps = function(e, t) {
			for (var n = this._firstPT; n;)(e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t), n = n._next
		}, M._onPluginEvent = function(e, t) {
			var n, r, i, s, o, u = t._firstPT;
			if ("_onInitAllProps" === e) {
				for (; u;) {
					for (o = u._next, r = i; r && r.pr > u.pr;) r = r._next;
					(u._prev = r ? r._prev : s) ? u._prev._next = u : i = u, (u._next = r) ? r._prev = u : s = u, u = o
				}
				u = t._firstPT = i
			}
			for (; u;) u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0), u = u._next;
			return n
		}, Q.activate = function(e) {
			for (var t = e.length; --t > -1;) e[t].API === Q.API && (j[(new e[t])._propName] = e[t]);
			return !0
		}, m.plugin = function(e) {
			if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
			var t, n = e.propName,
				r = e.priority || 0,
				i = e.overwriteProps,
				s = {
					init: "_onInitTween",
					set: "setRatio",
					kill: "_kill",
					round: "_roundProps",
					initAll: "_onInitAllProps"
				},
				o = g("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
					Q.call(this, n, r), this._overwriteProps = i || []
				}, e.global === !0),
				u = o.prototype = new Q(n);
			u.constructor = o, o.API = e.API;
			for (t in s)"function" == typeof e[t] && (u[s[t]] = e[t]);
			return o.version = e.version, Q.activate([o]), o
		}, r = e._gsQueue) {
			for (i = 0; r.length > i; i++) r[i]();
			for (s in d) d[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
		}
		u = !1
	}
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
(function() {
	function e(e, t) {
		var o = e[0],
			u = e[1],
			a = e[2],
			f = e[3];
		o = n(o, u, a, f, t[0], 7, -680876936), f = n(f, o, u, a, t[1], 12, -389564586), a = n(a, f, o, u, t[2], 17, 606105819), u = n(u, a, f, o, t[3], 22, -1044525330), o = n(o, u, a, f, t[4], 7, -176418897), f = n(f, o, u, a, t[5], 12, 1200080426), a = n(a, f, o, u, t[6], 17, -1473231341), u = n(u, a, f, o, t[7], 22, -45705983), o = n(o, u, a, f, t[8], 7, 1770035416), f = n(f, o, u, a, t[9], 12, -1958414417), a = n(a, f, o, u, t[10], 17, -42063), u = n(u, a, f, o, t[11], 22, -1990404162), o = n(o, u, a, f, t[12], 7, 1804603682), f = n(f, o, u, a, t[13], 12, -40341101), a = n(a, f, o, u, t[14], 17, -1502002290), u = n(u, a, f, o, t[15], 22, 1236535329), o = r(o, u, a, f, t[1], 5, -165796510), f = r(f, o, u, a, t[6], 9, -1069501632), a = r(a, f, o, u, t[11], 14, 643717713), u = r(u, a, f, o, t[0], 20, -373897302), o = r(o, u, a, f, t[5], 5, -701558691), f = r(f, o, u, a, t[10], 9, 38016083), a = r(a, f, o, u, t[15], 14, -660478335), u = r(u, a, f, o, t[4], 20, -405537848), o = r(o, u, a, f, t[9], 5, 568446438), f = r(f, o, u, a, t[14], 9, -1019803690), a = r(a, f, o, u, t[3], 14, -187363961), u = r(u, a, f, o, t[8], 20, 1163531501), o = r(o, u, a, f, t[13], 5, -1444681467), f = r(f, o, u, a, t[2], 9, -51403784), a = r(a, f, o, u, t[7], 14, 1735328473), u = r(u, a, f, o, t[12], 20, -1926607734), o = i(o, u, a, f, t[5], 4, -378558), f = i(f, o, u, a, t[8], 11, -2022574463), a = i(a, f, o, u, t[11], 16, 1839030562), u = i(u, a, f, o, t[14], 23, -35309556), o = i(o, u, a, f, t[1], 4, -1530992060), f = i(f, o, u, a, t[4], 11, 1272893353), a = i(a, f, o, u, t[7], 16, -155497632), u = i(u, a, f, o, t[10], 23, -1094730640), o = i(o, u, a, f, t[13], 4, 681279174), f = i(f, o, u, a, t[0], 11, -358537222), a = i(a, f, o, u, t[3], 16, -722521979), u = i(u, a, f, o, t[6], 23, 76029189), o = i(o, u, a, f, t[9], 4, -640364487), f = i(f, o, u, a, t[12], 11, -421815835), a = i(a, f, o, u, t[15], 16, 530742520), u = i(u, a, f, o, t[2], 23, -995338651), o = s(o, u, a, f, t[0], 6, -198630844), f = s(f, o, u, a, t[7], 10, 1126891415), a = s(a, f, o, u, t[14], 15, -1416354905), u = s(u, a, f, o, t[5], 21, -57434055), o = s(o, u, a, f, t[12], 6, 1700485571), f = s(f, o, u, a, t[3], 10, -1894986606), a = s(a, f, o, u, t[10], 15, -1051523), u = s(u, a, f, o, t[1], 21, -2054922799), o = s(o, u, a, f, t[8], 6, 1873313359), f = s(f, o, u, a, t[15], 10, -30611744), a = s(a, f, o, u, t[6], 15, -1560198380), u = s(u, a, f, o, t[13], 21, 1309151649), o = s(o, u, a, f, t[4], 6, -145523070), f = s(f, o, u, a, t[11], 10, -1120210379), a = s(a, f, o, u, t[2], 15, 718787259), u = s(u, a, f, o, t[9], 21, -343485551), e[0] = c(o, e[0]), e[1] = c(u, e[1]), e[2] = c(a, e[2]), e[3] = c(f, e[3])
	}
	function t(e, t, n, r, i, s) {
		return t = c(c(t, e), c(r, s)), c(t << i | t >>> 32 - i, n)
	}
	function n(e, n, r, i, s, o, u) {
		return t(n & r | ~n & i, e, n, s, o, u)
	}
	function r(e, n, r, i, s, o, u) {
		return t(n & i | r & ~i, e, n, s, o, u)
	}
	function i(e, n, r, i, s, o, u) {
		return t(n ^ r ^ i, e, n, s, o, u)
	}
	function s(e, n, r, i, s, o, u) {
		return t(r ^ (n | ~i), e, n, s, o, u)
	}
	function o(t) {
		/[\x80-\xFF]/.test(t) && (t = unescape(encodeURI(t))), txt = "";
		var n = t.length,
			r = [1732584193, -271733879, -1732584194, 271733878],
			i;
		for (i = 64; i <= t.length; i += 64) e(r, u(t.substring(i - 64, i)));
		t = t.substring(i - 64);
		var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (i = 0; i < t.length; i++) s[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3);
		s[i >> 2] |= 128 << (i % 4 << 3);
		if (i > 55) {
			e(r, s);
			for (i = 0; i < 16; i++) s[i] = 0
		}
		return s[14] = n * 8, e(r, s), r
	}
	function u(e) {
		var t = [],
			n;
		for (n = 0; n < 64; n += 4) t[n >> 2] = e.charCodeAt(n) + (e.charCodeAt(n + 1) << 8) + (e.charCodeAt(n + 2) << 16) + (e.charCodeAt(n + 3) << 24);
		return t
	}
	function f(e) {
		var t = "",
			n = 0;
		for (; n < 4; n++) t += a[e >> n * 8 + 4 & 15] + a[e >> n * 8 & 15];
		return t
	}
	function l(e) {
		for (var t = 0; t < e.length; t++) e[t] = f(e[t]);
		return e.join("")
	}
	function c(e, t) {
		return e + t & 4294967295
	}
	var a = "0123456789abcdef".split("");
	md5 = function(e) {
		return l(o(e))
	};
	if (md5("hello") != "5d41402abc4b2a76b9719d911017c592") function c(e, t) {
		var n = (e & 65535) + (t & 65535),
			r = (e >> 16) + (t >> 16) + (n >> 16);
		return r << 16 | n & 65535
	}
})();

function FilterChain(e) {
	this.input = e
}
var Filter = {
	emotionOut: function(e) {
		return e.replace(/\<img src="http:\/\/meet.xpro.im\/v2\/api\/img\/emotion\/(\d+).gif" width="24px" height="24px"\>/g, function(e, t) {
			return "#" + t + ":"
		})
	},
	emotionIn: function(e) {
		return e.replace(/#(\d+):/g, function(e, t) {
			return t - 0 < 133 && t - 0 > 0 ? '<img src="http://meet.xpro.im/v2/api/img/emotion/' + t + '.gif" width="24px" height="24px">' : e
		})
	}
};
FilterChain.prototype.filter = function(e) {
	var t = Filter[e];
	return t && (this.input = t(this.input)), new FilterChain(this.input)
}, FilterChain.prototype.toString = function() {
	return this.input
}, window.FilterChain = FilterChain;

function SocketChat(e, t, n, r) {
	this._eventsListener = {}, this.name = e, this.room = {
		id: t,
		name: n
	}, this.encryption = r, this.init()
}
SocketChat.prototype.init = function() {
	function s(t) {
		t.onopen = function(e) {
			clearTimeout(i)
		}, t.onmessage = function(t) {
			e.parseMessage(JSON.parse(t.data))
		}, t.onerror = function(e) {
			console.log(e)
		}, t.onclose = function(e) {
			setTimeout(o, 3e3)
		}
	}
	function o() {
		i && clearTimeout(i);
		var t = e.socket = new WebSocket(r);
		s(t), i = setTimeout(o, 3e3)
	}
	var e = this,
		t = {
			wsUrl: "ws://meet.xpro.im:8080/xgate/websocket/",
			wssUrl: "wss://meet.xpro.im/xgate/websocket/"
		},
		n = t.wsUrl;
	e.encryption && (n = t.wssUrl);
	var r = n + md5(location.host + e.room.id) + "?nickname=" + encodeURIComponent(e.name),
		i;
	o()
}, SocketChat.prototype.send = function(e) {
	this.socket.send(e)
}, SocketChat.prototype.parseMessage = function(e) {
	function n(t) {
		return {
			type: t,
			roomId: e.xnest,
			from: e.from,
			content: e.payload,
			time: e.send_time
		}
	}
	var t = this;
	switch (e.type) {
	case "self":
		t.dispatch("connected", n("connected"));
		break;
	case "member_count":
		break;
	case "members":
		t.dispatch("members", n("members"));
		break;
	case "join":
		t.dispatch("joined", n("joined"));
		break;
	case "leave":
		t.dispatch("leaved", n("leaved"));
		break;
	case "changename":
		t.dispatch("changeName", n("changeName"));
		break;
	case "history":
		t.dispatch("history", n("history"));
		break;
	case "normal":
		t.dispatch("receive", n("receive"))
	}
}, SocketChat.prototype.on = function(e, t) {
	var n = this;
	n._eventsListener[e] = t
}, SocketChat.prototype.dispatch = function(e, t) {
	var n = this,
		r = n._eventsListener[e];
	r && r(t)
}, window.SocketChat = SocketChat;

function GroupChatWindow(e, t, n) {
	this._eventsListener = {}, this.roomId = e, this.roomName = t, this.self = n, this.init(), this.isShow = !0
}
GroupChatWindow.prototype.init = function() {
	var e = this,
		t = '<div id="px832kcdw" class="xmeet-chat-window">\n	<div class="window-title">\n		<img width="48" height="48" src="http://meet.xpro.im/v2/api/img/chat.png"/>\n		<span class="title"></span>\n		<span class="userList"></span>\n		<span class="setting"></span>\n		<span class="exit"></span>\n	</div>\n	<div class="window-body chat-messages">\n		<div class="userList-panel">\n			<ul class="users">\n			</ul>\n			<div class="close-panel">×</div>\n		</div>\n		<div class="setting-panel">\n			昵称：<input class="nickName" type="text" maxlength="20"/>\n			<div class="close-panel">×</div>\n		</div>\n		<div class="chat-messages-list"></div>\n	</div>\n\n	<div class="chat-input-bar">\n		<div class="chat-info-container">\n		</div>\n		<div class="chat-effect-container">\n			<div class="chat-effect-bar"></div>\n		</div>\n		<div class="chat-input-wrapper">\n			<button class="chat-input-tool">\n				<i class="icon-emotion"></i>\n			</button>\n			<div class="chat-input" contenteditable="true"></div>\n			<button class="chat-send">\n				<i class="icon-send" style="transform: translate3d(0px, 0px, 0px);"></i>\n			</button>\n		</div>\n	</div>\n\n	<div class="emotion-panel">\n	</div>\n	\n</div>',
		n = __.dom.create(t);
	document.body.appendChild(n[0]), e.node = n[0], setTimeout(function() {
		e.setupEmotion()
	}, 2e3), __.dom.get(".xmeet-chat-window .title")[0].innerHTML = e.roomName, __.dom.get(".setting-panel .nickName")[0].value = e.self.name, __.dom.on(".window-title .exit", "click", function(t) {
		e.isShow = !1, e.hide()
	}), __.dom.on(".icon-emotion", "click", function(e) {
		__.dom.toggle(".emotion-panel")
	}), __.dom.on(".chat-send", "click", function(t) {
		e.sendMessage()
	}), __.dom.on(".chat-input", "keydown", function(t) {
		t.which == 13 && (e.sendMessage(), t.stopPropagation(), t.preventDefault())
	}), __.dom.on(".nickName", "change", function(t) {
		t.target.value && (e.self.name = t.target.value, e.dispatch("changeName", {
			message: "@changename:" + e.self.name,
			from: e.self
		}), __.cookies.setItem("nickname", e.self.name, Infinity))
	});
	var r = __.dom.get(".setting-panel")[0],
		i = __.dom.get(".userList-panel")[0],
		s = __.dom.get(".window-title .setting")[0],
		o = __.dom.get(".window-title .userList")[0],
		u = __.dom.get(".setting-panel .close-panel")[0],
		a = __.dom.get(".userList-panel .close-panel")[0];
	__.dom.on(s, "click", function(t) {
		e.settingPanelShow ? u.click() : (TweenMax.to(r, .4, {
			top: 0,
			ease: Quad.easeInOut,
			onComplete: function() {
				e.settingPanelShow = !0
			}
		}), __.dom.addClass(s, "active")), e.usersPanelShow && a.click()
	}), __.dom.on(o, "click", function(t) {
		e.usersPanelShow ? a.click() : (TweenMax.to(i, .4, {
			top: 0,
			ease: Quad.easeInOut,
			onComplete: function() {
				e.usersPanelShow = !0
			}
		}), __.dom.addClass(o, "active")), e.settingPanelShow && u.click()
	}), __.dom.on(u, "click", function(t) {
		TweenMax.to(r, .4, {
			top: -120,
			ease: Quad.easeInOut,
			onComplete: function() {
				e.settingPanelShow = !1
			}
		}), __.dom.removeClass(s, "active")
	}), __.dom.on(a, "click", function(t) {
		TweenMax.to(i, .4, {
			top: -320,
			ease: Quad.easeInOut,
			onComplete: function() {
				e.usersPanelShow = !1
			}
		}), __.dom.removeClass(o, "active")
	})
}, GroupChatWindow.prototype.sendMessage = function() {
	var e = this,
		t = __.dom.get(".chat-input")[0],
		n = t.innerHTML;
	if (n == "") return;
	var r = __.dom.get(".chat-effect-container")[0],
		i = __.dom.get(".chat-send")[0],
		s = e.addMessage("message", n, e.self, e.getTime(), !0),
		o = s.container,
		u = __.dom.get(".chat-messages")[0],
		a = s.bubble,
		f = 48;
	t.innerHTML = "";
	var l = 48,
		c = l - f,
		h = __.dom.create('<div class="chat-message-effect"></div>')[0];
	h.appendChild(a.cloneNode(!0)), r.appendChild(h), __.dom.css(r, {
		left: 0,
		top: 0
	});
	var p = __.dom.offset(a),
		d = __.dom.offset(h),
		v = {
			x: p.left - d.left,
			y: p.top - d.top
		},
		m = u.scrollTop,
		g = 0,
		y, b = function(e, t, n) {
			return TweenMax.to(h, t, {
				y: e,
				ease: n,
				onUpdate: function() {
					var e = u.scrollTop,
						t = e - m;
					if (t > 0) {
						g += t, m = e;
						var n = y.time();
						y.kill(), y = b(v.y - g, .8 - n, Power2.easeOut)
					}
				}
			})
		};
	y = b(v.y, .8, Power2.easeInOut), TweenMax.to(h, .6, {
		delay: .2,
		x: v.x,
		ease: Quad.easeInOut,
		onComplete: function() {}
	}), TweenMax.from(a, .2, {
		delay: .65,
		opacity: 0,
		ease: Quad.easeInOut,
		onComplete: function() {
			TweenMax.killTweensOf(h), r.removeChild(h), e.dispatch("send", {
				message: n,
				from: e.self
			})
		}
	})
}, GroupChatWindow.prototype.addMessage = function(e, t, n, r, i) {
	var s = this,
		o = __.dom.get(".chat-messages")[0],
		u = __.dom.get(".chat-messages-list")[0],
		a = "",
		f = "";
	switch (e) {
	case "message":
		n.uid == s.self.uid ? a = "message-self" : a = "message-other", f = '<p class="user">' + n.name + "<i></i>" + r + '</p><div class="msg">' + t + "</div>";
		break;
	case "activity":
		a = "activity", f = '<div class="msg">' + t + "</div>";
		break;
	case "history":
//		n.uid == s.self.uid ? a = "hsitory-self" : a = "hsitory-other", f = '<p class="user">' + n.name + "<i></i>" + r + '</p><div class="msg">' + t + "</div>";
		break;
//	case "system":
//		a = "system", f = '<div class="msg">' + t + "</div>"
	}
	var l = __.dom.create('<li class="chat-message ' + a + '"></li>')[0];
	u.appendChild(l);
	var c = __.dom.create('<div class="chat-message-bubble"></div>')[0];
	c.innerHTML = f, l.appendChild(c);
	var h = u.scrollTop;
	u.scrollTop = 9999999;
	var p = u.scrollTop,
		d = p - h;
	return TweenMax.fromTo(u, .4, {
		y: d
	}, {
		y: 0,
		ease: Quint.easeOut
	}), {
		container: l,
		bubble: c
	}
}, GroupChatWindow.prototype.receiveMessage = function(e, t, n, r) {
	var i = this;
	if (n.uid == i.self.uid && e != "history") return;
	var s = i.addMessage(e, t, n, r, !1),
		o = s.container,
		u = s.bubble;
	TweenMax.set(u, {
		transformOrigin: "60px 50%"
	}), TweenMax.from(u, .4, {
		scale: 0,
		ease: Back.easeOut
	}), TweenMax.from(u, .4, {
		x: -100,
		ease: Quint.easeOut
	})
}, GroupChatWindow.prototype.startTyping = function() {
	var e = this;
	if (e.isTyping) return;
	e.isTyping = !0;
	var t = __.dom.get(".chat-effect-container")[0],
		n = __.dom.get(".chat-info-container")[0],
		r = __.dom.create('<div class="chat-effect-dots"></div>')[0];
	__.dom.css(r, {
		top: -30,
		left: 10
	}), t.appendChild(r), e.setFilter("url(#goo)");
	for (var i = 0; i < 3; i++) {
		var s = __.dom.create('<div class="chat-effect-dot">')[0];
		__.dom.css(s, {
			left: i * 20
		}), r.appendChild(s), TweenMax.to(s, .3, {
			delay: -i * .1,
			y: 30,
			yoyo: !0,
			repeat: -1,
			ease: Quad.easeInOut
		})
	}
	var o = __.dom.create('<div class="chat-info-typing">')[0];
	o.innerHTML = "正在输入", __.dom.css(o, {
		transform: "translate3d(0, 30px, 0)"
	}), n.appendChild(o), TweenMax.to(o, .3, {
		y: 0
	})
}, GroupChatWindow.prototype.StoppedTyping = function() {
	var e = this;
	if (!e.isTyping) return;
	e.isTyping = !1;
	var t = __.dom.get(".chat-effect-container")[0],
		n = __.dom.get(".chat-info-container")[0],
		r = __.dom.get(".chat-effect-dots")[0];
	TweenMax.to(r, .3, {
		y: 40,
		ease: Quad.easeIn
	});
	var i = __.dom.get(".chat-info-typing")[0];
	TweenMax.to(i, .3, {
		y: 30,
		ease: Quad.easeIn,
		onComplete: function() {
			t.removeChild(r), n.removeChild(i), e.setFilter("none")
		}
	})
}, GroupChatWindow.prototype.updateUsers = function(e) {
	var t = this,
		n = __.dom.get(".userList-panel .users")[0];
	n.innerHTML = "";
	for (var r in e) {
		var i = e[r],
			s = __.dom.create("<li>" + i.name + "</li>")[0];
		n.appendChild(s)
	}
}, GroupChatWindow.prototype.show = function() {
	var e = this;
	e.node.style.display = "block", e.isShow = !0, __.dom.get(".chat-messages-list")[0].scrollTop = 9999999
}, GroupChatWindow.prototype.hide = function() {
	var e = this;
	e.isShow = !1, e.node.style.display = "none", e.dispatch("hide")
}, GroupChatWindow.prototype.setFilter = function(e) {
	var t = __.dom.get(".chat-effect-container")[0];
	__.dom.css(t, {
		"-webkit-filter": e
	})
}, GroupChatWindow.prototype.on = function(e, t) {
	var n = this;
	n._eventsListener[e] = t
}, GroupChatWindow.prototype.dispatch = function(e, t) {
	var n = this,
		r = n._eventsListener[e];
	r && r(t)
}, GroupChatWindow.prototype.getTime = function() {
	var e = new Date,
		t = [],
		n = [];
	return t.push(e.getFullYear()), t.push(e.getMonth() + 1), t.push(e.getDate()), n.push(e.getHours()), n.push(e.getMinutes()), n.push(e.getSeconds()), t.join("-") + " " + n.join(":")
}, GroupChatWindow.prototype.setupEmotion = function() {
	function s() {
		var e = document.createElement("span"),
			t = null,
			r = null;
		n.appendChild(e), document.selection ? (t = document.body.createTextRange(), t.moveToElementText(e), t.select()) : window.getSelection && (t = document.createRange(), t.selectNode(e), r = window.getSelection(), r.removeAllRanges(), r.addRange(t)), n.removeChild(e)
	}
	var e = this,
		t = __.dom.get(".emotion-panel")[0],
		n = __.dom.get(".chat-input")[0],
		r = [];
	for (var i = 1; i < 133; i++) r.push('<img src="http://meet.xpro.im/v2/api/img/emotion/' + i + '.gif" width="24px" height="24px"/>');
	t.innerHTML = r.join(""), r.length = 0, __.dom.on(t, "click", function(e) {
		var r = e.target;
		r.tagName.toLowerCase() == "img" && (n.innerHTML += r.outerHTML, __.dom.hide(t), n.focus())
	}), __.dom.on(n, "focus", function(e) {
		s()
	})
}, window.GroupChatWindow = GroupChatWindow