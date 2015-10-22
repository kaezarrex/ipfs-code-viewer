const $ = require('jquery');
const highlight = require('highlight.js');

const loadingMessage = '\n// Loading';
const instructionMessage = `
// View the source of a file by going to ${window.location.href.replace('#', '')}#<file_path>
// For example, view the source of this page by going to:
// ${window.location.href.replace('#', '')}#${window.location.pathname}`;
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
  $el.text(loadingMessage);
  render(hash);
} else {
  $el.text(instructionMessage);
}
