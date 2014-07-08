(function(){
  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    initializeSocketIo();
  }

  function initializeSocketIo(){
    socket = io.connect();
    socket.on('light', light);
  }

  function light(data){
    if(data > 400)
      $('body').css('background-color', 'green');
    else
      $('body').css('background-color', 'red');
  }
})();
