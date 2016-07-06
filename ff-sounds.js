/**
* ff-sounds.js
*
* @fileoverview Sounds interactions
*
* @author David Félix-Faure
* @author http://www.felixfaure.fr/
*
*/
(function (global) {

  'use strict';

  //Extend function
  function extend(origOptions, userOptions){
      var extendOptions = {}, attrname;
      for (attrname in origOptions) { extendOptions[attrname] = origOptions[attrname]; }
      for (attrname in userOptions) { extendOptions[attrname] = userOptions[attrname]; }
      return extendOptions;
  }

  //Main function
  function ffsounds(options) {
    //Default Options
    var args = {
        loc: 'sounds/'
    };
    //Fusion with user options
    args = extend(args, options);

    // Check support of audio
    if ( !document.createElement('audio').canPlayType ) { return false; }

    // Create audio element and make it awesome
    var audioPlayer = document.createElement('audio'),
        mp3Source = document.createElement('source'),
        oggSource = document.createElement('source');

    audioPlayer.setAttribute('preload',true);
    mp3Source.setAttribute('type','audio/mpeg');
    oggSource.setAttribute('type','audio/ogg');
    audioPlayer.appendChild(mp3Source);
    audioPlayer.appendChild(oggSource);
    document.body.appendChild(audioPlayer);

    // Play audio
    function playAudio() {
      // get the audio source and appending it to <audio>
      var audioSrc = this.getAttribute('data-src'),
          soundMp3Link,
          soundOggLink;

      if ( !audioSrc ) { return; }

      soundMp3Link = args.loc + audioSrc + '.mp3';
      soundOggLink = args.loc + audioSrc + '.ogg';

      // Only reset `src` and reload if source is different
      if ( mp3Source.src !== soundMp3Link || oggSource.src !== soundOggLink ) {
        mp3Source.setAttribute('src', soundMp3Link);
        oggSource.setAttribute('src', soundOggLink);
        audioPlayer.load();
      }

      audioPlayer.currentTime = 0;
      audioPlayer.play();
    }

    // Stop audio
    function stopAudio() {
      audioPlayer.pause();
    }

    // Add `hover` related event listeners
    function trackHover(el) {
      el.addEventListener('mouseover', playAudio); // play audio on hover
      el.addEventListener('mouseout', stopAudio); // stop audio on mouse out
      el.addEventListener('touchmove', stopAudio); // stop audio on touch and move
      el.addEventListener('click', stopAudio); // stop audio on click
    }

    // Add `click` event listeners
    function trackClick(el) {
      el.addEventListener('click', playAudio);
    }

    // Go !
    function init() {
      var hoverLinks = document.getElementsByClassName('js-sound-hover'),
          clickLinks = document.getElementsByClassName('js-sound-click'),
          hoverLength = hoverLinks.length,
          clickLength = clickLinks.length,
          i;

      for (i = 0; i < hoverLength; i++) { trackHover(hoverLinks[i]); } // Hover
      for (i = 0; i < clickLength; i++) { trackClick(clickLinks[i]); } // Click
    }

    init();
  }

  // Exports in global environment
  global.ffsounds = ffsounds;
})(this);
