$(function() 
{
var request;
var $currentimg;
var cache = {};
var $frame = $('#photo-viewer');
var $image = $('.image');

function crossfade($img) 
{
  
  if ($currentimg) 
  {
    $currentimg.stop().fadeOut('slow');
  }

  $img.stop().fadeTo('slow', 1);
  $currentimg = $img;
}

$(document).on('click', '.image', function(e)
{
  var $img,
      src = this.href;
      request = src;
  e.preventDefault();
  $image.removeClass('active');
  $(this).addClass('active');
  
  if (cache.hasOwnProperty(src)) 
  {
    if (cache[src].isLoading === false) 
    {
      crossfade(cache[src].$img);
    }
  } 
  else 
  {
    $img = $('<img/>');
    cache[src] = 
    {
      $img: $img,
      isLoading: true
    };

    $img.on('load', function()
    {
      $img.hide();
      $frame.removeClass('is-loading').append($img);
      cache[src].isLoading = false;
      if (request === src) 
      {
        crossfade($img);
      }
    });

    $frame.addClass('is-loading');
    $img.attr({'src': src, 'alt': this.title || ''});
  }
});

$('.image').eq(0).click();

});
