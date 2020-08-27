const util = require('hexo-util');
const request = require('request-promise');
const minifyXML = require("minify-xml").minify;
const fs = require("fs");
const cdn = 'https://cdn.jsdelivr.net/npm/opensheetmusicdisplay@0.8.3/build/opensheetmusicdisplay.min.js';

hexo.extend.tag.register('musicxml', function (args) {
    var musicxml = args[0];
    var loadPlayer = args[1];
    // console.log(loadPlayer);

    if(loadPlayer === "true") {
        console.log("Load With Player!");
        var css = util.htmlTag('link', {
            href: 'https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/css/osmd-c.css',
            rel: 'stylesheet'
        });

        var loding_box = util.htmlTag('div', {
            class: "boxLoading",
            id: "loading"
        },"<label style='position: relative;right: 25%;top: 150%;'>Loading...</label>",false);

        var pdfKit_js = util.htmlTag('script',{
            src: 'https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/libs/pdfkit.js'
        },"",false);

        var blobStream_js = util.htmlTag('script',{
            src: 'https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/libs/blobstream.js'
        },"",false);

        var svg_pdfKit_js = util.htmlTag('script',{
            src: 'https://cdn.jsdelivr.net/npm/svg-to-pdfkit@0.1.8/source.js'
        },"",false);

        var mxl2midi_js = util.htmlTag('script', {
            src: "https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/libs/gjs.js"
        },"",false);

        var osmd_app_js = util.htmlTag('script',{
            src: 'https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/libs/osmd-app.min.js'
        }, "",false);

        var jquery_js = util.htmlTag('script',{
            src: 'https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js'
        }, "",false);

        var _js_bundle =  jquery_js + pdfKit_js + mxl2midi_js + blobStream_js + svg_pdfKit_js;

        var _canvas = util.htmlTag('canvas', {id: "canvas", style: "display:none;"},"",false);

        if(musicxml.indexOf("http") != -1) {
            return result = getMusicXML(musicxml).then(text => {

                var script = util.htmlTag('script', {}, 'var mxl = \'' + text + '\';', false);

                var osmdCanvas = util.htmlTag('div', {
                    id: 'osmdCanvas'
                }, loding_box + _canvas, false);
            return css + _js_bundle +  "<script type='text/javascript' src='" + cdn + "'></script>" + osmdCanvas + script + osmd_app_js;
            });
        } else {
            var text = getLocalMusicXML(musicxml);
            var script = util.htmlTag('script', {}, 'var mxl = \'' + text + '\';', false);
            var osmdCanvas = util.htmlTag('div', {
                id: 'osmdCanvas'
            }, loding_box + _canvas, false);
            return css + _js_bundle +  "<script type='text/javascript' src='" + cdn + "'></script>" + osmdCanvas + script + osmd_app_js;
        }
    } else {
        console.log("Load Without Player!");

        var css = util.htmlTag('link', {
            href: 'https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/css/osmd-c.css',
            rel: 'stylesheet'
        });

        var _canvas = util.htmlTag('canvas', {id: "canvas", style: "display:none;"},"",false);

        if(musicxml.indexOf("http") != -1) {
            return result = getMusicXML(musicxml).then(text => {
                var loadScript = 'var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas");';
                loadScript += ('var mxl = \'' + text + '\';');
                loadScript += 'osmd.load(mxl);';
                loadScript += 'osmd.render();';
                var script = util.htmlTag('script', {}, loadScript, false);

                var osmdCanvas = util.htmlTag('div', {
                    id: 'osmdCanvas'
                }, _canvas, false);
            return css + "<script type='text/javascript' src='" + cdn + "'></script>" + osmdCanvas + script;
            });
        } else {
            var text = getLocalMusicXML(musicxml);
            var loadScript = 'var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas");';
            loadScript += ('var mxl = \'' + text + '\';');
            loadScript += 'osmd.load(mxl);';
            loadScript += 'osmd.render();';
            var script = util.htmlTag('script', {}, loadScript, false);

            var osmdCanvas = util.htmlTag('div', {
                id: 'osmdCanvas'
            }, _canvas, false);
            return css + "<script type='text/javascript' src='" + cdn + "'></script>" + osmdCanvas + script;
        }
    }

}, {
    async: true
});

async function getMusicXML(href) {
    return request(href).then(function (musicxml) {
        musicxml = minifyXML(musicxml);
        console.log("GET Internet MusicXML => SUCCESS!");
        //console.log(musicxml.replace(/[\r\n]/g,""));
        return musicxml.replace(/[\r\n]/g,"");
    });
}

function getLocalMusicXML(path) {
    if(fs.existsSync(path)) {
        var musicxml = fs.readFileSync(path,'utf8')
        musicxml = minifyXML(musicxml);
        console.log("GET Local MusicXML => SUCCESS!");
        //console.log(musicxml.replace(/[\r\n]/g,""));
        return musicxml.replace(/[\r\n]/g,"");
    } else {
        console.log("Load Failed.");
        let error = "No File in Path " + path + " Found.";
        throw error;
        return;
    }
}
