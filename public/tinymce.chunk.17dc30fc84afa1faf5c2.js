(window.webpackJsonpunlayer = window.webpackJsonpunlayer || []).push([
  [2],
  {
    "/6p3": function (e, t) {
      (function () {
        var e, t, n, i, o;
        (e = {}),
          (t = function (t) {
            for (
              var i = e[t],
                o = i.deps,
                r = i.defn,
                l = o.length,
                a = new Array(l),
                u = 0;
              u < l;
              ++u
            )
              a[u] = n(o[u]);
            var c = r.apply(null, a);
            if (void 0 === c) throw "module [" + t + "] returned undefined";
            i.instance = c;
          }),
          (n = function (n) {
            var i = e[n];
            if (void 0 === i) throw "module [" + n + "] was undefined";
            return void 0 === i.instance && t(n), i.instance;
          }),
          (i = function (t, n, i) {
            if ("string" != typeof t) throw "module id must be a string";
            if (void 0 === n) throw "no dependencies for " + t;
            if (void 0 === i) throw "no definition function for " + t;
            e[t] = { deps: n, defn: i, instance: void 0 };
          }),
          (o = function (e, t) {
            i(e, [], function () {
              return t;
            });
          })("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve),
          i(
            "tinymce.core.PluginManager",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.PluginManager");
            }
          ),
          i(
            "tinymce.core.util.VK",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.util.VK");
            }
          ),
          i("tinymce.plugins.link.api.Settings", [], function () {
            var e = function (e) {
                return e.target_list;
              },
              t = function (e) {
                return e.rel_list;
              },
              n = function (e) {
                return e.link_class_list;
              };
            return {
              assumeExternalTargets: function (e) {
                return (
                  "boolean" == typeof e.link_assume_external_targets &&
                  e.link_assume_external_targets
                );
              },
              hasContextToolbar: function (e) {
                return (
                  "boolean" == typeof e.link_context_toolbar &&
                  e.link_context_toolbar
                );
              },
              getLinkList: function (e) {
                return e.link_list;
              },
              hasDefaultLinkTarget: function (e) {
                return "string" == typeof e.default_link_target;
              },
              getDefaultLinkTarget: function (e) {
                return e.default_link_target;
              },
              getTargetList: e,
              setTargetList: function (e, t) {
                e.settings.target_list = t;
              },
              shouldShowTargetList: function (t) {
                return !1 !== e(t);
              },
              getRelList: t,
              hasRelList: function (e) {
                return void 0 !== t(e);
              },
              getLinkClassList: n,
              hasLinkClassList: function (e) {
                return void 0 !== n(e);
              },
              shouldShowLinkTitle: function (e) {
                return !1 !== e.link_title;
              },
              allowUnsafeLinkTarget: function (e) {
                return (
                  "boolean" == typeof e.allow_unsafe_link_target &&
                  e.allow_unsafe_link_target
                );
              },
            };
          }),
          o("global!document", document),
          o("global!window", window),
          i(
            "tinymce.core.dom.DOMUtils",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.dom.DOMUtils");
            }
          ),
          i(
            "tinymce.core.Env",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.Env");
            }
          ),
          i(
            "tinymce.plugins.link.core.OpenUrl",
            [
              "global!document",
              "global!window",
              "tinymce.core.dom.DOMUtils",
              "tinymce.core.Env",
            ],
            function (e, t, n, i) {
              return {
                open: function (o) {
                  if (!i.ie || i.ie > 10) {
                    var r = e.createElement("a");
                    (r.target = "_blank"),
                      (r.href = o),
                      (r.rel = "noreferrer noopener");
                    var l = e.createEvent("MouseEvents");
                    l.initMouseEvent(
                      "click",
                      !0,
                      !0,
                      t,
                      0,
                      0,
                      0,
                      0,
                      0,
                      !1,
                      !1,
                      !1,
                      !1,
                      0,
                      null
                    ),
                      (function (t, n) {
                        e.body.appendChild(t),
                          t.dispatchEvent(n),
                          e.body.removeChild(t);
                      })(r, l);
                  } else {
                    var a = t.open("", "_blank");
                    if (a) {
                      a.opener = null;
                      var u = a.document;
                      u.open(),
                        u.write(
                          '<meta http-equiv="refresh" content="0; url=' +
                            n.DOM.encode(o) +
                            '">'
                        ),
                        u.close();
                    }
                  }
                },
              };
            }
          ),
          o("global!RegExp", RegExp),
          i(
            "tinymce.core.util.Tools",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.util.Tools");
            }
          ),
          i(
            "tinymce.plugins.link.core.Utils",
            [
              "global!RegExp",
              "tinymce.core.util.Tools",
              "tinymce.plugins.link.api.Settings",
            ],
            function (e, t, n) {
              var i = function (e, n) {
                  var i = ["noopener"],
                    o = e ? e.split(/\s+/) : [],
                    r = function (e) {
                      return e.filter(function (e) {
                        return -1 === t.inArray(i, e);
                      });
                    };
                  return (o = n
                    ? (function (e) {
                        return (e = r(e)).length ? e.concat(i) : i;
                      })(o)
                    : r(o)).length
                    ? (function (e) {
                        return t.trim(e.sort().join(" "));
                      })(o)
                    : null;
                },
                o = function (e, t) {
                  return (
                    (t = t || e.selection.getStart()),
                    l(t)
                      ? e.dom.select("a[href]", t)[0]
                      : e.dom.getParent(t, "a[href]")
                  );
                },
                r = function (e) {
                  return e && "A" === e.nodeName && e.href;
                },
                l = function (e) {
                  return (
                    e &&
                    "FIGURE" === e.nodeName &&
                    /\bimage\b/i.test(e.className)
                  );
                },
                a = function (e, t) {
                  var n, i;
                  (i = e.dom.select("img", t)[0]) &&
                    (n = e.dom.getParents(i, "a[href]", t)[0]) &&
                    (n.parentNode.insertBefore(i, n), e.dom.remove(n));
                },
                u = function (e, t, n) {
                  var i, o;
                  (o = e.dom.select("img", t)[0]) &&
                    ((i = e.dom.create("a", n)),
                    o.parentNode.insertBefore(i, o),
                    i.appendChild(o));
                };
              return {
                link: function (e, t) {
                  return function (r) {
                    e.undoManager.transact(function () {
                      var a = e.selection.getNode(),
                        c = o(e, a),
                        s = {
                          href: r.href,
                          target: r.target ? r.target : null,
                          rel: r.rel ? r.rel : null,
                          class: r.class ? r.class : null,
                          title: r.title ? r.title : null,
                        };
                      n.hasRelList(e.settings) ||
                        !1 !== n.allowUnsafeLinkTarget(e.settings) ||
                        (s.rel = i(s.rel, "_blank" === s.target)),
                        r.href === t.href && (t.attach(), (t = {})),
                        c
                          ? (e.focus(),
                            r.hasOwnProperty("text") &&
                              ("innerText" in c
                                ? (c.innerText = r.text)
                                : (c.textContent = r.text)),
                            e.dom.setAttribs(c, s),
                            e.selection.select(c),
                            e.undoManager.add())
                          : l(a)
                          ? u(e, a, s)
                          : r.hasOwnProperty("text")
                          ? e.insertContent(
                              e.dom.createHTML("a", s, e.dom.encode(r.text))
                            )
                          : e.execCommand("mceInsertLink", !1, s);
                    });
                  };
                },
                unlink: function (e) {
                  return function () {
                    e.undoManager.transact(function () {
                      var t = e.selection.getNode();
                      l(t) ? a(e, t) : e.execCommand("unlink");
                    });
                  };
                },
                isLink: r,
                hasLinks: function (e) {
                  return t.grep(e, r).length > 0;
                },
                isOnlyTextSelected: function (e) {
                  return !(
                    /</.test(e) &&
                    (!/^<a [^>]+>[^<]+<\/a>$/.test(e) ||
                      -1 === e.indexOf("href="))
                  );
                },
                getAnchorElement: o,
                getAnchorText: function (e, t) {
                  return (function (e) {
                    return e.replace(/\uFEFF/g, "");
                  })(
                    t
                      ? t.innerText || t.textContent
                      : e.getContent({ format: "text" })
                  );
                },
                toggleTargetRules: i,
              };
            }
          ),
          i(
            "tinymce.core.util.Delay",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.util.Delay");
            }
          ),
          i(
            "tinymce.core.util.XHR",
            ["global!tinymce.util.Tools.resolve"],
            function (e) {
              return e("tinymce.util.XHR");
            }
          ),
          i(
            "tinymce.plugins.link.ui.Dialog",
            [
              "tinymce.core.util.Delay",
              "tinymce.core.util.Tools",
              "tinymce.core.util.XHR",
              "tinymce.plugins.link.api.Settings",
              "tinymce.plugins.link.core.Utils",
            ],
            function (e, t, n, i, o) {
              var r = {},
                l = function (e, n, i) {
                  return (function e(i, o) {
                    return (
                      (o = o || []),
                      t.each(i, function (t) {
                        var i = { text: t.text || t.title };
                        t.menu
                          ? (i.menu = e(t.menu))
                          : ((i.value = t.value), n && n(i)),
                          o.push(i);
                      }),
                      o
                    );
                  })(e, i || []);
                },
                a = function (t, n, i) {
                  var o = t.selection.getRng();
                  e.setEditorTimeout(t, function () {
                    t.windowManager.confirm(n, function (e) {
                      t.selection.setRng(o), i(e);
                    });
                  });
                },
                u = function (e, n) {
                  var u,
                    c,
                    s,
                    f,
                    g,
                    p,
                    d,
                    m,
                    y,
                    h,
                    v,
                    b = {},
                    k = e.selection,
                    x = e.dom,
                    T = function (e) {
                      var t = s.find("#text");
                      (!t.value() ||
                        (e.lastControl &&
                          t.value() === e.lastControl.text())) &&
                        t.value(e.control.text()),
                        s.find("#href").value(e.control.value());
                    },
                    w = function () {
                      c ||
                        !f ||
                        b.text ||
                        this.parent()
                          .parent()
                          .find("#text")[0]
                          .value(this.value());
                    };
                  (f = o.isOnlyTextSelected(k.getContent())),
                    (u = o.getAnchorElement(e)),
                    (b.text = c = o.getAnchorText(e.selection, u)),
                    (b.href = u ? x.getAttrib(u, "href") : ""),
                    u
                      ? (b.target = x.getAttrib(u, "target"))
                      : i.hasDefaultLinkTarget(e.settings) &&
                        (b.target = i.getDefaultLinkTarget(e.settings)),
                    (v = x.getAttrib(u, "rel")) && (b.rel = v),
                    (v = x.getAttrib(u, "class")) && (b.class = v),
                    (v = x.getAttrib(u, "title")) && (b.title = v),
                    f &&
                      (g = {
                        name: "text",
                        type: "textbox",
                        size: 40,
                        label: "Text to display",
                        onchange: function () {
                          b.text = this.value();
                        },
                      }),
                    n &&
                      (p = {
                        type: "listbox",
                        label: "Link list",
                        values: l(
                          n,
                          function (t) {
                            t.value = e.convertURL(t.value || t.url, "href");
                          },
                          [{ text: "None", value: "" }]
                        ),
                        onselect: T,
                        value: e.convertURL(b.href, "href"),
                        onPostRender: function () {
                          p = this;
                        },
                      }),
                    i.shouldShowTargetList(e.settings) &&
                      (void 0 === i.getTargetList(e.settings) &&
                        i.setTargetList(e, [
                          { text: "None", value: "" },
                          { text: "New window", value: "_blank" },
                        ]),
                      (m = {
                        name: "target",
                        type: "listbox",
                        label: "Target",
                        values: l(i.getTargetList(e.settings)),
                      })),
                    i.hasRelList(e.settings) &&
                      (d = {
                        name: "rel",
                        type: "listbox",
                        label: "Rel",
                        values: l(i.getRelList(e.settings), function (t) {
                          !1 === i.allowUnsafeLinkTarget(e.settings) &&
                            (t.value = o.toggleTargetRules(
                              t.value,
                              "_blank" === b.target
                            ));
                        }),
                      }),
                    i.hasLinkClassList(e.settings) &&
                      (y = {
                        name: "class",
                        type: "listbox",
                        label: "Class",
                        values: l(i.getLinkClassList(e.settings), function (t) {
                          t.value &&
                            (t.textStyle = function () {
                              return e.formatter.getCssText({
                                inline: "a",
                                classes: [t.value],
                              });
                            });
                        }),
                      }),
                    i.shouldShowLinkTitle(e.settings) &&
                      (h = {
                        name: "title",
                        type: "textbox",
                        label: "Title",
                        value: b.title,
                      }),
                    (s = e.windowManager.open({
                      title: "Insert link",
                      data: b,
                      body: [
                        {
                          name: "href",
                          type: "filepicker",
                          filetype: "file",
                          size: 40,
                          autofocus: !0,
                          label: "Url",
                          onchange: function (n) {
                            var i = n.meta || {};
                            p && p.value(e.convertURL(this.value(), "href")),
                              t.each(n.meta, function (e, t) {
                                var n = s.find("#" + t);
                                "text" === t
                                  ? 0 === c.length && (n.value(e), (b.text = e))
                                  : n.value(e);
                              }),
                              i.attach &&
                                (r = { href: this.value(), attach: i.attach }),
                              i.text || w.call(this);
                          },
                          onkeyup: w,
                          onbeforecall: function (e) {
                            e.meta = s.toJSON();
                          },
                        },
                        g,
                        h,
                        (function (n) {
                          var i = [];
                          if (
                            (t.each(
                              e.dom.select("a:not([href])"),
                              function (e) {
                                var t = e.name || e.id;
                                t &&
                                  i.push({
                                    text: t,
                                    value: "#" + t,
                                    selected: -1 !== n.indexOf("#" + t),
                                  });
                              }
                            ),
                            i.length)
                          )
                            return (
                              i.unshift({ text: "None", value: "" }),
                              {
                                name: "anchor",
                                type: "listbox",
                                label: "Anchors",
                                values: i,
                                onselect: T,
                              }
                            );
                        })(b.href),
                        p,
                        d,
                        m,
                        y,
                      ],
                      onSubmit: function (n) {
                        var l = i.assumeExternalTargets(e.settings),
                          u = o.link(e, r),
                          s = o.unlink(e),
                          g = t.extend({}, b, n.data);
                        g.href = g.href.trim();
                        var p = g.href;
                        p
                          ? ((f && g.text !== c) || delete g.text,
                            p.indexOf("@") > 0 &&
                            -1 === p.indexOf("//") &&
                            -1 === p.indexOf("mailto:")
                              ? a(
                                  e,
                                  "The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",
                                  function (e) {
                                    e && (g.href = "mailto:" + p), u(g);
                                  }
                                )
                              : (!0 === l && !/^\w+:/i.test(p)) ||
                                (!1 === l && /^\s*www[\.|\d\.]/i.test(p))
                              ? a(
                                  e,
                                  "The URL you entered seems to be an external link. Do you want to add the required http:// prefix?",
                                  function (e) {
                                    e && (g.href = "http://" + p), u(g);
                                  }
                                )
                              : u(g))
                          : s();
                      },
                    }));
                };
              return {
                open: function (e) {
                  !(function (e, t) {
                    var o = i.getLinkList(e.settings);
                    "string" == typeof o
                      ? n.send({
                          url: o,
                          success: function (n) {
                            t(e, JSON.parse(n));
                          },
                        })
                      : "function" == typeof o
                      ? o(function (n) {
                          t(e, n);
                        })
                      : t(e, o);
                  })(e, u);
                },
              };
            }
          ),
          i(
            "tinymce.plugins.link.core.Actions",
            [
              "tinymce.core.util.VK",
              "tinymce.plugins.link.api.Settings",
              "tinymce.plugins.link.core.OpenUrl",
              "tinymce.plugins.link.core.Utils",
              "tinymce.plugins.link.ui.Dialog",
            ],
            function (e, t, n, i, o) {
              var r = function (e, t) {
                  return e.dom.getParent(t, "a[href]");
                },
                l = function (e) {
                  return r(e, e.selection.getStart());
                },
                a = function (e, t) {
                  if (t) {
                    var i = (function (e) {
                      var t = e.getAttribute("data-mce-href");
                      return t || e.getAttribute("href");
                    })(t);
                    if (/^#/.test(i)) {
                      var o = e.$(i);
                      o.length && e.selection.scrollIntoView(o[0], !0);
                    } else n.open(t.href);
                  }
                };
              return {
                openDialog: function (e) {
                  return function () {
                    o.open(e);
                  };
                },
                gotoSelectedLink: function (e) {
                  return function () {
                    a(e, l(e));
                  };
                },
                leftClickedOnAHref: function (e) {
                  return function (n) {
                    var o, r, l;
                    return !!(
                      t.hasContextToolbar(e.settings) &&
                      !(function (e) {
                        var t = e.plugins.contextmenu;
                        return !!t && t.isContextMenuVisible();
                      })(e) &&
                      i.isLink(n) &&
                      3 ===
                        (l = (r = (o = e.selection).getRng()).startContainer)
                          .nodeType &&
                      o.isCollapsed() &&
                      r.startOffset > 0 &&
                      r.startOffset < l.data.length
                    );
                  };
                },
                setupGotoLinks: function (t) {
                  t.on("click", function (n) {
                    var i = r(t, n.target);
                    i && e.metaKeyPressed(n) && (n.preventDefault(), a(t, i));
                  }),
                    t.on("keydown", function (e) {
                      var n = l(t);
                      n &&
                        13 === e.keyCode &&
                        (function (e) {
                          return (
                            !0 === e.altKey &&
                            !1 === e.shiftKey &&
                            !1 === e.ctrlKey &&
                            !1 === e.metaKey
                          );
                        })(e) &&
                        (e.preventDefault(), a(t, n));
                    });
                },
                toggleActiveState: function (e) {
                  return function () {
                    var t = this;
                    e.on("nodechange", function (n) {
                      t.active(
                        !e.readonly && !!i.getAnchorElement(e, n.element)
                      );
                    });
                  };
                },
                toggleViewLinkState: function (e) {
                  return function () {
                    var t = this,
                      n = function (e) {
                        i.hasLinks(e.parents) ? t.show() : t.hide();
                      };
                    i.hasLinks(e.dom.getParents(e.selection.getStart())) ||
                      t.hide(),
                      e.on("nodechange", n),
                      t.on("remove", function () {
                        e.off("nodechange", n);
                      });
                  };
                },
              };
            }
          ),
          i(
            "tinymce.plugins.link.api.Commands",
            ["tinymce.plugins.link.core.Actions"],
            function (e) {
              return {
                register: function (t) {
                  t.addCommand("mceLink", e.openDialog(t));
                },
              };
            }
          ),
          i(
            "tinymce.plugins.link.core.Keyboard",
            ["tinymce.plugins.link.core.Actions"],
            function (e) {
              return {
                setup: function (t) {
                  t.addShortcut("Meta+K", "", e.openDialog(t));
                },
              };
            }
          ),
          i(
            "tinymce.plugins.link.ui.Controls",
            [
              "tinymce.plugins.link.core.Actions",
              "tinymce.plugins.link.core.Utils",
            ],
            function (e, t) {
              return {
                setupButtons: function (n) {
                  n.addButton("link", {
                    icon: "link",
                    tooltip: "Insert/edit link",
                    onclick: e.openDialog(n),
                    onpostrender: e.toggleActiveState(n),
                  }),
                    n.addButton("unlink", {
                      icon: "unlink",
                      tooltip: "Remove link",
                      onclick: t.unlink(n),
                      onpostrender: e.toggleActiveState(n),
                    }),
                    n.addContextToolbar &&
                      n.addButton("openlink", {
                        icon: "newtab",
                        tooltip: "Open link",
                        onclick: e.gotoSelectedLink(n),
                      });
                },
                setupMenuItems: function (t) {
                  t.addMenuItem("openlink", {
                    text: "Open link",
                    icon: "newtab",
                    onclick: e.gotoSelectedLink(t),
                    onPostRender: e.toggleViewLinkState(t),
                    prependToContext: !0,
                  }),
                    t.addMenuItem("link", {
                      icon: "link",
                      text: "Link",
                      shortcut: "Meta+K",
                      onclick: e.openDialog(t),
                      stateSelector: "a[href]",
                      context: "insert",
                      prependToContext: !0,
                    });
                },
                setupContextToolbars: function (t) {
                  t.addContextToolbar &&
                    t.addContextToolbar(
                      e.leftClickedOnAHref(t),
                      "openlink | link unlink"
                    );
                },
              };
            }
          ),
          i(
            "tinymce.plugins.link.Plugin",
            [
              "tinymce.core.PluginManager",
              "tinymce.plugins.link.api.Commands",
              "tinymce.plugins.link.core.Actions",
              "tinymce.plugins.link.core.Keyboard",
              "tinymce.plugins.link.ui.Controls",
            ],
            function (e, t, n, i, o) {
              return (
                e.add("link", function (e) {
                  o.setupButtons(e),
                    o.setupMenuItems(e),
                    o.setupContextToolbars(e),
                    n.setupGotoLinks(e),
                    t.register(e),
                    i.setup(e);
                }),
                function () {}
              );
            }
          ),
          n("tinymce.plugins.link.Plugin")();
      }).call(window);
    },
    DFv6: function (e, t, n) {
      "use strict";
      n.r(t);
      var i = n("mXGw"),
        o = n.n(i),
        r = (n("xARA"), n("/m4v")),
        l = n("i84e"),
        a = n("GYL1"),
        u = n("jlzH"),
        c = n.n(u),
        s =
          (n("dQZu"),
          n("7ekL"),
          n("UqOZ"),
          n("F16X"),
          n("6GrM"),
          n("irJZ"),
          n("oXG4"),
          n("/6p3"),
          n("Cme7")),
        f = n("9va6"),
        g = n("eue7");
      function p(e) {
        return (p =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function d(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = new Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
          })(e) ||
          (function (e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      function m(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      function y(e) {
        return (y = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function h(e, t) {
        return (h =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function v(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function b(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var k = l.selectors.getCurrentSelection,
        x = l.selectors.getMergeTags,
        T = l.selectors.getSyncVersion,
        w = l.selectors.getLocale,
        L = (function (e) {
          function t(e) {
            var n, i, r;
            return (
              (function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              (i = this),
              (r = y(t).call(this, e)),
              b(
                v(
                  v(
                    (n =
                      !r || ("object" !== p(r) && "function" != typeof r)
                        ? v(i)
                        : r)
                  )
                ),
                "setRef",
                function (e) {
                  c.a.activeEditor && c.a.activeEditor.destroy(),
                    e && n.initEditor(e);
                }
              ),
              b(v(v(n)), "initEditor", function (e) {
                var t = v(v(n)),
                  i = n.props,
                  o = i.selection,
                  r = i.updateValue,
                  l = i.type,
                  u = i.mergeTags,
                  s = i.mergeTagGroup,
                  g = i.values.lineHeight,
                  p = (parseInt(g), n.props.locale),
                  m = e.querySelectorAll(".editable")[0],
                  y = [
                    "fontselect fontsizeselect | bold italic underline",
                    "alignleft aligncenter alignright | bullist numlist | forecolor backcolor | ltr rtl | link unlink",
                  ];
                "button" == l &&
                  (y = ["fontselect fontsizeselect | bold italic underline"]);
                var h =
                    "autolink lists textcolor colorpicker autoresize link directionality",
                  b = a.default
                    .getFonts()
                    .map(function (e) {
                      return e.label + "=" + e.value;
                    })
                    .join(";");
                if (!Object(f.isEmpty)(u)) {
                  var k = n.props.intl,
                    x = Object.values(u).filter(function (e) {
                      return !e.rules;
                    }),
                    T = s && u[s],
                    w = d(x)
                      .concat([T])
                      .filter(function (e) {
                        return !Object(f.isEmpty)(e);
                      });
                  "button" != l && (y[y.length - 1] += " | personalize"),
                    (h += " personalize"),
                    c.a.PluginManager.add("personalize", function (e) {
                      e.addButton("personalize", {
                        type: "menubutton",
                        text: k.formatMessage({
                          id: "labels.merge_tags",
                          defaultMessage: "Merge Tags",
                        }),
                        icon: "user",
                        menu: w.map(function (n) {
                          return t.handleMergeTagsMenu(e, n);
                        }),
                      });
                    });
                }
                var L = {
                    "ar-AE": "ar",
                    "da-DA": "da",
                    "et-EE": "et",
                    "fa-IR": "fa",
                    "fi-FI": "fi",
                    "fr-FR": "fr",
                    "fr-CA": "fr",
                    "de-DE": "de",
                    "it-IT": "it",
                    pt: "pt_BR",
                    "ru-RU": "ru",
                    "es-ES": "es",
                    sv: "sv_SE",
                    "tr-TR": "tr",
                  },
                  S = Object(f.first)((p || "en-US").split("-")),
                  _ = L[p] || L[S] || p;
                ("en" != _ && "en-US" != _) || (_ = ""),
                  (_ = _.replace("-", "_")),
                  setTimeout(function () {
                    c.a.init({
                      target: m,
                      menubar: !1,
                      inline: !0,
                      skin: !1,
                      plugins: h,
                      toolbar: y,
                      language_url: _
                        ? ""
                            .concat(
                              "https://editor.unlayer.com",
                              "/tinymce/langs/"
                            )
                            .concat(_, ".js")
                        : "",
                      fontsize_formats:
                        "8px 10px 12px 14px 16px 18px 20px 24px 30px 34px 36px 40px 44px 48px 72px",
                      font_formats: b,
                      fixed_toolbar_container:
                        ".blockbuilder-layer-inline-editor",
                      init_instance_callback: function (e) {
                        c.a.execCommand("mceFocus", !1, e.id),
                          e.on("blur", function (n) {
                            var i = t.applyStyles(e);
                            r(o.location, "text", i);
                          }),
                          t.context.updateInlineEditorPosition();
                      },
                      setup: function (e) {
                        e.on("change", function (n) {
                          t.applyStyles(e),
                            t.context.updateInlineEditorPosition();
                        });
                      },
                    });
                  }, 200);
              }),
              b(v(v(n)), "handleMergeTagsMenu", function (e, t) {
                var i = t.name,
                  o = t.value,
                  r = t.mergeTags,
                  l = v(v(n));
                return r
                  ? {
                      text: i,
                      menu: Object.values(r).map(function (t) {
                        return l.handleMergeTagsMenu(e, t);
                      }),
                    }
                  : {
                      text: i,
                      onclick: function () {
                        e.insertContent(o);
                      },
                    };
              }),
              b(v(v(n)), "applyStyles", function (e) {
                var t = n.props.values.lineHeight,
                  i = parseInt(t) / 100,
                  o = e || c.a.activeEditor;
                return o
                  ? (o.dom.select("p").forEach(function (e) {
                      var n = o.dom.getStyle(e, "font-size", !0);
                      o.dom.setStyle(
                        e,
                        "font-size",
                        "".concat(parseInt(n, 10), "px")
                      ),
                        o.dom.setStyle(e, "line-height", "".concat(t));
                    }),
                    o.dom.select("span").forEach(function (e) {
                      var t = o.dom.getStyle(e, "font-size", !0);
                      o.dom.setStyle(
                        e,
                        "font-size",
                        "".concat(parseInt(t, 10), "px")
                      ),
                        o.dom.setStyle(
                          e,
                          "line-height",
                          "".concat(parseInt(t, 10) * i, "px")
                        );
                    }),
                    o.dom.select("li").forEach(function (e) {
                      var t = o.dom.getStyle(e, "font-size", !0);
                      o.dom.setStyle(
                        e,
                        "font-size",
                        "".concat(parseInt(t, 10), "px")
                      ),
                        o.dom.setStyle(
                          e,
                          "line-height",
                          "".concat(parseInt(t, 10) * i, "px")
                        );
                    }),
                    o
                      .getContent()
                      .replace(
                        new RegExp("href=[\"'](.*?)[\"']"),
                        function (e) {
                          return Object(f.unescape)(e);
                        }
                      ))
                  : null;
              }),
              (n.editorRef = o.a.createRef()),
              (n.state = { content: null }),
              n
            );
          }
          var n, r, l;
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                t && h(e, t);
            })(t, i["Component"]),
            (n = t),
            (r = [
              {
                key: "componentDidMount",
                value: function () {
                  this.setRef(this.editorRef.current);
                },
              },
              {
                key: "componentDidUpdate",
                value: function (e, t) {
                  var n = this.props,
                    i = n.selection,
                    o = n.updateValue;
                  if (
                    n.values.lineHeight != e.values.lineHeight ||
                    e.syncVersion != this.props.syncVersion
                  ) {
                    var r = this.applyStyles();
                    t.content !== r &&
                      this.setState({ content: r }, function () {
                        o(i.location, "text", r);
                      });
                  }
                  e.mergeTagGroup !== this.props.mergeTagGroup &&
                    this.setRef(this.editorRef.current);
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  var e = this.props,
                    t = e.selection,
                    n = e.updateValue,
                    i = c.a.activeEditor;
                  if (i) {
                    var o = this.applyStyles(i);
                    n(t.location, "text", o);
                  }
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.children,
                    n = { padding: e.values.containerPadding };
                  return o.a.createElement(
                    "div",
                    {
                      style: n,
                      className: "blockbuilder-inline-editor",
                      ref: this.editorRef,
                    },
                    t
                  );
                },
              },
            ]) && m(n.prototype, r),
            l && m(n, l),
            t
          );
        })();
      b(L, "contextType", g.UIContext);
      (L = Object(s.injectIntl)(L)),
        (L = Object(r.connect)(
          function (e, t) {
            return {
              selection: k(e),
              mergeTags: x(e),
              syncVersion: T(e),
              locale: w(e),
            };
          },
          function (e) {
            return {
              updateValue: function (t, n, i) {
                e(l.actions.updateValue({ location: t, name: n, value: i }));
              },
            };
          }
        )(L)),
        (t.default = L);
    },
  },
]);
