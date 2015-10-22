const $ = require('jquery');
const highlight = require('highlight.js');

const $el = $('#code');

const render = function(path) {
  $.ajax({
    url: path,
    success: data => {
      $el.text(data);
      highlight.initHighlighting();
    },
    error: (xhr, status, message) => {
      $el.text(`\n// Error: ${message}`);
    }
  });
}

const hash = window.location.hash.substring(1);
if (hash.length > 0) {
  $el.text('\n// Loading...');
  render(hash);
} else {
  window.location.hash = `#${window.location.pathname}`
  window.location.reload()
}
