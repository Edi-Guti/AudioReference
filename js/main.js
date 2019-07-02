(() => {
    console.log('fired!');

    function logKeyCode(event) {
        // debugger;
        // event is an object that is generated by any event
        // it contains all of the infor about the event, what
        // triggered it, where it occured on the page et
        console.log(event.keyCode);

        const currentKey = document.querySelector(`div[data-key="${event.keyCode}"]`);

        // if there's no matching div with that key, then exit
        if (!currentKey) return;

        // apply the playing class to the current div (the matching keyCode)
        currentKey.classList.add('playing');

        // play the audio that goes with the div
        let currentAudioClip = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        currentAudioClip.currentTime = 0;
        currentAudioClip.play();
    }

    function removePlayingClass(event) {
      // listen for the transition to end, and then remove the playing class the current key

      // I need a transition that only fires once so that I only run this function once => transform? might work?
      if (event.propertyName !== "transform") return;
        // event.target is the target of the current event -> in this case the div, because that's the element that's transitioning
        console.log('transform transition is done');
        event.target.classList.remove('playing');
    }

    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removePlayingClass));

    // try to get the keyboard keypress events
    window.addEventListener("keydown", logKeyCode);
})();
