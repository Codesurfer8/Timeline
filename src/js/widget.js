export default class Widget {
    constructor(element) {
        this.element = element;
    }

    createTimeline() {
        const fieldTimeline = document.createElement('div');
        fieldTimeline.classList.add('field-timeline');

        const inputField = document.createElement('div');
        inputField.classList.add('input-timeline');

        const input = document.createElement('input');
        input.classList.add('input');
        input.value = '';

        const mediaBlock = document.createElement('div');
        mediaBlock.classList.add('media');

        const videoBtnRec = document.createElement('button');
        videoBtnRec.classList.add('video-rec');

        const audioBtnRec = document.createElement('button');
        audioBtnRec.classList.add('audio-rec');

        mediaBlock.insertAdjacentElement('beforeend', audioBtnRec)
        mediaBlock.insertAdjacentElement('beforeend', videoBtnRec)

        inputField.insertAdjacentElement('beforeend', input);
        inputField.insertAdjacentElement('beforeend', mediaBlock);

        this.element.insertAdjacentElement('beforeend', fieldTimeline);
        this.element.insertAdjacentElement('beforeend', inputField);
    }

    checkGeoLocAPI() {
        navigator.geolocation.getCurrentPosition((data) => {
            if (data.coords) {
                const { latitude, longitude } = data.coords;
                const geoPosition = `${latitude} ${longitude}`;
                this.addNote(geoPosition);
            }
        },
            (error) => {
                console.log(error.message)
                this.showPopup();
                const inputPopup = document.querySelector('.popup-input');
                const okBtn = document.querySelector('.ok-btn');
                const cancelBtn = document.querySelector('.cancel-btn');

                okBtn.addEventListener('click', () => {
                    this.addNote(inputPopup.value);
                    this.removePopup();
                });

                cancelBtn.addEventListener('click', () => {
                    this.removePopup();
                });
            }
        );
    }

    addNote(geoPosition) {
        const fieldTimeline = document.querySelector('.field-timeline');
        const input = document.querySelector('input');

        const note = document.createElement('div');
        note.classList.add('note');
        note.textContent = input.value;

        const geolocation = document.createElement('div');
        geolocation.classList.add('geo');
        geolocation.textContent = geoPosition;

        note.insertAdjacentElement('beforeend', geolocation);
        fieldTimeline.insertAdjacentElement('beforeend', note);
        input.value = '';
    }

    showPopup() {
        const popup = `<div class="popup">
        <div class="text">
            К сожалению, нам не уалось определить выше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.
        </div>
        <input type="text" class="popup-input" value="" placeholder="Пример: 55,755826 37,6173">
        <div class="container-btns">
            <button class="cancel-btn">Отмена</button>
            <button class="ok-btn">ОК</button>
        </div>
       </div>`;

        this.element.insertAdjacentHTML('afterend', popup);
    }

    removePopup() {
        const popup = document.querySelector('.popup');
        if (popup) {
            popup.remove();
        }
    }

    addVideo() {
        const recBtn = document.querySelector('.rec');
        const stopBtn = document.querySelector('.stop');

        const videoBlock = `<video class="video-player" controls>
       </video>`;

        const fieldTimeline = document.querySelector('.field-timeline');
        fieldTimeline.insertAdjacentHTML('beforeend', videoBlock);
        const videoPlayer = document.querySelector('.video-player');




        recBtn.addEventListener('click', async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
                
            })
    
            // videoPlayer.srcObject = stream;
            // videoPlayer.addEventListener('canplay', () => {
            //     videoPlayer.play();
            // });
    
            const recorder = new MediaRecorder(stream);
            const chunks = [];
    
            recorder.addEventListener('start', () => {
                console.log('start');
            });
    
            recorder.addEventListener('dataavailable', (event) => {
                chunks.push(event.data);
            });
    
            recorder.addEventListener('stop', () => {
                const blob = new Blob(chunks);
    
                videoPlayer.src = URL.createObjectURL(blob);
            });

            recorder.start();

            stopBtn.addEventListener('click', () => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
            });
            
        })
        

    }
}