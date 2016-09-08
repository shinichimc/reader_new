// http://www.html5rocks.com/ja/tutorials/file/dndfiles/
// http://www.shurey.com/js/labo/FileAPI.html

var isSet = false;

var c = '';
var SPEED = 300;
var SEPARATOR = '\n';
var NEXT_KEY = 'right';
var PREV_KEY = 'left';
var BREAK_LINE = true;
var SHUFFLE = true;
var VANISH_MODE = false;
$(document).ready(function() {

    // $('.df').innerHTML(
    //       '<p>Speed</p>'
    //     + '<p>Separator</p>'
    //     + '<p>Next Key</p>'
    //     + '<p>Prev Key</p>'
    //     + '<p>Break Line</p>'
    //     + '<p>Shuffle</p>'
    //     + '<p>Vanish Mode</p>'
    // );
    // ファイル選択
    document.getElementById('files').addEventListener('change', handleFileSelectByButton, false);

    // ファイルを選ぶ
    Mousetrap.bind('enter', function() {
        $('#files').click();
    });

    // ドラッグドロップ
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);


});

/**
* 読み込んだファイルをセットする
*/
function loadFile() {
    if (isSet) return;

    var wrp = $('.main');
    reader(c, wrp, SEPARATOR, SPEED, NEXT_KEY, PREV_KEY, BREAK_LINE, SHUFFLE, VANISH_MODE);
    wrp
        .css('font-size', '13px')
        .css('line-height', '1.5em')

    if (c.length > 0) {
        alert('file loaded.');
        isSet = true;
        $('.sample').hide();
        $('#files').remove();
        $('.instruction').hide();
    } else {
        alert('failed loading a file. try again')
    }
}

/**
* ファイル選択
*/
function handleFileSelectByButton(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');

      // Only process image files.
      if (!f.type.match('text.*')) {
        alert('invalid file.');
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function(evt){
  			var txt = evt.target.result; //ファイル内容を読み出し
  			txt = txt.replace(/</g, "&lt;"); //置き換え
  			txt = txt.replace(/>/g, "&gt;"); //置き換え
            txt = txt.replace(/[\[](.+?)[\]]/g,'<span class="mark">$1</span>');
            txt = txt.replace(/[\*「](.+?)[\*」]/g,'<span class="strong">$1</span>');
  			// txt = "<pre>" + txt + "</pre>";
  			// document.getElementById("main").innerHTML = txt;
            c = txt;
            loadFile();
  	  }

      // Read in the image file as a data URL.
      reader.readAsText(f, 'shift-js');
    }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }


/**
* ドラッグドロップ
*/
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
      // Only process image files.
      if (!f.type.match('text.*')) {
        alert('invalid file.');
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function(evt){
  			var txt = evt.target.result; //ファイル内容を読み出し
  			txt = txt.replace(/</g, "&lt;"); //置き換え
  			txt = txt.replace(/>/g, "&gt;"); //置き換え
            txt = txt.replace(/[\[](.+?)[\]]/g,'<span class="mark">$1</span>');
            txt = txt.replace(/[\*「](.+?)[\*」]/g,'<span class="strong">$1</span>');
  	// 		txt = "<pre>" + txt + "</pre>";
            // console.log(txt);
  	// 		document.getElementById("main").innerHTML = txt;
            c = txt;
            loadFile();
  	  }

      // Read in the image file as a data URL.
      reader.readAsText(f, 'utf-8');

    }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
