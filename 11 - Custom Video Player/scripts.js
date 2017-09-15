/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
/* Build out functions */

//play or pause video
function togglePlay(){
	video.paused ? video.play() : video.pause();
}

//listen to the video to check when is paused
function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

//skip functions
function skip(){
	//console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}


//update volume and playbackrate properties of the video element
function handleRangeUpdate(){
	video[this.name] = this.value;
}


function handleProgress(){
	//duraiton of video to percentage
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;

}



/* Hook up the event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//listen to the video to emit an event on timeUpdate
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', ()=>mousedown = true);
progress.addEventListener('mouseup', ()=>mousedown = false);