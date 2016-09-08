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

    // ファイル選択
    document.getElementById('files').addEventListener('change', handleFileSelectByButton, false);

    // ファイルを選ぶ
    Mousetrap.bind('enter', function() {
        $('#files').click();
    });
});

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
            c = txt;
            loadFile();
  	  }

      // Read in the image file as a data URL.
      reader.readAsText(f, 'shift-js');
    }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

/**
* 読み込んだファイルをセットする
*/
function loadFile() {
    if (isSet) return;

    var wrp = $('.main');
    reader(c, wrp, SEPARATOR, SPEED, NEXT_KEY, PREV_KEY, BREAK_LINE, SHUFFLE, VANISH_MODE);
    wrp
        .css('font-size', '30px')
        .css('text-align', 'center')
        .css('margin-top', '275px');

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
