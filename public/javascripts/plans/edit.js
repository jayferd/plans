Plans.Edit = (function($) {
  // -*- private variables -*- //
  var planName
    , textarea
    , previewContents;
  ;

  function processPlan(plan, callback) {
    $.ajax('/'+planName+'/preview', {
      type: 'post',
      dataType: 'html',
      data: { contents: plan },
      success: callback
    });
  }

  function updatePreview(data) {
    previewContents.html(data);
  }

  function keyup() {
    processPlan(textarea.val(), updatePreview);
  }

  function init() {
    planName = window.location.pathname.split('/')[1];
    textarea = $('#edit textarea');
    previewContents = $('<div class="contents"></div>')

    $('<div id="preview"></div>')
      .prepend('<h1>Preview</h1>')
      .append(previewContents)
      .insertAfter(textarea)
    ;


    textarea.keyup(keyup);
    keyup();
  }

  $(document).ready(init);
})(jQuery);
