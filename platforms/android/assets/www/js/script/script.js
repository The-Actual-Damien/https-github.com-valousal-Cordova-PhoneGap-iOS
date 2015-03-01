            // Grab a handle to the video object
			var video = document.getElementsByTagName("video")[0];
			// Turn off the default browser controls
			video.controls = false;
			// Grab a handle to the play/paus button object
			var ppbutton = document.getElementById("playpause");

			// Add event listeners to change the value of the play/pause button when the video is played or paused
			video.addEventListener('play', function() {
				ppbutton.title = "pause";
				ppbutton.innerHTML = "pause";
			}, false);
			video.addEventListener('pause', function() {
				ppbutton.title = "play";
				ppbutton.innerHTML = "play";
			}, false);
			// Add an event listener to update the progress bar
			video.addEventListener('timeupdate', updateProgress, false);
			// Add an event listener to pause the video (which sorts out the play/pause button) when the video ends
			video.addEventListener('ended', function() { this.pause(); }, false);

			// Stops the video from playing and resets it's currentTime to 0
			function stopVideo() {
				video.pause();
				video.currentTime = 0;
			}

			// Toggles the play/pause button between playing and pausing
			function togglePlay() {
				if (video.paused || video.ended) {
					if (video.ended) video.currentTime = 0;
					video.play();
				}
				else {
					video.pause();
				}
			}

			// Changes the video's volume
			function changeVolume(direction) {
				var volume = Math.floor(video.volume * 10) / 10;
				video.muted = false;
				if (direction == "-") {
					if (volume <= 0.1) video.volume = 0;
					else video.volume -= 0.1;
				}
				else {
					if (volume >= 0.9) video.volume = 1;
					else video.volume += 0.1;
				}
			}

			// Toggles the video's mute value
			function toggleMute() {
				var mute = document.getElementById("mute");
				if (video.muted) {
					mute.innerHTML = "mute";
					video.muted = false;
				}
				else {
					mute.innerHTML = "unmute";
					video.muted = true;
				}
			}

			// Updates the progress bar
			function updateProgress() {
				var value = 0;
				if (video.currentTime > 0) {
					value = Math.floor((100 / video.duration) * video.currentTime);
				}
				document.getElementById("played").style.width = value + "%";
			}

			// Changes the playback speed of the video
			function changePlaybackSpeed(direction) {
				if (video.playbackRate != undefined) {
					if (direction == "-") video.playbackRate -= 1;
					else video.playbackRate += 1;
				}
				else {
					if (direction == "-") video.currentTime -= 1;
					else video.currentTime += 1;
				}
			}

			// Set the play position of the video based on the mouse click at x
			function setPlayPosition(x) {
				var progressBar = document.getElementById("progressBar");
				var value = (x - findPos(progressBar)).toFixed(2);
				var timeToSet = ((video.duration / progressBar.offsetWidth).toFixed(2) * value).toFixed(2);
				video.currentTime = timeToSet;
			}
			// Find the real position of obj
			function findPos(obj) {
				var curleft = 0;
				if (obj.offsetParent) {
					do { curleft += obj.offsetLeft; } while (obj = obj.offsetParent);
				}
				return curleft;
			}
			// Add an event listener to listen for the mouseup event on the progress bar
			var progressBar = document.getElementById("progressBar").addEventListener("mouseup", function(e) { setPlayPosition(e.pageX); }, false);