# hexo-musicxml-sheetmusic

 ![NPM VERSION](https://img.shields.io/npm/v/hexo-musicxml-sheetmusic.svg) ![LANGUAGE](https://img.shields.io/badge/language-javascript-chocolate.svg) ![](https://img.shields.io/badge/license-MIT-deepskyblue.svg)

Embed a **sheet music** form a **local / online musicXML** file on your [Hexo](https://hexo.io/) article, used svg-render from [osmd](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay). According to different needs, you can choose whether to load the player.

读取musicXML文件，并在 hexo 文章中显示。使用 osmd 的渲染引擎。根据需求可以设置是否加载播放器。

Demo Musicxml: [A little white boat / 小白船](https://cdn.jsdelivr.net/npm/hexo-musicxml-sheetmusic@0.0.9/A_little_white_boat.musicxml)

More Musicxml here: [Musicxml Example-Set / 更多的 MusicXML 文件范例](https://www.musicxml.com/music-in-musicxml/example-set/)

## Demo without Player / 不带播放器的实例

![Without Player](https://raw.githubusercontent.com/netbeifeng/hexo-musicxml-sheetmusic/master/pic/demo_without_player.png)

## Demo with Player / 带播放器的实例

![With Player](https://raw.githubusercontent.com/netbeifeng/hexo-musicxml-sheetmusic/master/pic/demo_with_player.png)

## Installation / 安装
![Install](https://nodei.co/npm/hexo-musicxml-sheetmusic.png?downloads=true&downloadRank=true&stars=true)

```bash
npm install hexo-musicxml-sheetmusic
```

## Usage / 使用方法

Use tags in Markdown:

在 Markdown 文件中：

### Without Player / 无播放器
```
{% musicxml URL "false" %}
```

### With Player / 有播放器
```
{% musicxml URL "true" %}
```

#### Local File Example / 本地文件:

```
{% musicxml C:\Flute\moon.musicxml "false" %}
```

#### Internet File Example / 网络文件:

```
{% musicxml https://wpmedia.musicxml.com/wp-content/uploads/2017/12/Echigo-Jishi.musicxml "false" %}
```

## Attention / 注意

该插件正处在开发阶段，各项功能均不稳定。 

The plug-in is in the development stage and all functions are unstable. You have been warned.

已知的 Bug 包括: / Known Bugs include:
- 多行乐谱时，点击音符跳转的位置错误 / When there are multiple lines of scores, the clicked notes jump to the wrong position
- 导出 MIDI 的 MIDI 乐器只有 0 号钢琴 / export MIDI only avaliable with Midi Instrument 0 piano 
- 导出 PDF 不能正常分页，故不能正常打印 / Exported PDF cannot be paged normally, so it cannot be printed normally

## Dependencies / 依赖
依赖如下: / Dependencies as follows:
- [OpenSheetMusicDisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay)
- [OSMD Audio Player](https://github.com/jimutt/osmd-audio-player)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [minify-xml](https://www.npmjs.com/package/minify-xml)
- [pdfKit](https://github.com/foliojs/pdfkit)
- [Blob-Stream](https://github.com/devongovett/blob-stream)
- [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit)
- [GopherJS](https://github.com/gopherjs/gopherjs)
- [jQuery](https://github.com/jquery/jquery)

## License

MIT