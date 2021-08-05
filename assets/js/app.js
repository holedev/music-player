const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'BY1410'

const playlist = $('.playlist')
const playBtn = $('.btn.btn-toggle-play')
const cdThumb = $('.cd-thumb')
const heading = $('header h2')
const audio = $('#audio')
const progress = $('#progress')
const nextBtn = $('.btn.btn-next')
const preBtn = $('.btn.btn-prev')
const randomBtn = $('.btn.btn-random')
const repeatBtn = $('.btn.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
          name: "Cà phê không đường",
          singer: "JOMBIE x TKAN & BEAN",
          path: "./assets/mp3/cafe0duong.mp3",
          image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/8/6/f/286f0b4fae2ab3b2a7942968e22bd58f.jpg"
        },
        {
          name: "Thức giấc",
          singer: "Da LAB",
          path: "./assets/mp3/thucgiac.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810_500.jpg"
        },
        {
          name: "Thê lương",
          singer: "Phúc Chinh",
          path: "./assets/mp3/theluong.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033_500.jpg"
        },
        {
          name: "Phận duyên lỡ làng",
          singer: "Phát Huy T4",
          path: "./assets/mp3/phanduyenlolang.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/04/14/c/3/3/b/1618383513976_500.jpg"
        },
        {
          name: "Lời em nói (Lofi)",
          singer: "Dino, 1967",
          path: "./assets/mp3/loiemnoi.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/06/25/e/6/6/d/1624587722184_500.jpg"
        },
        {
          name: "Hạ còn vương nắng",
          singer: "DATKAA x KIDO",
          path: "./assets/mp3/haconvuongnang.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/04/15/5/b/e/5/1618468925875_500.jpg"
        }
      ],
      setConfig: function(key, value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
      },
      renderSongs: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
      },
      handleProcess: function(){
          const _this = this;
          const cd = $('.cd')
          const cdWidth = cd.offsetWidth


        //thu nhỏ cd
        document.onscroll = function(){
            const scrollY = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollY
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
            cd.style.opacity = newCdWidth / cdWidth 
        }

        //play, pause audio
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }
            if(!(_this.isPlaying)){
                audio.play()
            }
        }

        audio.onplay = function(){
            _this.isPlaying = true;
            $('.player').classList.add('playing')
            cdThumbAnimation.play()
        }

        audio.onpause = function(){
            _this.isPlaying = false;
            $('.player').classList.remove('playing')
            cdThumbAnimation.pause()
        }

        audio.onended = function(){
          if (_this.isRepeat){

          } else {
            _this.nextSong()
          }
          audio.play()
        }

        //xoay khi play/pause
        const cdThumbAnimation = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 12000,
            iterations: Infinity
        })
        cdThumbAnimation.pause()

        //tua bài hát
        audio.ontimeupdate = function(){
          if(audio.duration){
            const valueProgress = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = valueProgress
          }
        }
        
        progress.oninput = function(){
          audio.currentTime = progress.value / 100 * audio.duration
        }

        //bài hát tiếp theo
        nextBtn.onclick = function(){
          if (_this.isRandom) {
            _this.randomSong()
          } else {
            _this.nextSong()
          }
          audio.play()
          _this.scrollToActiveSong()
        }

        //bài hát trước
        preBtn.onclick = function(){
          if (_this.isRandom){
            _this.randomSong()
          } else {
            _this.preSong()
          }
          audio.play()
          _this.scrollToActiveSong()
        }

        //random
        randomBtn.onclick = function(){
          _this.isRandom = !_this.isRandom
          _this.setConfig('isRandom', _this.isRandom)
          randomBtn.classList.toggle("active", _this.isRandom)
        }

        //repeat
        repeatBtn.onclick = function(){
          _this.isRepeat = !_this.isRepeat
          _this.setConfig('isRepeat', _this.isRepeat)
          repeatBtn.classList.toggle("active", _this.isRepeat)
        }

        //nhấn vào playlist
        playlist.onclick = function(e){
          const songNode = e.target.closest(".song:not(.active)")
          if(songNode){
            _this.currentIndex = Number(songNode.getAttribute("data-index"))
            _this.loadCurrentSong()
            audio.play()
          }
        }
      },
      loadconfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
      },
      randomSong: function(){
        do {
          currentRandom = Math.floor(Math.random() * this.songs.length)
        } while( currentRandom === this.currentIndex)
        this.currentIndex = currentRandom
        this.loadCurrentSong()
      },
      nextSong: function(){
        this.currentIndex++
        if(this.currentIndex > this.songs.length - 1){
          this.currentIndex = 0
        }
        this.loadCurrentSong()
      },
      preSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0) {
          this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
      },
      scrollToActiveSong: function(){
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          })
        }, 300)
      },
      loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = 'url(' + this.currentSong.image + ')';
        audio.src = this.currentSong.path
        this.renderSongs()
      },
      defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
               return this.songs[this.currentIndex]  
            }
        })
      },
      start: function(){

          this.loadconfig()
          this.defineProperties()
          this.loadCurrentSong()
          this.renderSongs()
          this.handleProcess()

          //load dữ liệu từ local
          randomBtn.classList.toggle("active", this.isRandom)
          repeatBtn.classList.toggle("active", this.isRepeat)
      }
}

app.start()