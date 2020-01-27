$( document ).ready(function() {
  // Get started!
  var $chartId = $("#chart-id")
  var $apiToken = $("#api-token")
  var $error = $("#error")
  var $resultWrapper = $("#result-wrapper")
  var $result = $("#result")
  var $copyToClipboard = $(".copy-to-clipboard")

  function update() {
    var chartId = $chartId.val()
    var apiToken = $apiToken.val()

    if (apiToken === "") return
    if (chartId === "") return

    var url = "https://api.datawrapper.de/v3/charts/" + chartId
    $.ajax({
       url: url,
       type: 'GET',
       contentType: 'application/json',
       headers: {
          'Authorization': 'Bearer ' + apiToken
       },
       success: function(res) {
         $error.hide()
         $resultWrapper.show()
         $result.attr("data-json", JSON.stringify(res))
         $result.jsonViewer(res)
       },
       error: function (err) {
         $error.text(err.responseJSON.message)
         $error.show()
         $resultWrapper.hide()
         $result.attr("data-json", "")
       }
    });
  }
  function copyToClipboard() {
    var content = $result.attr("data-json")
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(content).select();
    document.execCommand("copy");
    $temp.remove();
  }

  $apiToken.change(update)
  $chartId.change(update)
  $copyToClipboard.click(copyToClipboard)
});
