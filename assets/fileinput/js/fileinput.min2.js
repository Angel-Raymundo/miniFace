/*!
 * bootstrap-fileinput v4.3.2
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2016, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery)
}(function(e) {
    "use strict";
    e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {};
    var t, i, a, n, r, l, o, s, d, c, p, u, f, m, g, v, h, w, b, _, C, x, y, T, F, k, E, $, S, I, P, D, z, A, U, j, L, Z, B, O, R, M, N, H, q, W, V, K, G, X, Y, J, Q, ee, te, ie, ae, ne, re, le, oe, se, de, ce, pe, ue, fe, me, ge;
    t = ".fileinput", i = "kvFileinputModal", a = 'style="width:{width};height:{height};"', n = '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n', r = '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>', l = window.URL || window.webkitURL, o = function(e, t, i) {
        return void 0 !== e && (i ? e === t : e.match(t))
    }, s = function(e) {
        if ("Microsoft Internet Explorer" !== navigator.appName) return !1;
        if (10 === e) return new RegExp("msie\\s" + e, "i").test(navigator.userAgent);
        var t, i = document.createElement("div");
        return i.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", t = i.getElementsByTagName("i").length, document.body.appendChild(i), i.parentNode.removeChild(i), t
    }, d = function() {
        return new RegExp("Edge/[0-9]+", "i").test(navigator.userAgent)
    }, c = function(e, i, a, n) {
        var r = n ? i : i.split(" ").join(t + " ") + t;
        e.off(r).on(r, a)
    }, p = {
        data: {},
        init: function(e) {
            var t = e.initialPreview,
                i = e.id;
            t.length > 0 && !re(t) && (t = t.split(e.initialPreviewDelimiter)), p.data[i] = {
                content: t,
                config: e.initialPreviewConfig,
                tags: e.initialPreviewThumbTags,
                delimiter: e.initialPreviewDelimiter,
                previewFileType: e.initialPreviewFileType,
                previewAsData: e.initialPreviewAsData,
                template: e.previewGenericTemplate,
                showZoom: e.fileActionSettings.showZoom,
                showDrag: e.fileActionSettings.showDrag,
                getSize: function(t) {
                    return e._getSize(t)
                },
                parseTemplate: function(t, i, a, n, r, l, o) {
                    var s = " file-preview-initial";
                    return e._generatePreviewTemplate(t, i, a, n, r, !1, null, s, l, o)
                },
                msg: function(t) {
                    return e._getMsgSelected(t)
                },
                initId: e.previewInitId,
                footer: e._getLayoutTemplate("footer").replace(/\{progress}/g, e._renderThumbProgress()),
                isDelete: e.initialPreviewShowDelete,
                caption: e.initialCaption,
                actions: function(t, i, a, n, r, l, o) {
                    return e._renderFileActions(t, i, a, n, r, l, o, !0)
                }
            }
        },
        fetch: function(e) {
            return p.data[e].content.filter(function(e) {
                return null !== e
            })
        },
        count: function(e, t) {
            return p.data[e] && p.data[e].content ? t ? p.data[e].content.length : p.fetch(e).length : 0
        },
        get: function(t, i, a) {
            var n, r, l, o, s, d, c = "init_" + i,
                u = p.data[t],
                f = u.config[i],
                m = u.content[i],
                g = u.initId + "-" + c,
                v = " file-preview-initial",
                h = le("previewAsData", f, u.previewAsData);
            return a = void 0 === a ? !0 : a, m ? (f && f.frameClass && (v += " " + f.frameClass), h ? (l = u.previewAsData ? le("type", f, u.previewFileType || "generic") : "generic", o = le("caption", f), s = p.footer(t, i, a, f && f.size || null), d = le("filetype", f, l), n = u.parseTemplate(l, m, o, d, g, s, c, null)) : n = u.template.replace(/\{previewId}/g, g).replace(/\{frameClass}/g, v).replace(/\{fileindex}/g, c).replace(/\{content}/g, u.content[i]).replace(/\{template}/g, le("type", f, u.previewFileType)).replace(/\{footer}/g, p.footer(t, i, a, f && f.size || null)), u.tags.length && u.tags[i] && (n = de(n, u.tags[i])), ne(f) || ne(f.frameAttr) || (r = e(document.createElement("div")).html(n), r.find(".file-preview-initial").attr(f.frameAttr), n = r.html(), r.remove()), n) : ""
        },
        add: function(t, i, a, n, r) {
            var l, o = e.extend(!0, {}, p.data[t]);
            return re(i) || (i = i.split(o.delimiter)), r ? (l = o.content.push(i) - 1, o.config[l] = a, o.tags[l] = n) : (l = i.length - 1, o.content = i, o.config = a, o.tags = n), p.data[t] = o, l
        },
        set: function(t, i, a, n, r) {
            var l, o, s = e.extend(!0, {}, p.data[t]);
            if (i && i.length && (re(i) || (i = i.split(s.delimiter)), o = i.filter(function(e) {
                    return null !== e
                }), o.length)) {
                if (void 0 === s.content && (s.content = []), void 0 === s.config && (s.config = []), void 0 === s.tags && (s.tags = []), r) {
                    for (l = 0; l < i.length; l++) i[l] && s.content.push(i[l]);
                    for (l = 0; l < a.length; l++) a[l] && s.config.push(a[l]);
                    for (l = 0; l < n.length; l++) n[l] && s.tags.push(n[l])
                } else s.content = i, s.config = a, s.tags = n;
                p.data[t] = s
            }
        },
        unset: function(e, t) {
            var i = p.count(e);
            if (i) {
                if (1 === i) return p.data[e].content = [], p.data[e].config = [], void(p.data[e].tags = []);
                p.data[e].content[t] = null, p.data[e].config[t] = null, p.data[e].tags[t] = null
            }
        },
        out: function(e) {
            var t, i = "",
                a = p.data[e],
                n = p.count(e, !0);
            if (0 === n) return {
                content: "",
                caption: ""
            };
            for (var r = 0; n > r; r++) i += p.get(e, r);
            return t = a.msg(p.count(e)), {
                content: '<div class="file-initial-thumbs">' + i + "</div>",
                caption: t
            }
        },
        footer: function(e, t, i, a) {
            var n = p.data[e];
            if (i = void 0 === i ? !0 : i, 0 === n.config.length || ne(n.config[t])) return "";
            var r = n.config[t],
                l = le("caption", r),
                o = le("width", r, "auto"),
                s = le("url", r, !1),
                d = le("key", r, null),
                c = le("showDelete", r, !0),
                u = le("showZoom", r, n.showZoom),
                f = le("showDrag", r, n.showDrag),
                m = s === !1 && i,
                g = n.isDelete ? n.actions(!1, c, u, f, m, s, d) : "",
                v = n.footer.replace(/\{actions}/g, g);
            return v.replace(/\{caption}/g, l).replace(/\{size}/g, n.getSize(a)).replace(/\{width}/g, o).replace(/\{indicator}/g, "").replace(/\{indicatorTitle}/g, "")
        }
    }, u = function(e, t) {
        return t = t || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? t : e)
    }, f = function() {
        return !(!window.File || !window.FileReader)
    }, m = function() {
        var e = document.createElement("div");
        return !s(9) && !d() && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)
    }, g = function() {
        return f() && window.FormData
    }, v = function(e, t) {
        e.removeClass(t).addClass(t)
    }, X = {
        showRemove: !0,
        showUpload: !0,
        showZoom: !0,
        showDrag: !0,
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
        removeClass: "btn btn-xs btn-default",
        removeTitle: "Remove file",
        uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        uploadClass: "btn btn-xs btn-default",
        uploadTitle: "Upload file",
        zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',
        zoomClass: "btn btn-xs btn-default",
        zoomTitle: "View Details",
        dragIcon: '<i class="glyphicon glyphicon-menu-hamburger"></i>',
        dragClass: "text-info",
        dragTitle: "Move / Rearrange",
        dragSettings: {},
        indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
        indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
        indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
        indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
        indicatorNewTitle: "Not uploaded yet",
        indicatorSuccessTitle: "Uploaded",
        indicatorErrorTitle: "Upload Error",
        indicatorLoadingTitle: "Uploading ..."
    }, h = '{preview}\n<div class="kv-upload-progress hide"></div>\n<div class="input-group {class}">\n   {caption}\n   <div class="input-group-btn">\n       {remove}\n       {cancel}\n       {upload}\n       {browse}\n   </div>\n</div>', w = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n', b = '<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>', C = '<div class="close fileinput-remove">&times;</div>\n', _ = '<i class="glyphicon glyphicon-file kv-caption-icon"></i>', x = '<div tabindex="500" class="form-control file-caption {class}">\n   <div class="file-caption-name"></div>\n</div>\n', y = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</button>', T = '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</a>', F = '<div tabindex="500" class="{css}" {status}>{icon} {label}</div>', k = '<div id="' + i + '" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="' + i + 'Label"></div>', E = '<div class="modal-dialog modal-lg" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <div class="kv-zoom-actions pull-right">{toggleheader}{fullscreen}{borderless}{close}</div>\n      <h3 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h3>\n    </div>\n    <div class="modal-body">\n      <div class="floating-buttons"></div>\n      <div class="kv-zoom-body file-zoom-content"></div>\n{prev} {next}\n    </div>\n  </div>\n</div>\n', $ = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {percent}%\n     </div>\n</div>', S = " <br><samp>({sizeText})</samp>", I = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">{caption}{size}</div>\n    {progress} {actions}\n</div>', P = '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {upload} {delete} {zoom} {other}    </div>\n    {drag}\n    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n    <div class="clearfix"></div>\n</div>', D = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n', z = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>', A = '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>', U = '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>', j = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}"', L = j + '><div class="kv-file-content">\n', Z = j + ' title="{caption}" ' + a + '><div class="kv-file-content">\n', B = "</div>{footer}\n</div>\n", O = "{content}\n", R = '<div class="kv-preview-data file-preview-html" title="{caption}" ' + a + ">{data}</div>\n", M = '<img src="{data}" class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" ' + a + ">\n", N = '<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly ' + a + ">{data}</textarea>\n", H = '<video class="kv-preview-data" width="{width}" height="{height}" controls>\n<source src="{data}" type="{type}">\n' + r + "\n</video>\n", q = '<audio class="kv-preview-data" controls>\n<source src="{data}" type="{type}">\n' + r + "\n</audio>\n", W = '<object class="kv-preview-data file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' + n + " " + r + "\n</object>\n", V = '<object class="kv-preview-data file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n<param name="movie" value="{caption}" />\n' + n + " " + r + "\n</object>\n", K = '<embed class="kv-preview-data" src="{data}" width="{width}" height="{height}" type="application/pdf">\n', G = '<div class="kv-preview-data file-preview-other-frame">\n' + r + "\n</div>\n", Y = {
        main1: h,
        main2: w,
        preview: b,
        close: C,
        fileIcon: _,
        caption: x,
        modalMain: k,
        modal: E,
        progress: $,
        size: S,
        footer: I,
        actions: P,
        actionDelete: D,
        actionUpload: z,
        actionZoom: A,
        actionDrag: U,
        btnDefault: y,
        btnLink: T,
        btnBrowse: F
    }, J = {
        generic: L + O + B,
        html: L + R + B,
        image: L + M + B,
        text: L + N + B,
        video: Z + H + B,
        audio: Z + q + B,
        flash: Z + W + B,
        object: Z + V + B,
        pdf: Z + K + B,
        other: Z + G + B
    }, ee = ["image", "html", "text", "video", "audio", "flash", "pdf", "object"], ie = {
        image: {
            width: "auto",
            height: "160px"
        },
        html: {
            width: "213px",
            height: "160px"
        },
        text: {
            width: "213px",
            height: "160px"
        },
        video: {
            width: "213px",
            height: "160px"
        },
        audio: {
            width: "213px",
            height: "80px"
        },
        flash: {
            width: "213px",
            height: "160px"
        },
        object: {
            width: "160px",
            height: "160px"
        },
        pdf: {
            width: "160px",
            height: "160px"
        },
        other: {
            width: "160px",
            height: "160px"
        }
    }, Q = {
        image: {
            width: "100%",
            height: "100%"
        },
        html: {
            width: "100%",
            height: "100%",
            "min-height": "480px"
        },
        text: {
            width: "100%",
            height: "100%",
            "min-height": "480px"
        },
        video: {
            width: "auto",
            height: "100%",
            "max-width": "100%"
        },
        audio: {
            width: "100%",
            height: "30px"
        },
        flash: {
            width: "auto",
            height: "480px"
        },
        object: {
            width: "auto",
            height: "100%",
            "min-height": "480px"
        },
        pdf: {
            width: "100%",
            height: "100%",
            "min-height": "480px"
        },
        other: {
            width: "auto",
            height: "100%",
            "min-height": "480px"
        }
    }, ae = {
        image: function(e, t) {
            return o(e, "image.*") || o(t, /\.(gif|png|jpe?g)$/i)
        },
        html: function(e, t) {
            return o(e, "text/html") || o(t, /\.(htm|html)$/i)
        },
        text: function(e, t) {
            return o(e, "text.*") || o(t, /\.(xml|javascript)$/i) || o(t, /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i)
        },
        video: function(e, t) {
            return o(e, "video.*") && (o(e, /(ogg|mp4|mp?g|webm|3gp)$/i) || o(t, /\.(og?|mp4|webm|mp?g|3gp)$/i))
        },
        audio: function(e, t) {
            return o(e, "audio.*") && (o(t, /(ogg|mp3|mp?g|wav)$/i) || o(t, /\.(og?|mp3|mp?g|wav)$/i))
        },
        flash: function(e, t) {
            return o(e, "application/x-shockwave-flash", !0) || o(t, /\.(swf)$/i)
        },
        pdf: function(e, t) {
            return o(e, "application/pdf", !0) || o(t, /\.(pdf)$/i)
        },
        object: function() {
            return !0
        },
        other: function() {
            return !0
        }
    }, ne = function(t, i) {
        return void 0 === t || null === t || 0 === t.length || i && "" === e.trim(t)
    }, re = function(e) {
        return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)
    }, le = function(e, t, i) {
        return i = i || "", "object" == typeof t && e in t ? t[e] : i
    }, te = function(t, i, a) {
        return ne(t) || ne(t[i]) ? a : e(t[i])
    }, oe = function() {
        return Math.round((new Date).getTime() + 100 * Math.random())
    }, se = function(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    }, de = function(t, i) {
        var a = t;
        return i ? (e.each(i, function(e, t) {
            "function" == typeof t && (t = t()), a = a.split(e).join(t)
        }), a) : a
    }, ce = function(e) {
        var t = e.is("img") ? e.attr("src") : e.find("source").attr("src");
        l.revokeObjectURL(t)
    }, pe = function(e) {
        var t = e.lastIndexOf("/");
        return -1 === t && (t = e.lastIndexOf("\\")), e.split(e.substring(t, t + 1)).pop()
    }, ue = function() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
    }, fe = function(e) {
        e && !ue() ? document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
    }, me = function(e, t, i) {
        if (i >= e.length)
            for (var a = i - e.length; a-- + 1;) e.push(void 0);
        return e.splice(i, 0, e.splice(t, 1)[0]), e
    }, ge = function(t, i) {
        var a = this;
        a.$element = e(t), a._validate() && (a.isPreviewable = f(), a.isIE9 = s(9), a.isIE10 = s(10), a.isPreviewable || a.isIE9 ? (a._init(i), a._listen()) : a.$element.removeClass("file-loading"))
    }, ge.prototype = {
        constructor: ge,
        _init: function(t) {
            var i, a = this,
                n = a.$element;
            e.each(t, function(e, t) {
                switch (e) {
                    case "minFileCount":
                    case "maxFileCount":
                    case "maxFileSize":
                        a[e] = u(t);
                        break;
                    default:
                        a[e] = t
                }
            }), ne(a.allowedPreviewTypes) && (a.allowedPreviewTypes = ee), a.fileInputCleared = !1, a.fileBatchCompleted = !0, a.isPreviewable || (a.showPreview = !1), a.uploadFileAttr = ne(n.attr("name")) ? "file_data" : n.attr("name"), a.reader = null, a.formdata = {}, a.clearStack(), a.uploadCount = 0, a.uploadStatus = {}, a.uploadLog = [], a.uploadAsyncCount = 0, a.loadedImages = [], a.totalImagesCount = 0, a.ajaxRequests = [], a.isError = !1, a.ajaxAborted = !1, a.cancelling = !1, i = a._getLayoutTemplate("progress"), a.progressTemplate = i.replace("{class}", a.progressClass), a.progressCompleteTemplate = i.replace("{class}", a.progressCompleteClass), a.progressErrorTemplate = i.replace("{class}", a.progressErrorClass), a.dropZoneEnabled = m() && a.dropZoneEnabled, a.isDisabled = a.$element.attr("disabled") || a.$element.attr("readonly"), a.isUploadable = g() && !ne(a.uploadUrl), a.isClickable = a.browseOnZoneClick && a.showPreview && (a.isUploadable && a.dropZoneEnabled || !ne(a.defaultPreviewContent)), a.slug = "function" == typeof t.slugCallback ? t.slugCallback : a._slugDefault, a.mainTemplate = a.showCaption ? a._getLayoutTemplate("main1") : a._getLayoutTemplate("main2"), a.captionTemplate = a._getLayoutTemplate("caption"), a.previewGenericTemplate = a._getPreviewTemplate("generic"), a.resizeImage && (a.maxImageWidth || a.maxImageHeight) && (a.imageCanvas = document.createElement("canvas"), a.imageCanvasContext = a.imageCanvas.getContext("2d")), ne(a.$element.attr("id")) && a.$element.attr("id", oe()), void 0 === a.$container ? a.$container = a._createContainer() : a._refreshContainer(), a.$dropZone = a.$container.find(".file-drop-zone"), a.$progress = a.$container.find(".kv-upload-progress"), a.$btnUpload = a.$container.find(".fileinput-upload"), a.$captionContainer = te(t, "elCaptionContainer", a.$container.find(".file-caption")), a.$caption = te(t, "elCaptionText", a.$container.find(".file-caption-name")), a.$previewContainer = te(t, "elPreviewContainer", a.$container.find(".file-preview")), a.$preview = te(t, "elPreviewImage", a.$container.find(".file-preview-thumbnails")), a.$previewStatus = te(t, "elPreviewStatus", a.$container.find(".file-preview-status")), a.$errorContainer = te(t, "elErrorContainer", a.$previewContainer.find(".kv-fileinput-error")), ne(a.msgErrorClass) || v(a.$errorContainer, a.msgErrorClass), a.$errorContainer.hide(), a.fileActionSettings = e.extend(!0, X, t.fileActionSettings), a.previewInitId = "preview-" + oe(), a.id = a.$element.attr("id"), p.init(a), a._initPreview(!0), a._initPreviewActions(), a.options = t, a._setFileDropZoneTitle(), a.$element.removeClass("file-loading"), a.$element.attr("disabled") && a.disable(), a._initZoom()
        },
        _validate: function() {
            var e, t = this;
            return "file" === t.$element.attr("type") ? !0 : (e = '<div class="help-block alert alert-warning"><h4>Invalid Input Type</h4>You must set an input <code>type = file</code> for <b>bootstrap-fileinput</b> plugin to initialize.</div>', t.$element.after(e), !1)
        },
        _errorsExist: function() {
            var t, i = this;
            return i.$errorContainer.find("li").length ? !0 : (t = e(document.createElement("div")).html(i.$errorContainer.html()), t.find("span.kv-error-close").remove(), t.find("ul").remove(), !!e.trim(t.text()).length)
        },
        _errorHandler: function(e, t) {
            var i = this,
                a = e.target.error;
            a.code === a.NOT_FOUND_ERR ? i._showError(i.msgFileNotFound.replace("{name}", t)) : a.code === a.SECURITY_ERR ? i._showError(i.msgFileSecured.replace("{name}", t)) : a.code === a.NOT_READABLE_ERR ? i._showError(i.msgFileNotReadable.replace("{name}", t)) : a.code === a.ABORT_ERR ? i._showError(i.msgFilePreviewAborted.replace("{name}", t)) : i._showError(i.msgFilePreviewError.replace("{name}", t))
        },
        _addError: function(e) {
            var t = this,
                i = t.$errorContainer;
            e && i.length && (i.html(t.errorCloseButton + e), c(i.find(".kv-error-close"), "click", function() {
                i.fadeOut("slow")
            }))
        },
        _resetErrors: function(e) {
            var t = this,
                i = t.$errorContainer;
            t.isError = !1, t.$container.removeClass("has-error"), i.html(""), e ? i.fadeOut("slow") : i.hide()
        },
        _showFolderError: function(e) {
            var t, i = this,
                a = i.$errorContainer;
            e && (t = i.msgFoldersNotAllowed.replace(/\{n}/g, e), i._addError(t), v(i.$container, "has-error"), a.fadeIn(800), i._raise("filefoldererror", [e, t]))
        },
        _showUploadError: function(e, t, i) {
            var a = this,
                n = a.$errorContainer,
                r = i || "fileuploaderror",
                l = t && t.id ? '<li data-file-id="' + t.id + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === n.find("ul").length ? a._addError("<ul>" + l + "</ul>") : n.find("ul").append(l), n.fadeIn(800), a._raise(r, [t, e]), a.$container.removeClass("file-input-new"), v(a.$container, "has-error"), !0
        },
        _showError: function(e, t, i) {
            var a = this,
                n = a.$errorContainer,
                r = i || "fileerror";
            return t = t || {}, t.reader = a.reader, a._addError(e), n.fadeIn(800), a._raise(r, [t, e]), a.isUploadable || a._clearFileInput(), a.$container.removeClass("file-input-new"), v(a.$container, "has-error"), a.$btnUpload.attr("disabled", !0), !0
        },
        _noFilesError: function(e) {
            var t = this,
                i = t.minFileCount > 1 ? t.filePlural : t.fileSingle,
                a = t.msgFilesTooLess.replace("{n}", t.minFileCount).replace("{files}", i),
                n = t.$errorContainer;
            t._addError(a), t.isError = !0, t._updateFileDetails(0), n.fadeIn(800), t._raise("fileerror", [e, a]), t._clearFileInput(), v(t.$container, "has-error")
        },
        _parseError: function(t, i, a) {
            var n = this,
                r = e.trim(i + ""),
                l = "." === r.slice(-1) ? "" : ".",
                o = void 0 !== t.responseJSON && void 0 !== t.responseJSON.error ? t.responseJSON.error : t.responseText;
            return n.cancelling && n.msgUploadAborted && (r = n.msgUploadAborted), n.showAjaxErrorDetails && o ? (o = e.trim(o.replace(/\n\s*\n/g, "\n")), o = o.length > 0 ? "<pre>" + o + "</pre>" : "", r += l + o) : r += l, n.cancelling = !1, a ? "<b>" + a + ": </b>" + r : r
        },
        _parseFileType: function(e) {
            var t, i, a, n, r = this;
            for (n = 0; n < ee.length; n += 1)
                if (a = ee[n], t = le(a, r.fileTypeSettings, ae[a]), i = t(e.type, e.name) ? a : "", !ne(i)) return i;
            return "other"
        },
        _parseFilePreviewIcon: function(t, i) {
            var a, n, r = this,
                l = r.previewFileIcon;
            return i && i.indexOf(".") > -1 && (n = i.split(".").pop(), r.previewFileIconSettings && r.previewFileIconSettings[n] && (l = r.previewFileIconSettings[n]), r.previewFileExtSettings && e.each(r.previewFileExtSettings, function(e, t) {
                return r.previewFileIconSettings[e] && t(n) ? void(l = r.previewFileIconSettings[e]) : void(a = !0)
            })), t.indexOf("{previewFileIcon}") > -1 ? t.replace(/\{previewFileIconClass}/g, r.previewFileIconClass).replace(/\{previewFileIcon}/g, l) : t
        },
        _raise: function(t, i) {
            var a = this,
                n = e.Event(t);
            if (void 0 !== i ? a.$element.trigger(n, i) : a.$element.trigger(n), n.isDefaultPrevented()) return !1;
            if (!n.result) return n.result;
            switch (t) {
                case "filebatchuploadcomplete":
                case "filebatchuploadsuccess":
                case "fileuploaded":
                case "fileclear":
                case "filecleared":
                case "filereset":
                case "fileerror":
                case "filefoldererror":
                case "fileuploaderror":
                case "filebatchuploaderror":
                case "filedeleteerror":
                case "filecustomerror":
                case "filesuccessremove":
                    break;
                default:
                    a.ajaxAborted = n.result
            }
            return !0
        },
        _listenFullScreen: function(e) {
            var t, i, a = this,
                n = a.$modal;
            n && n.length && (t = n && n.find(".btn-fullscreen"), i = n && n.find(".btn-borderless"), t.length && i.length && (t.removeClass("active").attr("aria-pressed", "false"), i.removeClass("active").attr("aria-pressed", "false"), e ? t.addClass("active").attr("aria-pressed", "true") : i.addClass("active").attr("aria-pressed", "true"), n.hasClass("file-zoom-fullscreen") ? a._maximizeZoomDialog() : e ? a._maximizeZoomDialog() : i.removeClass("active").attr("aria-pressed", "false")))
        },
        _listen: function() {
            var t = this,
                i = t.$element,
                a = i.closest("form"),
                n = t.$container;
            c(i, "change", e.proxy(t._change, t)), t.showBrowse && c(t.$btnFile, "click", e.proxy(t._browse, t)), c(a, "reset", e.proxy(t.reset, t)), c(n.find(".fileinput-remove:not([disabled])"), "click", e.proxy(t.clear, t)), c(n.find(".fileinput-cancel"), "click", e.proxy(t.cancel, t)), t._initDragDrop(), t.isUploadable || c(a, "submit", e.proxy(t._submitForm, t)), c(t.$container.find(".fileinput-upload"), "click", e.proxy(t._uploadClick, t)), c(e(window), "resize", function() {
                t._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight)
            }), c(e(document), "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
                t._listenFullScreen(ue())
            }), t._initClickable()
        },
        _initClickable: function() {
            var t, i = this;
            i.isClickable && (t = i.isUploadable ? i.$dropZone : i.$preview.find(".file-default-preview"), v(t, "clickable"), t.attr("tabindex", -1), c(t, "click", function(a) {
                var n = e(a.target);
                n.parents(".file-preview-thumbnails").length && !n.parents(".file-default-preview").length || (i.$element.trigger("click"), t.blur())
            }))
        },
        _initDragDrop: function() {
            var t = this,
                i = t.$dropZone;
            t.isUploadable && t.dropZoneEnabled && t.showPreview && (c(i, "dragenter dragover", e.proxy(t._zoneDragEnter, t)), c(i, "dragleave", e.proxy(t._zoneDragLeave, t)), c(i, "drop", e.proxy(t._zoneDrop, t)), c(e(document), "dragenter dragover drop", t._zoneDragDropInit))
        },
        _zoneDragDropInit: function(e) {
            e.stopPropagation(), e.preventDefault()
        },
        _zoneDragEnter: function(t) {
            var i = this,
                a = e.inArray("Files", t.originalEvent.dataTransfer.types) > -1;
            return i._zoneDragDropInit(t), i.isDisabled || !a ? (t.originalEvent.dataTransfer.effectAllowed = "none", void(t.originalEvent.dataTransfer.dropEffect = "none")) : void v(i.$dropZone, "file-highlighted")
        },
        _zoneDragLeave: function(e) {
            var t = this;
            t._zoneDragDropInit(e), t.isDisabled || t.$dropZone.removeClass("file-highlighted")
        },
        _zoneDrop: function(e) {
            var t = this;
            e.preventDefault(), t.isDisabled || ne(e.originalEvent.dataTransfer.files) || (t._change(e, "dragdrop"), t.$dropZone.removeClass("file-highlighted"))
        },
        _uploadClick: function(e) {
            var t, i = this,
                a = i.$container.find(".fileinput-upload"),
                n = !a.hasClass("disabled") && ne(a.attr("disabled"));
            if (!e || !e.isDefaultPrevented()) {
                if (!i.isUploadable) return void(n && "submit" !== a.attr("type") && (t = a.closest("form"), t.length && t.trigger("submit"), e.preventDefault()));
                e.preventDefault(), n && i.upload()
            }
        },
        _submitForm: function() {
            var e = this,
                t = e.$element,
                i = t.get(0).files;
            return i && e.minFileCount > 0 && e._getFileCount(i.length) < e.minFileCount ? (e._noFilesError({}), !1) : !e._abort({})
        },
        _clearPreview: function() {
            var e = this,
                t = e.showUploadedThumbs ? e.$preview.find(".file-preview-frame:not(.file-preview-success)") : e.$preview.find(".file-preview-frame");
            t.remove(), e.$preview.find(".file-preview-frame").length && e.showPreview || e._resetUpload(), e._validateDefaultPreview()
        },
        _initSortable: function() {
            var t, i, a = this,
                n = a.$preview;
            window.Sortable && (t = n.find(".file-initial-thumbs"), i = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-preview-id",
                draggable: ".file-preview-initial",
                onSort: function(t) {
                    var i = t.oldIndex,
                        n = t.newIndex;
                    a.initialPreview = me(a.initialPreview, i, n), a.initialPreviewConfig = me(a.initialPreviewConfig, i, n), p.init(a), a._raise("filesorted", {
                        previewId: e(t.item).attr("id"),
                        oldIndex: i,
                        newIndex: n,
                        stack: a.initialPreviewConfig
                    })
                }
            }, t.data("sortable") && t.sortable("destroy"), e.extend(!0, i, a.fileActionSettings.dragSettings), t.sortable(i))
        },
        _initPreview: function(e) {
            var t, i = this,
                a = i.initialCaption || "";
            return p.count(i.id) ? (t = p.out(i.id), a = e && i.initialCaption ? i.initialCaption : t.caption, i.$preview.html(t.content), i._setCaption(a), i._initSortable(), void(ne(t.content) || i.$container.removeClass("file-input-new"))) : (i._clearPreview(), void(e ? i._setCaption(a) : i._initCaption()))
        },
        _getZoomButton: function(e) {
            var t = this,
                i = t.previewZoomButtonIcons[e],
                a = t.previewZoomButtonClasses[e],
                n = ' title="' + (t.previewZoomButtonTitles[e] || "") + '" ',
                r = n + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (r += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + a + " btn-" + e + '"' + r + ">" + i + "</button>"
        },
        _getModalContent: function() {
            var e = this;
            return e._getLayoutTemplate("modal").replace(/\{heading}/g, e.msgZoomModalHeading).replace(/\{prev}/g, e._getZoomButton("prev")).replace(/\{next}/g, e._getZoomButton("next")).replace(/\{toggleheader}/g, e._getZoomButton("toggleheader")).replace(/\{fullscreen}/g, e._getZoomButton("fullscreen")).replace(/\{borderless}/g, e._getZoomButton("borderless")).replace(/\{close}/g, e._getZoomButton("close"))
        },
        _listenModalEvent: function(e) {
            var t = this,
                i = t.$modal,
                a = function(e) {
                    return {
                        sourceEvent: e,
                        previewId: i.data("previewId"),
                        modal: i
                    }
                };
            i.on(e + ".bs.modal", function(n) {
                var r = i.find(".btn-fullscreen"),
                    l = i.find(".btn-borderless");
                t._raise("filezoom" + e, a(n)), "shown" === e && (l.removeClass("active").attr("aria-pressed", "false"), r.removeClass("active").attr("aria-pressed", "false"), i.hasClass("file-zoom-fullscreen") && (t._maximizeZoomDialog(), ue() ? r.addClass("active").attr("aria-pressed", "true") : l.addClass("active").attr("aria-pressed", "true")))
            })
        },
        _initZoom: function() {
            var t, a = this,
                n = a._getLayoutTemplate("modalMain"),
                r = "#" + i;
            a.$modal = e(r), a.$modal && a.$modal.length || (t = e(document.createElement("div")).html(n).insertAfter(a.$container), a.$modal = e("#" + i).insertBefore(t), t.remove()), a.$modal.html(a._getModalContent()), a._listenModalEvent("show"), a._listenModalEvent("shown"), a._listenModalEvent("hide"), a._listenModalEvent("hidden"), a._listenModalEvent("loaded")
        },
        _initZoomButtons: function() {
            var t, i, a = this,
                n = a.$modal.data("previewId") || "",
                r = a.$preview.find(".file-preview-frame").toArray(),
                l = r.length,
                o = a.$modal.find(".btn-prev"),
                s = a.$modal.find(".btn-next");
            l && (t = e(r[0]), i = e(r[l - 1]), o.removeAttr("disabled"), s.removeAttr("disabled"), t.length && t.attr("id") === n && o.attr("disabled", !0), i.length && i.attr("id") === n && s.attr("disabled", !0))
        },
        _maximizeZoomDialog: function() {
            var t = this,
                i = t.$modal,
                a = i.find(".modal-header:visible"),
                n = i.find(".modal-footer:visible"),
                r = i.find(".modal-body"),
                l = e(window).height(),
                o = 0;
            i.addClass("file-zoom-fullscreen"), a && a.length && (l -= a.outerHeight(!0)), n && n.length && (l -= n.outerHeight(!0)), r && r.length && (o = r.outerHeight(!0) - r.height(), l -= o), i.find(".kv-zoom-body").height(l)
        },
        _resizeZoomDialog: function(e) {
            var t = this,
                i = t.$modal,
                a = i.find(".btn-fullscreen"),
                n = i.find(".btn-borderless");
            if (i.hasClass("file-zoom-fullscreen")) fe(!1), e ? a.hasClass("active") || (i.removeClass("file-zoom-fullscreen"), t._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr("aria-pressed", "false")) : a.hasClass("active") ? a.removeClass("active").attr("aria-pressed", "false") : (i.removeClass("file-zoom-fullscreen"), t.$modal.find(".kv-zoom-body").css("height", t.zoomModalHeight));
            else {
                if (!e) return void t._maximizeZoomDialog();
                fe(!0)
            }
            i.focus()
        },
        _setZoomContent: function(t, i) {
            var a, n, r, l, o, s, d, p, u = this,
                f = t.attr("id"),
                m = u.$modal,
                g = m.find(".btn-prev"),
                h = m.find(".btn-next"),
                w = m.find(".btn-fullscreen"),
                b = m.find(".btn-borderless"),
                _ = m.find(".btn-toggleheader");
            n = t.data("template") || "generic", a = t.find(".kv-file-content"), r = a.length ? a.html() : "", l = t.find(".file-footer-caption").text() || "", m.find(".kv-zoom-title").html(l), o = m.find(".kv-zoom-body"), i ? (p = o.clone().insertAfter(o), o.html(r).hide(), p.fadeOut("fast", function() {
                o.fadeIn("fast"), p.remove()
            })) : o.html(r), d = u.previewZoomSettings[n], d && (s = o.find(".kv-preview-data"), v(s, "file-zoom-detail"), e.each(d, function(e, t) {
                s.css(e, t), (s.attr("width") && "width" === e || s.attr("height") && "height" === e) && s.removeAttr(e)
            })), m.data("previewId", f), c(g, "click", function() {
                u._zoomSlideShow("prev", f)
            }), c(h, "click", function() {
                u._zoomSlideShow("next", f)
            }), c(w, "click", function() {
                u._resizeZoomDialog(!0)
            }), c(b, "click", function() {
                u._resizeZoomDialog(!1)
            }), c(_, "click", function() {
                var e, t = m.find(".modal-header"),
                    i = m.find(".modal-body .floating-buttons"),
                    a = t.find(".kv-zoom-actions"),
                    n = function(e) {
                        var i = u.$modal.find(".kv-zoom-body"),
                            a = u.zoomModalHeight;
                        m.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height", e ? a + e : a)
                    };
                t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function() {
                    a.find(".btn").appendTo(i), n(e)
                })) : (i.find(".btn").appendTo(a), t.slideDown("slow", function() {
                    n()
                })), m.focus()
            }), c(m, "keydown", function(e) {
                var t = e.which || e.keyCode;
                37 !== t || g.attr("disabled") || u._zoomSlideShow("prev", f), 39 !== t || h.attr("disabled") || u._zoomSlideShow("next", f)
            })
        },
        _zoomPreview: function(e) {
            var t, i = this;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            i.$modal.html(i._getModalContent()), t = e.closest(".file-preview-frame"), i._setZoomContent(t), i.$modal.modal("show"), i._initZoomButtons()
        },
        _zoomSlideShow: function(t, i) {
            var a, n, r, l = this,
                o = l.$modal.find(".kv-zoom-actions .btn-" + t),
                s = l.$preview.find(".file-preview-frame").toArray(),
                d = s.length;
            if (!o.attr("disabled")) {
                for (n = 0; d > n; n++)
                    if (e(s[n]).attr("id") === i) {
                        r = "prev" === t ? n - 1 : n + 1;
                        break
                    }
                0 > r || r >= d || !s[r] || (a = e(s[r]), a.length && l._setZoomContent(a, !0), l._initZoomButtons(), l._raise("filezoom" + t, {
                    previewId: i,
                    modal: l.$modal
                }))
            }
        },
        _initZoomButton: function() {
            var t = this;
            t.$preview.find(".kv-file-zoom").each(function() {
                var i = e(this);
                c(i, "click", function() {
                    t._zoomPreview(i)
                })
            })
        },
        _initPreviewActions: function() {
            var t = this,
                i = t.deleteExtraData || {},
                a = function() {
                    var e = t.isUploadable ? p.count(t.id) : t.$element.get(0).files.length;
                    0 !== t.$preview.find(".kv-file-remove").length || e || (t.reset(), t.initialCaption = "")
                };
            t._initZoomButton(), t.$preview.find(".kv-file-remove").each(function() {
                var n = e(this),
                    r = n.data("url") || t.deleteUrl,
                    l = n.data("key");
                if (!ne(r) && void 0 !== l) {
                    var o, s, d, u, f = n.closest(".file-preview-frame"),
                        m = p.data[t.id],
                        g = f.data("fileindex");
                    g = parseInt(g.replace("init_", "")), d = ne(m.config) && ne(m.config[g]) ? null : m.config[g], u = ne(d) || ne(d.extra) ? i : d.extra, "function" == typeof u && (u = u()), s = {
                        id: n.attr("id"),
                        key: l,
                        extra: u
                    }, o = e.extend(!0, {}, {
                        url: r,
                        type: "POST",
                        dataType: "json",
                        data: e.extend(!0, {}, {
                            key: l
                        }, u),
                        beforeSend: function(e) {
                            t.ajaxAborted = !1, t._raise("filepredelete", [l, e, u]), t.ajaxAborted ? e.abort() : (v(f, "file-uploading"), v(n, "disabled"))
                        },
                        success: function(e, i, r) {
                            var o, d;
                            return ne(e) || ne(e.error) ? (p.unset(t.id, g), o = p.count(t.id), d = o > 0 ? t._getMsgSelected(o) : "", t._raise("filedeleted", [l, r, u]), t._setCaption(d), f.removeClass("file-uploading").addClass("file-deleted"), void f.fadeOut("slow", function() {
                                t._clearObjects(f), f.remove(), a(), o || 0 !== t.getFileStack().length || (t._setCaption(""), t.reset())
                            })) : (s.jqXHR = r, s.response = e, t._showError(e.error, s, "filedeleteerror"),
                                f.removeClass("file-uploading"), n.removeClass("disabled"), void a())
                        },
                        error: function(e, i, n) {
                            var r = t._parseError(e, n);
                            s.jqXHR = e, s.response = {}, t._showError(r, s, "filedeleteerror"), f.removeClass("file-uploading"), a()
                        }
                    }, t.ajaxDeleteSettings), c(n, "click", function() {
                        return t._validateMinCount() ? void e.ajax(o) : !1
                    })
                }
            })
        },
        _clearObjects: function(t) {
            t.find("video audio").each(function() {
                this.pause(), e(this).remove()
            }), t.find("img object div").each(function() {
                e(this).remove()
            })
        },
        _clearFileInput: function() {
            var t, i, a, n = this,
                r = n.$element;
            ne(r.val()) || (n.isIE9 || n.isIE10 ? (t = r.closest("form"), i = e(document.createElement("form")), a = e(document.createElement("div")), r.before(a), t.length ? t.after(i) : a.after(i), i.append(r).trigger("reset"), a.before(r).remove(), i.remove()) : r.val(""), n.fileInputCleared = !0)
        },
        _resetUpload: function() {
            var e = this;
            e.uploadCache = {
                content: [],
                config: [],
                tags: [],
                append: !0
            }, e.uploadCount = 0, e.uploadStatus = {}, e.uploadLog = [], e.uploadAsyncCount = 0, e.loadedImages = [], e.totalImagesCount = 0, e.$btnUpload.removeAttr("disabled"), e._setProgress(0), v(e.$progress, "hide"), e._resetErrors(!1), e.ajaxAborted = !1, e.ajaxRequests = [], e._resetCanvas()
        },
        _resetCanvas: function() {
            var e = this;
            e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height)
        },
        _hasInitialPreview: function() {
            var e = this;
            return !e.overwriteInitial && p.count(e.id)
        },
        _resetPreview: function() {
            var e, t, i = this;
            p.count(i.id) ? (e = p.out(i.id), i.$preview.html(e.content), t = i.initialCaption ? i.initialCaption : e.caption, i._setCaption(t)) : (i._clearPreview(), i._initCaption()), i.showPreview && (i._initZoom(), i._initSortable())
        },
        _clearDefaultPreview: function() {
            var e = this;
            e.$preview.find(".file-default-preview").remove()
        },
        _validateDefaultPreview: function() {
            var e = this;
            e.showPreview && !ne(e.defaultPreviewContent) && (e.$preview.html('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass("file-input-new"), e._initClickable())
        },
        _resetPreviewThumbs: function(e) {
            var t, i = this;
            return e ? (i._clearPreview(), void i.clearStack()) : void(i._hasInitialPreview() ? (t = p.out(i.id), i.$preview.html(t.content), i._setCaption(t.caption), i._initPreviewActions()) : i._clearPreview())
        },
        _getLayoutTemplate: function(e) {
            var t = this,
                i = le(e, t.layoutTemplates, Y[e]);
            return ne(t.customLayoutTags) ? i : de(i, t.customLayoutTags)
        },
        _getPreviewTemplate: function(e) {
            var t = this,
                i = le(e, t.previewTemplates, J[e]);
            return ne(t.customPreviewTags) ? i : de(i, t.customPreviewTags)
        },
        _getOutData: function(e, t, i) {
            var a = this;
            return e = e || {}, t = t || {}, i = i || a.filestack.slice(0) || {}, {
                form: a.formdata,
                files: i,
                filenames: a.filenames,
                extra: a._getExtraData(),
                response: t,
                reader: a.reader,
                jqXHR: e
            }
        },
        _getMsgSelected: function(e) {
            var t = this,
                i = 1 === e ? t.fileSingle : t.filePlural;
            return t.msgSelected.replace("{n}", e).replace("{files}", i)
        },
        _getThumbs: function(e) {
            return e = e || "", this.$preview.find(".file-preview-frame:not(.file-preview-initial)" + e)
        },
        _getExtraData: function(e, t) {
            var i = this,
                a = i.uploadExtraData;
            return "function" == typeof i.uploadExtraData && (a = i.uploadExtraData(e, t)), a
        },
        _initXhr: function(e, t, i) {
            var a = this;
            return e.upload && e.upload.addEventListener("progress", function(e) {
                var n = 0,
                    r = e.loaded || e.position,
                    l = e.total;
                e.lengthComputable && (n = Math.ceil(r / l * 100)), t ? a._setAsyncUploadStatus(t, n, i) : a._setProgress(Math.ceil(n))
            }, !1), e
        },
        _ajaxSubmit: function(t, i, a, n, r, l) {
            var o, s = this;
            s._raise("filepreajax", [r, l]), s._uploadExtra(r, l), o = e.extend(!0, {}, {
                xhr: function() {
                    var t = e.ajaxSettings.xhr();
                    return s._initXhr(t, r, s.getFileStack().length)
                },
                url: s.uploadUrl,
                type: "POST",
                dataType: "json",
                data: s.formdata,
                cache: !1,
                processData: !1,
                contentType: !1,
                beforeSend: t,
                success: i,
                complete: a,
                error: n
            }, s.ajaxSettings), s.ajaxRequests.push(e.ajax(o))
        },
        _initUploadSuccess: function(t, i, a) {
            var n, r, l, o, s, d, c, u, f = this;
            f.showPreview && "object" == typeof t && !e.isEmptyObject(t) && void 0 !== t.initialPreview && t.initialPreview.length > 0 && (f.hasInitData = !0, s = t.initialPreview || [], d = t.initialPreviewConfig || [], c = t.initialPreviewThumbTags || [], n = !(void 0 !== t.append && !t.append), s.length > 0 && !re(s) && (s = s.split(f.initialPreviewDelimiter)), f.overwriteInitial = !1, f.initialPreview.concat(s), f.initialPreviewThumbTags.concat(c), f.initialPreviewConfig.concat(d), void 0 !== i ? a ? (u = i.attr("data-fileindex"), f.uploadCache.content[u] = s[0], f.uploadCache.config[u] = d[0], f.uploadCache.tags[u] = c[0], f.uploadCache.append = n) : (l = p.add(f.id, s, d[0], c[0], n), r = p.get(f.id, l, !1), o = e(r).hide(), i.after(o).fadeOut("slow", function() {
                o.fadeIn("slow").css("display:inline-block"), f._initPreviewActions(), f._clearFileInput(), i.remove()
            })) : (p.set(f.id, s, d, c, n), f._initPreview(), f._initPreviewActions()))
        },
        _initSuccessThumbs: function() {
            var t = this;
            t.showPreview && t._getThumbs(".file-preview-success").each(function() {
                var i = e(this),
                    a = i.find(".kv-file-remove");
                a.removeAttr("disabled"), c(a, "click", function() {
                    var e = t._raise("filesuccessremove", [i.attr("id"), i.data("fileindex")]);
                    ce(i), e !== !1 && i.fadeOut("slow", function() {
                        i.remove(), t.$preview.find(".file-preview-frame").length || t.reset()
                    })
                })
            })
        },
        _checkAsyncComplete: function() {
            var t, i, a = this;
            for (i = 0; i < a.filestack.length; i++)
                if (a.filestack[i] && (t = a.previewInitId + "-" + i, -1 === e.inArray(t, a.uploadLog))) return !1;
            return a.uploadAsyncCount === a.uploadLog.length
        },
        _uploadExtra: function(t, i) {
            var a = this,
                n = a._getExtraData(t, i);
            0 !== n.length && e.each(n, function(e, t) {
                a.formdata.append(e, t)
            })
        },
        _uploadSingle: function(t, i, a) {
            var n, r, l, o, s, d, c, u, f, m, g = this,
                h = g.getFileStack().length,
                w = new FormData,
                b = g.previewInitId + "-" + t,
                _ = g.filestack.length > 0 || !e.isEmptyObject(g.uploadExtraData),
                C = {
                    id: b,
                    index: t
                };
            g.formdata = w, g.showPreview && (r = e("#" + b + ":not(.file-preview-initial)"), o = r.find(".kv-file-upload"), s = r.find(".kv-file-remove"), e("#" + b).find(".file-thumb-progress").removeClass("hide")), 0 === h || !_ || o && o.hasClass("disabled") || g._abort(C) || (m = function(e, t) {
                g.updateStack(e, void 0), g.uploadLog.push(t), g._checkAsyncComplete() && (g.fileBatchCompleted = !0)
            }, l = function() {
                var e = g.uploadCache;
                g.fileBatchCompleted && setTimeout(function() {
                    g.showPreview && (p.set(g.id, e.content, e.config, e.tags, e.append), g.hasInitData && (g._initPreview(), g._initPreviewActions())), g.unlock(), g._clearFileInput(), g._raise("filebatchuploadcomplete", [g.filestack, g._getExtraData()]), g.uploadCount = 0, g.uploadStatus = {}, g.uploadLog = [], g._setProgress(100)
                }, 100)
            }, d = function(i) {
                n = g._getOutData(i), g.fileBatchCompleted = !1, g.showPreview && (r.hasClass("file-preview-success") || (g._setThumbStatus(r, "Loading"), v(r, "file-uploading")), o.attr("disabled", !0), s.attr("disabled", !0)), a || g.lock(), g._raise("filepreupload", [n, b, t]), e.extend(!0, C, n), g._abort(C) && (i.abort(), g._setProgressCancelled())
            }, c = function(i, l, s) {
                n = g._getOutData(s, i), e.extend(!0, C, n), setTimeout(function() {
                    ne(i) || ne(i.error) ? (g.showPreview && (g._setThumbStatus(r, "Success"), o.hide(), g._initUploadSuccess(i, r, a)), g._raise("fileuploaded", [n, b, t]), a ? m(t, b) : g.updateStack(t, void 0)) : (g._showUploadError(i.error, C), g._setPreviewError(r, t), a && m(t, b))
                }, 100)
            }, u = function() {
                setTimeout(function() {
                    g.showPreview && (o.removeAttr("disabled"), s.removeAttr("disabled"), r.removeClass("file-uploading")), a ? l() : (g.unlock(!1), g._clearFileInput()), g._initSuccessThumbs()
                }, 100)
            }, f = function(n, l, o) {
                var s = g._parseError(n, o, a ? i[t].name : null);
                setTimeout(function() {
                    a && m(t, b), g.uploadStatus[b] = 100, g._setPreviewError(r, t), e.extend(!0, C, g._getOutData(n)), g._showUploadError(s, C)
                }, 100)
            }, w.append(g.uploadFileAttr, i[t], g.filenames[t]), w.append("file_id", t), g._ajaxSubmit(d, c, u, f, b, t))
        },
        _uploadBatch: function() {
            var t, i, a, n, r, l = this,
                o = l.filestack,
                s = o.length,
                d = {},
                c = l.filestack.length > 0 || !e.isEmptyObject(l.uploadExtraData);
            l.formdata = new FormData, 0 !== s && c && !l._abort(d) && (r = function() {
                e.each(o, function(e) {
                    l.updateStack(e, void 0)
                }), l._clearFileInput()
            }, t = function(t) {
                l.lock();
                var i = l._getOutData(t);
                l.showPreview && l._getThumbs().each(function() {
                    var t = e(this),
                        i = t.find(".kv-file-upload"),
                        a = t.find(".kv-file-remove");
                    t.hasClass("file-preview-success") || (l._setThumbStatus(t, "Loading"), v(t, "file-uploading")), i.attr("disabled", !0), a.attr("disabled", !0)
                }), l._raise("filebatchpreupload", [i]), l._abort(i) && (t.abort(), l._setProgressCancelled())
            }, i = function(t, i, a) {
                var n = l._getOutData(a, t),
                    o = l._getThumbs(),
                    s = 0,
                    d = ne(t) || ne(t.errorkeys) ? [] : t.errorkeys;
                ne(t) || ne(t.error) ? (l._raise("filebatchuploadsuccess", [n]), r(), l.showPreview ? (o.each(function() {
                    var t = e(this),
                        i = t.find(".kv-file-upload");
                    t.find(".kv-file-upload").hide(), l._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), i.removeAttr("disabled")
                }), l._initUploadSuccess(t)) : l.reset()) : (l.showPreview && (o.each(function() {
                    var t = e(this),
                        i = t.find(".kv-file-remove"),
                        a = t.find(".kv-file-upload");
                    return t.removeClass("file-uploading"), a.removeAttr("disabled"), i.removeAttr("disabled"), 0 === d.length ? void l._setPreviewError(t) : (-1 !== e.inArray(s, d) ? l._setPreviewError(t) : (t.find(".kv-file-upload").hide(), l._setThumbStatus(t, "Success"), l.updateStack(s, void 0)), void s++)
                }), l._initUploadSuccess(t)), l._showUploadError(t.error, n, "filebatchuploaderror"))
            }, n = function() {
                l._setProgress(100), l.unlock(), l._initSuccessThumbs(), l._clearFileInput(), l._raise("filebatchuploadcomplete", [l.filestack, l._getExtraData()])
            }, a = function(t, i, a) {
                var n = l._getOutData(t),
                    r = l._parseError(t, a);
                l._showUploadError(r, n, "filebatchuploaderror"), l.uploadFileCount = s - 1, l.showPreview && (l._getThumbs().each(function() {
                    var t = e(this),
                        i = t.attr("data-fileindex");
                    t.removeClass("file-uploading"), void 0 !== l.filestack[i] && l._setPreviewError(t)
                }), l._getThumbs().removeClass("file-uploading"), l._getThumbs(" .kv-file-upload").removeAttr("disabled"), l._getThumbs(" .kv-file-delete").removeAttr("disabled"))
            }, e.each(o, function(e, t) {
                ne(o[e]) || l.formdata.append(l.uploadFileAttr, t, l.filenames[e])
            }), l._ajaxSubmit(t, i, n, a))
        },
        _uploadExtraOnly: function() {
            var e, t, i, a, n = this,
                r = {};
            n.formdata = new FormData, n._abort(r) || (e = function(e) {
                n.lock();
                var t = n._getOutData(e);
                n._raise("filebatchpreupload", [t]), n._setProgress(50), r.data = t, r.xhr = e, n._abort(r) && (e.abort(), n._setProgressCancelled())
            }, t = function(e, t, i) {
                var a = n._getOutData(i, e);
                ne(e) || ne(e.error) ? (n._raise("filebatchuploadsuccess", [a]), n._clearFileInput(), n._initUploadSuccess(e)) : n._showUploadError(e.error, a, "filebatchuploaderror")
            }, i = function() {
                n._setProgress(100), n.unlock(), n._clearFileInput(), n._raise("filebatchuploadcomplete", [n.filestack, n._getExtraData()])
            }, a = function(e, t, i) {
                var a = n._getOutData(e),
                    l = n._parseError(e, i);
                r.data = a, n._showUploadError(l, a, "filebatchuploaderror")
            }, n._ajaxSubmit(e, t, i, a))
        },
        _initFileActions: function() {
            var t = this;
            t.showPreview && (t._initZoomButton(), t.$preview.find(".kv-file-remove").each(function() {
                var i, a, n, r, l = e(this),
                    o = l.closest(".file-preview-frame"),
                    s = o.attr("id"),
                    d = o.attr("data-fileindex");
                c(l, "click", function() {
                    return r = t._raise("filepreremove", [s, d]), r !== !1 && t._validateMinCount() ? (i = o.hasClass("file-preview-error"), ce(o), void o.fadeOut("slow", function() {
                        t.updateStack(d, void 0), t._clearObjects(o), o.remove(), s && i && t.$errorContainer.find('li[data-file-id="' + s + '"]').fadeOut("fast", function() {
                            e(this).remove(), t._errorsExist() || t._resetErrors()
                        }), t._clearFileInput();
                        var r = t.getFileStack(!0),
                            l = p.count(t.id),
                            c = r.length,
                            u = t.showPreview && t.$preview.find(".file-preview-frame").length;
                        0 !== c || 0 !== l || u ? (a = l + c, n = a > 1 ? t._getMsgSelected(a) : r[0] ? t._getFileNames()[0] : "", t._setCaption(n)) : t.reset(), t._raise("fileremoved", [s, d])
                    })) : !1
                })
            }), t.$preview.find(".kv-file-upload").each(function() {
                var i = e(this);
                c(i, "click", function() {
                    var e = i.closest(".file-preview-frame"),
                        a = e.attr("data-fileindex");
                    e.hasClass("file-preview-error") || t._uploadSingle(a, t.filestack, !1)
                })
            }))
        },
        _hideFileIcon: function() {
            this.overwriteInitial && this.$captionContainer.find(".kv-caption-icon").hide()
        },
        _showFileIcon: function() {
            this.$captionContainer.find(".kv-caption-icon").show()
        },
        _getSize: function(e) {
            var t = parseFloat(e);
            if (null === e || isNaN(t)) return "";
            var i, a, n, r = this,
                l = r.fileSizeGetter;
            return "function" == typeof l ? n = l(e) : (i = Math.floor(Math.log(t) / Math.log(1024)), a = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = 1 * (t / Math.pow(1024, i)).toFixed(2) + " " + a[i]), r._getLayoutTemplate("size").replace("{sizeText}", n)
        },
        _generatePreviewTemplate: function(e, t, i, a, n, r, l, o, s, d) {
            var c, p, u = this,
                f = u._getPreviewTemplate(e),
                m = o || "",
                g = le(e, u.previewSettings, ie[e]),
                v = u.slug(i),
                h = s || u._renderFileFooter(v, l, g.width, r);
            return d = d || n.slice(n.lastIndexOf("-") + 1), f = u._parseFilePreviewIcon(f, i), "text" === e || "html" === e ? (p = "text" === e ? se(t) : t, c = f.replace(/\{previewId}/g, n).replace(/\{caption}/g, v).replace(/\{width}/g, g.width).replace(/\{height}/g, g.height).replace(/\{frameClass}/g, m).replace(/\{cat}/g, a).replace(/\{footer}/g, h).replace(/\{fileindex}/g, d).replace(/\{data}/g, p).replace(/\{template}/g, e)) : c = f.replace(/\{previewId}/g, n).replace(/\{caption}/g, v).replace(/\{frameClass}/g, m).replace(/\{type}/g, a).replace(/\{fileindex}/g, d).replace(/\{width}/g, g.width).replace(/\{height}/g, g.height).replace(/\{footer}/g, h).replace(/\{data}/g, t).replace(/\{template}/g, e), c
        },
        _previewDefault: function(t, i, a) {
            var n = this,
                r = n.$preview,
                o = r.find(".file-live-thumbs");
            if (n.showPreview) {
                var s, d = t ? t.name : "",
                    c = t ? t.type : "",
                    p = a === !0 && !n.isUploadable,
                    u = l.createObjectURL(t);
                n._clearDefaultPreview(), s = n._generatePreviewTemplate("other", u, d, c, i, p, t.size), o.length || (o = e(document.createElement("div")).addClass("file-live-thumbs").appendTo(r)), o.append("\n" + s), a === !0 && n.isUploadable && n._setThumbStatus(e("#" + i), "Error")
            }
        },
        _previewFile: function(t, i, a, n, r) {
            if (this.showPreview) {
                var l, o = this,
                    s = o._parseFileType(i),
                    d = i ? i.name : "",
                    c = o.slug(d),
                    p = o.allowedPreviewTypes,
                    u = o.allowedPreviewMimeTypes,
                    f = o.$preview,
                    m = p && p.indexOf(s) >= 0,
                    g = f.find(".file-live-thumbs"),
                    v = "text" === s || "html" === s || "image" === s ? a.target.result : r,
                    h = u && -1 !== u.indexOf(i.type);
                g.length || (g = e(document.createElement("div")).addClass("file-live-thumbs").appendTo(f)), "html" === s && o.purifyHtml && window.DOMPurify && (v = window.DOMPurify.sanitize(v)), m || h ? (l = o._generatePreviewTemplate(s, v, d, i.type, n, !1, i.size), o._clearDefaultPreview(), g.append("\n" + l), o._validateImage(t, n, c, i.type)) : o._previewDefault(i, n), o._initSortable()
            }
        },
        _slugDefault: function(e) {
            return ne(e) ? "" : String(e).replace(/[\-\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_")
        },
        _readFiles: function(t) {
            this.reader = new FileReader;
            var i, a = this,
                n = a.$element,
                r = a.$preview,
                s = a.reader,
                d = a.$previewContainer,
                c = a.$previewStatus,
                p = a.msgLoading,
                u = a.msgProgress,
                f = a.previewInitId,
                m = t.length,
                g = a.fileTypeSettings,
                v = a.filestack.length,
                h = a.maxFilePreviewSize && parseFloat(a.maxFilePreviewSize),
                w = r.length && (!h || isNaN(h)),
                b = function(n, r, l, o) {
                    var s = e.extend(!0, {}, a._getOutData({}, {}, t), {
                            id: l,
                            index: o
                        }),
                        d = {
                            id: l,
                            index: o,
                            file: r,
                            files: t
                        };
                    return a._previewDefault(r, l, !0), a.isUploadable && a.addToStack(void 0), setTimeout(function() {
                        i(o + 1)
                    }, 100), a._initFileActions(), a.removeFromPreviewOnError && e("#" + l).remove(), a.isUploadable ? a._showUploadError(n, s) : a._showError(n, d)
                };
            a.loadedImages = [], a.totalImagesCount = 0, e.each(t, function(e, t) {
                var i = a.fileTypeSettings.image || ae.image;
                i && i(t.type) && a.totalImagesCount++
            }), i = function(e) {
                if (ne(n.attr("multiple")) && (m = 1), e >= m) return a.isUploadable && a.filestack.length > 0 ? a._raise("filebatchselected", [a.getFileStack()]) : a._raise("filebatchselected", [t]), d.removeClass("file-thumb-loading"), void c.html("");
                var _, C, x, y, T, F, k, E = v + e,
                    $ = f + "-" + E,
                    S = t[e],
                    I = a.slug(S.name),
                    P = (S.size || 0) / 1e3,
                    D = "",
                    z = l.createObjectURL(S),
                    A = 0,
                    U = a.allowedFileTypes,
                    j = ne(U) ? "" : U.join(", "),
                    L = a.allowedFileExtensions,
                    Z = ne(L) ? "" : L.join(", ");
                if (ne(L) || (D = new RegExp("\\.(" + L.join("|") + ")$", "i")), P = P.toFixed(2), a.maxFileSize > 0 && P > a.maxFileSize) return T = a.msgSizeTooLarge.replace("{name}", I).replace("{size}", P).replace("{maxSize}", a.maxFileSize), void(a.isError = b(T, S, $, e));
                if (!ne(U) && re(U)) {
                    for (y = 0; y < U.length; y += 1) F = U[y], x = g[F], k = void 0 !== x && x(S.type, I), A += ne(k) ? 0 : k.length;
                    if (0 === A) return T = a.msgInvalidFileType.replace("{name}", I).replace("{types}", j), void(a.isError = b(T, S, $, e))
                }
                return 0 !== A || ne(L) || !re(L) || ne(D) || (k = o(I, D), A += ne(k) ? 0 : k.length, 0 !== A) ? a.showPreview ? !w && P > h ? (d.addClass("file-thumb-loading"), a._previewDefault(S, $), a._initFileActions(), a._updateFileDetails(m), void i(e + 1)) : (r.length && void 0 !== FileReader ? (c.html(p.replace("{index}", e + 1).replace("{files}", m)), d.addClass("file-thumb-loading"), s.onerror = function(e) {
                    a._errorHandler(e, I)
                }, s.onload = function(t) {
                    a._previewFile(e, S, t, $, z), a._initFileActions()
                }, s.onloadend = function() {
                    T = u.replace("{index}", e + 1).replace("{files}", m).replace("{percent}", 50).replace("{name}", I), setTimeout(function() {
                        c.html(T), a._updateFileDetails(m), i(e + 1)
                    }, 100), a._raise("fileloaded", [S, $, e, s])
                }, s.onprogress = function(t) {
                    if (t.lengthComputable) {
                        var i = t.loaded / t.total * 100,
                            a = Math.ceil(i);
                        T = u.replace("{index}", e + 1).replace("{files}", m).replace("{percent}", a).replace("{name}", I), setTimeout(function() {
                            c.html(T)
                        }, 100)
                    }
                }, _ = le("text", g, ae.text), C = le("image", g, ae.image), _(S.type, I) ? s.readAsText(S, a.textEncoding) : C(S.type, I) ? s.readAsDataURL(S) : s.readAsArrayBuffer(S)) : (a._previewDefault(S, $), setTimeout(function() {
                    i(e + 1), a._updateFileDetails(m)
                }, 100), a._raise("fileloaded", [S, $, e, s])), void a.addToStack(S)) : (a.addToStack(S), setTimeout(function() {
                    i(e + 1)
                }, 100), void a._raise("fileloaded", [S, $, e, s])) : (T = a.msgInvalidFileExtension.replace("{name}", I).replace("{extensions}", Z), void(a.isError = b(T, S, $, e)))
            }, i(0), a._updateFileDetails(m, !1)
        },
        _updateFileDetails: function(e) {
            var t = this,
                i = t.$element,
                a = t.getFileStack(),
                n = s(9) && pe(i.val()) || i[0].files[0] && i[0].files[0].name || a.length && a[0].name || "",
                r = t.slug(n),
                l = t.isUploadable ? a.length : e,
                o = p.count(t.id) + l,
                d = l > 1 ? t._getMsgSelected(o) : r;
            t.isError ? (t.$previewContainer.removeClass("file-thumb-loading"), t.$previewStatus.html(""), t.$captionContainer.find(".kv-caption-icon").hide()) : t._showFileIcon(), t._setCaption(d, t.isError), t.$container.removeClass("file-input-new file-input-ajax-new"), 1 === arguments.length && t._raise("fileselect", [e, r]), p.count(t.id) && t._initPreviewActions()
        },
        _setThumbStatus: function(e, t) {
            var i = this;
            if (i.showPreview) {
                var a = "indicator" + t,
                    n = a + "Title",
                    r = "file-preview-" + t.toLowerCase(),
                    l = e.find(".file-upload-indicator"),
                    o = i.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Error" === t && e.find(".kv-file-upload").attr("disabled", !0), "Success" === t && (e.find(".file-drag-handle").remove(), l.css("margin-left", 0)), l.html(o[a]), l.attr("title", o[n]), e.addClass(r)
            }
        },
        _setProgressCancelled: function() {
            var e = this;
            e._setProgress(100, e.$progress, e.msgCancelled)
        },
        _setProgress: function(e, t, i) {
            var a = this,
                n = Math.min(e, 100),
                r = 100 > n ? a.progressTemplate : i ? a.progressErrorTemplate : a.progressCompleteTemplate;
            t = t || a.$progress, ne(r) || (t.html(r.replace(/\{percent}/g, n)), i && t.find('[role="progressbar"]').html(i))
        },
        _setFileDropZoneTitle: function() {
            var e, t = this,
                i = t.$container.find(".file-drop-zone"),
                a = t.dropZoneTitle;
            t.isClickable && (e = ne(t.$element.attr("multiple")) ? t.fileSingle : t.filePlural, a += t.dropZoneClickTitle.replace("{files}", e)), i.find("." + t.dropZoneTitleClass).remove(), t.isUploadable && t.showPreview && 0 !== i.length && !(t.getFileStack().length > 0) && t.dropZoneEnabled && (0 === i.find(".file-preview-frame").length && ne(t.defaultPreviewContent) && i.prepend('<div class="' + t.dropZoneTitleClass + '">' + a + "</div>"), t.$container.removeClass("file-input-new"), v(t.$container, "file-input-ajax-new"))
        },
        _setAsyncUploadStatus: function(t, i, a) {
            var n = this,
                r = 0;
            n._setProgress(i, e("#" + t).find(".file-thumb-progress")), n.uploadStatus[t] = i, e.each(n.uploadStatus, function(e, t) {
                r += t
            }), n._setProgress(Math.ceil(r / a))
        },
        _validateMinCount: function() {
            var e = this,
                t = e.isUploadable ? e.getFileStack().length : e.$element.get(0).files.length;
            return e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(t - 1) < e.minFileCount ? (e._noFilesError({}), !1) : !0
        },
        _getFileCount: function(e) {
            var t = this,
                i = 0;
            return t.validateInitialCount && !t.overwriteInitial && (i = p.count(t.id), e += i), e
        },
        _getFileName: function(e) {
            return e && e.name ? this.slug(e.name) : void 0
        },
        _getFileNames: function(e) {
            var t = this;
            return t.filenames.filter(function(t) {
                return e ? void 0 !== t : void 0 !== t && null !== t
            })
        },
        _setPreviewError: function(e, t, i) {
            var a = this;
            t && a.updateStack(t, i), a.removeFromPreviewOnError ? e.remove() : a._setThumbStatus(e, "Error")
        },
        _checkDimensions: function(e, t, i, a, n, r, l) {
            var o, s, d, c, p = this,
                u = "Small" === t ? "min" : "max",
                f = p[u + "Image" + r];
            !ne(f) && i.length && (d = i[0], s = "Width" === r ? d.naturalWidth || d.width : d.naturalHeight || d.height, c = "Small" === t ? s >= f : f >= s, c || (o = p["msgImage" + r + t].replace("{name}", n).replace("{size}", f), p._showUploadError(o, l), p._setPreviewError(a, e, null)))
        },
        _validateImage: function(e, t, i, a) {
            var n, r, o, s = this,
                d = s.$preview,
                p = d.find("#" + t),
                u = p.find("img");
            i = i || "Untitled", u.length && c(u, "load", function() {
                r = p.width(), o = d.width(), r > o && (u.css("width", "100%"), p.css("width", "97%")), n = {
                    ind: e,
                    id: t
                }, s._checkDimensions(e, "Small", u, p, i, "Width", n), s._checkDimensions(e, "Small", u, p, i, "Height", n), s.resizeImage || (s._checkDimensions(e, "Large", u, p, i, "Width", n), s._checkDimensions(e, "Large", u, p, i, "Height", n)), s._raise("fileimageloaded", [t]), s.loadedImages.push({
                    ind: e,
                    img: u,
                    thumb: p,
                    pid: t,
                    typ: a
                }), s._validateAllImages(), l.revokeObjectURL(u.attr("src"))
            })
        },
        _validateAllImages: function() {
            var e, t, i, a, n, r, l, o = this,
                s = {};
            if (o.loadedImages.length === o.totalImagesCount && (o._raise("fileimagesloaded"), o.resizeImage)) {
                for (l = o.isUploadable ? o._showUploadError : o._showError, e = 0; e < o.loadedImages.length; e++) t = o.loadedImages[e], i = t.img, a = t.thumb, n = t.pid, r = t.ind, s = {
                    id: n,
                    index: r
                }, o._getResizedImage(i[0], t.typ, n, r) || (l(o.msgImageResizeError, s, "fileimageresizeerror"), o._setPreviewError(a, r));
                o._raise("fileimagesresized")
            }
        },
        _getResizedImage: function(e, t, i, a) {
            var n, r, l = this,
                o = e.naturalWidth,
                s = e.naturalHeight,
                d = 1,
                c = l.maxImageWidth || o,
                p = l.maxImageHeight || s,
                u = o && s,
                f = l.imageCanvas,
                m = l.imageCanvasContext;
            if (!u) return !1;
            if (o === c && s === p) return !0;
            t = t || l.resizeDefaultImageType, n = o > c, r = s > p, d = "width" === l.resizePreference ? n ? c / o : r ? p / s : 1 : r ? p / s : n ? c / o : 1, l._resetCanvas(), o *= d, s *= d, f.width = o, f.height = s;
            try {
                return m.drawImage(e, 0, 0, o, s), f.toBlob(function(e) {
                    l._raise("fileimageresized", [i, a]), l.filestack[a] = e
                }, t, l.resizeQuality), !0
            } catch (g) {
                return !1
            }
        },
        _initBrowse: function(e) {
            var t = this;
            t.showBrowse ? (t.$btnFile = e.find(".btn-file"), t.$btnFile.append(t.$element)) : t.$element.hide()
        },
        _initCaption: function() {
            var e = this,
                t = e.initialCaption || "";
            return e.overwriteInitial || ne(t) ? (e.$caption.html(""), !1) : (e._setCaption(t), !0)
        },
        _setCaption: function(t, i) {
            var a, n, r, l, o = this,
                s = o.getFileStack();
            if (o.$caption.length) {
                if (i) a = e("<div>" + o.msgValidationError + "</div>").text(), r = s.length, l = r ? 1 === r && s[0] ? o._getFileNames()[0] : o._getMsgSelected(r) : o._getMsgSelected(o.msgNo), n = '<span class="' + o.msgValidationErrorClass + '">' + o.msgValidationErrorIcon + (ne(t) ? l : t) + "</span>";
                else {
                    if (ne(t)) return;
                    a = e("<div>" + t + "</div>").text(), n = o._getLayoutTemplate("fileIcon") + a
                }
                o.$caption.html(n), o.$caption.attr("title", a), o.$captionContainer.find(".file-caption-ellipsis").attr("title", a)
            }
        },
        _createContainer: function() {
            var t = this,
                i = e(document.createElement("div")).attr({
                    "class": "file-input file-input-new"
                }).html(t._renderMain());
            return t.$element.before(i), t._initBrowse(i), t.theme && i.addClass("theme-" + t.theme), i
        },
        _refreshContainer: function() {
            var e = this,
                t = e.$container;
            t.before(e.$element), t.html(e._renderMain()), e._initBrowse(t)
        },
        _renderMain: function() {
            var e = this,
                t = e.isUploadable && e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                i = e.showClose ? e._getLayoutTemplate("close") : "",
                a = e.showPreview ? e._getLayoutTemplate("preview").replace(/\{class}/g, e.previewClass).replace(/\{dropClass}/g, t) : "",
                n = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                r = e.captionTemplate.replace(/\{class}/g, n + " kv-fileinput-caption");
            return e.mainTemplate.replace(/\{class}/g, e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : "")).replace(/\{preview}/g, a).replace(/\{close}/g, i).replace(/\{caption}/g, r).replace(/\{upload}/g, e._renderButton("upload")).replace(/\{remove}/g, e._renderButton("remove")).replace(/\{cancel}/g, e._renderButton("cancel")).replace(/\{browse}/g, e._renderButton("browse"))
        },
        _renderButton: function(e) {
            var t = this,
                i = t._getLayoutTemplate("btnDefault"),
                a = t[e + "Class"],
                n = t[e + "Title"],
                r = t[e + "Icon"],
                l = t[e + "Label"],
                o = t.isDisabled ? " disabled" : "",
                s = "button";
            switch (e) {
                case "remove":
                    if (!t.showRemove) return "";
                    break;
                case "cancel":
                    if (!t.showCancel) return "";
                    a += " hide";
                    break;
                case "upload":
                    if (!t.showUpload) return "";
                    t.isUploadable && !t.isDisabled ? i = t._getLayoutTemplate("btnLink").replace("{href}", t.uploadUrl) : s = "submit";
                    break;
                case "browse":
                    if (!t.showBrowse) return "";
                    i = t._getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return a += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", ne(l) || (l = ' <span class="' + t.buttonLabelClass + '">' + l + "</span>"), i.replace("{type}", s).replace("{css}", a).replace("{title}", n).replace("{status}", o).replace("{icon}", r).replace("{label}", l)
        },
        _renderThumbProgress: function() {
            return '<div class="file-thumb-progress hide">' + this.progressTemplate.replace(/\{percent}/g, "0") + "</div>"
        },
        _renderFileFooter: function(e, t, i, a) {
            var n, r = this,
                l = r.fileActionSettings,
                o = l.showRemove,
                s = l.showDrag,
                d = l.showUpload,
                c = l.showZoom,
                p = r._getLayoutTemplate("footer"),
                u = a ? l.indicatorError : l.indicatorNew,
                f = a ? l.indicatorErrorTitle : l.indicatorNewTitle;
            return t = r._getSize(t), n = r.isUploadable ? p.replace(/\{actions}/g, r._renderFileActions(o, d, c, s, !1, !1, !1)).replace(/\{caption}/g, e).replace(/\{size}/g, t).replace(/\{width}/g, i).replace(/\{progress}/g, r._renderThumbProgress()).replace(/\{indicator}/g, u).replace(/\{indicatorTitle}/g, f) : p.replace(/\{actions}/g, r._renderFileActions(!1, !1, c, s, !1, !1, !1)).replace(/\{caption}/g, e).replace(/\{size}/g, t).replace(/\{width}/g, i).replace(/\{progress}/g, "").replace(/\{indicator}/g, u).replace(/\{indicatorTitle}/g, f), n = de(n, r.previewThumbTags)
        },
        _renderFileActions: function(e, t, i, a, n, r, l, o) {
            if (!(e || t || i || a)) return "";
            var s, d = this,
                c = r === !1 ? "" : ' data-url="' + r + '"',
                p = l === !1 ? "" : ' data-key="' + l + '"',
                u = "",
                f = "",
                m = "",
                g = "",
                v = d._getLayoutTemplate("actions"),
                h = d.fileActionSettings,
                w = d.otherActionButtons.replace(/\{dataKey}/g, p),
                b = n ? h.removeClass + " disabled" : h.removeClass;
            return t && (u = d._getLayoutTemplate("actionDelete").replace(/\{removeClass}/g, b).replace(/\{removeIcon}/g, h.removeIcon).replace(/\{removeTitle}/g, h.removeTitle).replace(/\{dataUrl}/g, c).replace(/\{dataKey}/g, p)), e && (f = d._getLayoutTemplate("actionUpload").replace(/\{uploadClass}/g, h.uploadClass).replace(/\{uploadIcon}/g, h.uploadIcon).replace(/\{uploadTitle}/g, h.uploadTitle)), i && (m = d._getLayoutTemplate("actionZoom").replace(/\{zoomClass}/g, h.zoomClass).replace(/\{zoomIcon}/g, h.zoomIcon).replace(/\{zoomTitle}/g, h.zoomTitle)), a && o && (s = "drag-handle-init " + h.dragClass, g = d._getLayoutTemplate("actionDrag").replace(/\{dragClass}/g, s).replace(/\{dragTitle}/g, h.dragTitle).replace(/\{dragIcon}/g, h.dragIcon)), v.replace(/\{delete}/g, u).replace(/\{upload}/g, f).replace(/\{zoom}/g, m).replace(/\{drag}/g, g).replace(/\{other}/g, w)
        },
        _browse: function(e) {
            var t = this;
            t._raise("filebrowse"), e && e.isDefaultPrevented() || (t.isError && !t.isUploadable && t.clear(), t.$captionContainer.focus())
        },
        _change: function(t) {
            var i = this,
                a = i.$element;
            if (!i.isUploadable && ne(a.val()) && i.fileInputCleared) return void(i.fileInputCleared = !1);
            i.fileInputCleared = !1;
            var n, r, l, o, s, d, c = arguments.length > 1,
                u = i.isUploadable,
                f = 0,
                m = c ? t.originalEvent.dataTransfer.files : a.get(0).files,
                g = i.filestack.length,
                v = ne(a.attr("multiple")),
                h = v && g > 0,
                w = 0,
                b = function(t, a, n, r) {
                    var l = e.extend(!0, {}, i._getOutData({}, {}, m), {
                            id: n,
                            index: r
                        }),
                        o = {
                            id: n,
                            index: r,
                            file: a,
                            files: m
                        };
                    return i.isUploadable ? i._showUploadError(t, l) : i._showError(t, o)
                };
            if (i.reader = null, i._resetUpload(), i._hideFileIcon(), i.isUploadable && i.$container.find(".file-drop-zone ." + i.dropZoneTitleClass).remove(), c)
                for (n = []; m[f];) o = m[f], o.type || o.size % 4096 !== 0 ? n.push(o) : w++, f++;
            else n = void 0 === t.target.files ? t.target && t.target.value ? [{
                name: t.target.value.replace(/^.+\\/, "")
            }] : [] : t.target.files;
            if (ne(n) || 0 === n.length) return u || i.clear(), i._showFolderError(w), void i._raise("fileselectnone");
            if (i._resetErrors(), d = n.length, l = i._getFileCount(i.isUploadable ? i.getFileStack().length + d : d), i.maxFileCount > 0 && l > i.maxFileCount) {
                if (!i.autoReplace || d > i.maxFileCount) return s = i.autoReplace && d > i.maxFileCount ? d : l, r = i.msgFilesTooMany.replace("{m}", i.maxFileCount).replace("{n}", s), i.isError = b(r, null, null, null), i.$captionContainer.find(".kv-caption-icon").hide(), i._setCaption("", !0), void i.$container.removeClass("file-input-new file-input-ajax-new");
                l > i.maxFileCount && i._resetPreviewThumbs(u)
            } else !u || h ? (i._resetPreviewThumbs(!1), h && i.clearStack()) : !u || 0 !== g || p.count(i.id) && !i.overwriteInitial || i._resetPreviewThumbs(!0);
            i.isPreviewable ? i._readFiles(n) : i._updateFileDetails(1), i._showFolderError(w)
        },
        _abort: function(t) {
            var i, a = this;
            return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (i = e.extend(!0, {}, a._getOutData(), t), i.abortData = a.ajaxAborted.data || {}, i.abortMessage = a.ajaxAborted.message, a.cancel(), a._setProgress(100, a.$progress, a.msgCancelled), a._showUploadError(a.ajaxAborted.message, i, "filecustomerror"), !0) : !1
        },
        _resetFileStack: function() {
            var t = this,
                i = 0,
                a = [],
                n = [];
            t._getThumbs().each(function() {
                var r = e(this),
                    l = r.attr("data-fileindex"),
                    o = t.filestack[l]; - 1 !== l && (void 0 !== o ? (a[i] = o, n[i] = t._getFileName(o), r.attr({
                    id: t.previewInitId + "-" + i,
                    "data-fileindex": i
                }), i++) : r.attr({
                    id: "uploaded-" + oe(),
                    "data-fileindex": "-1"
                }))
            }), t.filestack = a, t.filenames = n
        },
        clearStack: function() {
            var e = this;
            return e.filestack = [], e.filenames = [], e.$element
        },
        updateStack: function(e, t) {
            var i = this;
            return i.filestack[e] = t, i.filenames[e] = i._getFileName(t), i.$element
        },
        addToStack: function(e) {
            var t = this;
            return t.filestack.push(e), t.filenames.push(t._getFileName(e)), t.$element
        },
        getFileStack: function(e) {
            var t = this;
            return t.filestack.filter(function(t) {
                return e ? void 0 !== t : void 0 !== t && null !== t
            })
        },
        lock: function() {
            var e = this;
            return e._resetErrors(), e.disable(), e.showRemove && v(e.$container.find(".fileinput-remove"), "hide"), e.showCancel && e.$container.find(".fileinput-cancel").removeClass("hide"), e._raise("filelock", [e.filestack, e._getExtraData()]), e.$element
        },
        unlock: function(e) {
            var t = this;
            return void 0 === e && (e = !0), t.enable(), t.showCancel && v(t.$container.find(".fileinput-cancel"), "hide"), t.showRemove && t.$container.find(".fileinput-remove").removeClass("hide"), e && t._resetFileStack(), t._raise("fileunlock", [t.filestack, t._getExtraData()]), t.$element
        },
        cancel: function() {
            var t, i = this,
                a = i.ajaxRequests,
                n = a.length;
            if (n > 0)
                for (t = 0; n > t; t += 1) i.cancelling = !0, a[t].abort();
            return i._setProgressCancelled(), i._getThumbs().each(function() {
                var t = e(this),
                    a = t.attr("data-fileindex");
                t.removeClass("file-uploading"), void 0 !== i.filestack[a] && (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), i.unlock()
            }), i.$element
        },
        clear: function() {
            var t, i = this;
            return i.$btnUpload.removeAttr("disabled"), i._getThumbs().find("video,audio,img").each(function() {
                ce(e(this))
            }), i._resetUpload(), i.clearStack(), i._clearFileInput(), i._resetErrors(!0), i._raise("fileclear"), i._hasInitialPreview() ? (i._showFileIcon(), i._resetPreview(), i._initPreviewActions(), i.$container.removeClass("file-input-new")) : (i._getThumbs().each(function() {
                i._clearObjects(e(this))
            }), i.isUploadable && (p.data[i.id] = {}), i.$preview.html(""), t = !i.overwriteInitial && i.initialCaption.length > 0 ? i.initialCaption : "", i._setCaption(t), i.$caption.attr("title", ""), v(i.$container, "file-input-new"), i._validateDefaultPreview()), 0 === i.$container.find(".file-preview-frame").length && (i._initCaption() || i.$captionContainer.find(".kv-caption-icon").hide()), i._hideFileIcon(), i._raise("filecleared"), i.$captionContainer.focus(), i._setFileDropZoneTitle(), i.$element
        },
        reset: function() {
            var e = this;
            return e._resetPreview(), e.$container.find(".fileinput-filename").text(""), e._raise("filereset"), v(e.$container, "file-input-new"), (e.$preview.find(".file-preview-frame").length || e.isUploadable && e.dropZoneEnabled) && e.$container.removeClass("file-input-new"), e._setFileDropZoneTitle(), e.clearStack(), e.formdata = {}, e.$element
        },
        disable: function() {
            var e = this;
            return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), e.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e._initDragDrop(), e.$element;
        },
        enable: function() {
            var e = this;
            return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), e.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), e._initDragDrop(), e.$element
        },
        upload: function() {
            var t, i, a, n = this,
                r = n.getFileStack().length,
                l = {},
                o = !e.isEmptyObject(n._getExtraData());
            if (n.minFileCount > 0 && n._getFileCount(r) < n.minFileCount) return void n._noFilesError(l);
            if (n.isUploadable && !n.isDisabled && (0 !== r || o)) {
                if (n._resetUpload(), n.$progress.removeClass("hide"), n.uploadCount = 0, n.uploadStatus = {}, n.uploadLog = [], n.lock(), n._setProgress(2), 0 === r && o) return void n._uploadExtraOnly();
                if (a = n.filestack.length, n.hasInitData = !1, !n.uploadAsync) return n._uploadBatch(), n.$element;
                for (i = n._getOutData(), n._raise("filebatchpreupload", [i]), n.fileBatchCompleted = !1, n.uploadCache = {
                        content: [],
                        config: [],
                        tags: [],
                        append: !0
                    }, n.uploadAsyncCount = n.getFileStack().length, t = 0; a > t; t++) n.uploadCache.content[t] = null, n.uploadCache.config[t] = null, n.uploadCache.tags[t] = null;
                for (t = 0; a > t; t++) void 0 !== n.filestack[t] && n._uploadSingle(t, n.filestack, !0)
            }
        },
        destroy: function() {
            var e = this,
                i = e.$container;
            return i.find(".file-drop-zone").off(), e.$element.insertBefore(i).off(t).removeData(), i.off().remove(), e.$element
        },
        refresh: function(t) {
            var i = this,
                a = i.$element;
            return t = t ? e.extend(!0, {}, i.options, t) : i.options, i.destroy(), a.fileinput(t), a.val() && a.trigger("change.fileinput"), a
        }
    }, e.fn.fileinput = function(t) {
        if (f() || s(9)) {
            var i = Array.apply(null, arguments),
                a = [];
            switch (i.shift(), this.each(function() {
                var n, r = e(this),
                    l = r.data("fileinput"),
                    o = "object" == typeof t && t,
                    s = o.theme || r.data("theme"),
                    d = {},
                    c = {},
                    p = o.language || r.data("language") || "en";
                l || (s && (c = e.fn.fileinputThemes[s] || {}), "en" === p || ne(e.fn.fileinputLocales[p]) || (d = e.fn.fileinputLocales[p] || {}), n = e.extend(!0, {}, e.fn.fileinput.defaults, c, e.fn.fileinputLocales.en, d, o, r.data()), l = new ge(this, n), r.data("fileinput", l)), "string" == typeof t && a.push(l[t].apply(l, i))
            }), a.length) {
                case 0:
                    return this;
                case 1:
                    return a[0];
                default:
                    return a
            }
        }
    }, e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showCancel: !0,
        showClose: !0,
        showUploadedThumbs: !0,
        browseOnZoneClick: !1,
        autoReplace: !1,
        previewClass: "",
        captionClass: "",
        mainClass: "file-caption-main",
        mainTemplate: null,
        purifyHtml: !0,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        layoutTemplates: Y,
        previewTemplates: J,
        previewZoomSettings: Q,
        previewZoomButtonIcons: {
            prev: '<i class="glyphicon glyphicon-triangle-left"></i>',
            next: '<i class="glyphicon glyphicon-triangle-right"></i>',
            toggleheader: '<i class="glyphicon glyphicon-resize-vertical"></i>',
            fullscreen: '<i class="glyphicon glyphicon-fullscreen"></i>',
            borderless: '<i class="glyphicon glyphicon-resize-full"></i>',
            close: '<i class="glyphicon glyphicon-remove"></i>'
        },
        previewZoomButtonClasses: {
            prev: "btn btn-navigate",
            next: "btn btn-navigate",
            toggleheader: "btn btn-default btn-header-toggle",
            fullscreen: "btn btn-default",
            borderless: "btn btn-default",
            close: "btn btn-default"
        },
        allowedPreviewTypes: null,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: ie,
        fileTypeSettings: ae,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>&nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        removeClass: "btn btn-default",
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i>',
        cancelClass: "btn btn-default",
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
        uploadClass: "btn btn-default",
        uploadUrl: null,
        uploadAsync: !0,
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        progressErrorClass: "progress-bar progress-bar-danger",
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0
    }, e.fn.fileinputLocales.en = {
       fileSingle: 'archivo',
        filePlural: 'archivos',
        browseLabel: 'Seleccionar &hellip;',
        removeLabel: 'Eliminar',
        removeTitle: 'Limpiar archivos seleccionados',
        cancelLabel: 'Cancelar',
        cancelTitle: 'Abortar la carga en curso',
        uploadLabel: 'Cargar',
        uploadTitle: 'Cargar archivos seleccionados',
        msgNo: "No",
        msgCancelled: "Cancelled",
        msgZoomModalHeading: "Detailed Preview",
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.",
        msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.",
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgUploadAborted: "The file upload was aborted",
        msgValidationError: "Validation Error",
        msgLoading: "Loading file {index} of {files} &hellip;",
        msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.",
        msgSelected: "{n} {files} selected",
        msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.",
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: "Could not get the image dimensions to resize.",
        msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>",
        dropZoneTitle: "Drag & drop files here &hellip;",
        dropZoneClickTitle: "<br>(or click to select {files})",
        previewZoomButtonTitles: {
            prev: "View previous file",
            next: "View next file",
            toggleheader: "Toggle header",
            fullscreen: "Toggle full screen",
            borderless: "Toggle borderless mode",
            close: "Close detailed preview"
        }
    }, e.fn.fileinput.Constructor = ge, e(document).ready(function() {
        var t = e("input.file[type=file]");
        t.length && t.fileinput()
    })
});