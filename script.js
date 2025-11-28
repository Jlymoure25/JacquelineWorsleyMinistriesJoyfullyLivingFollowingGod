// Jacqueline Worsley Ministries - Interactive Website Script

class CinematicWebsite {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 0;
        this.sections = [];
        this.audio = null;
        this.isAudioPlaying = false;
        this.autoProgressTimer = null;
        this.isNarrating = false;
        this.currentUtterance = null;
        this.sectionNarrated = new Set();
        this.introMusicPlayed = false;
        this.isPaused = false;
        this.soundcloudPlayer = null;
        this.fadeInterval = null;
        this.audioReady = false;
        this.scWidget = null;
        this.voicesLoaded = false;
        this.speechTriggered = false;
        this.init();
    }

    init() {
        this.sections = document.querySelectorAll('.section');
        this.totalSections = this.sections.length;
        this.setupAudio();
        this.showSection(0);
        this.setupNavigation();
        this.setupAutoAdvance();
        this.startAudioPlayback();
    }

    setupAudio() {
        this.initializeSpeechSynthesis();
        this.initializeSoundCloudIntegration();
    }

    initializeSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            console.log('🎤 Initializing speech synthesis for live site...');
            
            const voices = speechSynthesis.getVoices();
            console.log('Available voices:', voices.length);
            
            if (voices.length === 0) {
                speechSynthesis.addEventListener('voiceschanged', () => {
                    const newVoices = speechSynthesis.getVoices();
                    console.log('Speech synthesis voices loaded:', newVoices.length);
                    this.voicesLoaded = true;
                });
            } else {
                this.voicesLoaded = true;
                console.log('Voices already available');
            }
            
            this.testSpeechSynthesis();
        } else {
            console.error('Speech synthesis not supported in this browser');
        }
    }

    testSpeechSynthesis() {
        try {
            const testUtterance = new SpeechSynthesisUtterance('');
            testUtterance.volume = 0.01;
            testUtterance.rate = 10;
            speechSynthesis.speak(testUtterance);
            console.log('Speech synthesis test completed');
        } catch (error) {
            console.error('Speech synthesis test failed:', error);
        }
    }
    
    addUserInteractionTrigger() {
        const triggerSpeech = () => {
            if (!this.speechTriggered) {
                console.log('🔓 Triggering speech synthesis via user interaction...');
                try {
                    const silentUtterance = new SpeechSynthesisUtterance('');
                    silentUtterance.volume = 0.01;
                    speechSynthesis.speak(silentUtterance);
                    this.speechTriggered = true;
                    console.log('✓ Speech synthesis unlocked');
                } catch (error) {
                    console.error('Speech trigger failed:', error);
                }
            }
        };
        
        ['click', 'touchstart', 'keydown', 'scroll'].forEach(event => {
            document.addEventListener(event, triggerSpeech, { once: true });
        });
        
        setTimeout(triggerSpeech, 1000);
    }

    initializeSoundCloudIntegration() {
        this.soundcloudPlayer = document.getElementById('soundcloud-player');
        if (this.soundcloudPlayer) {
            console.log('SoundCloud player reference established');
            
            if (typeof SC !== 'undefined' && SC.Widget) {
                this.scWidget = SC.Widget(this.soundcloudPlayer);
                
                this.scWidget.bind(SC.Widget.Events.READY, () => {
                    console.log('SoundCloud Widget API ready - full API controls');
                    this.scWidget.setVolume(50);
                    this.scWidget.seekTo(0);
                    this.scWidget.play();
                    this.scWidget.getDuration((duration) => {
                        console.log('Audio duration:', duration, 'ms');
                    });
                    this.audioReady = true;
                });
                
                this.scWidget.bind(SC.Widget.Events.PLAY, () => {
                    console.log('Audio playing via Widget API - maintaining optimal volume');
                    this.scWidget.setVolume(50);
                });
                
                this.scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
                    if (data.currentPosition % 10000 < 100) {
                        this.scWidget.setVolume(50);
                    }
                });
                
                this.scWidget.bind(SC.Widget.Events.FINISH, () => {
                    console.log('Audio finished - maintaining volume setting');
                });
                
                this.scWidget.bind(SC.Widget.Events.ERROR, () => {
                    console.log('SoundCloud Widget API error - attempting recovery');
                });
            }
            
            this.applyVolumeReduction();
        }
    }

    applyVolumeReduction() {
        if (this.soundcloudPlayer) {
            this.soundcloudPlayer.style.opacity = '0.5';
            
            try {
                if (this.soundcloudPlayer.volume !== undefined) {
                    this.soundcloudPlayer.volume = 0.5;
                }
            } catch (e) {
                console.log('HTML5 volume control not available');
            }
        }
    }

    toggleBackgroundMusic() {
        if (this.scWidget) {
            this.scWidget.isPaused((paused) => {
                if (paused) {
                    this.scWidget.play();
                    this.fadeInAudio();
                } else {
                    this.fadeOutAudio();
                    setTimeout(() => {
                        this.scWidget.pause();
                    }, 1000);
                }
            });
        }
    }

    fadeToSoftVolume() {
        if (this.scWidget) {
            this.scWidget.setVolume(25);
        }
    }

    adjustAudioVolume(level) {
        if (this.scWidget) {
            const volume = Math.max(0, Math.min(100, level));
            this.scWidget.setVolume(volume);
            console.log(`Audio volume adjusted to ${volume}% via SoundCloud API`);
        }
    }

    initializeSoundCloudPlayer() {
        const iframe = document.getElementById('soundcloud-player');
        if (iframe && typeof SC !== 'undefined') {
            this.scWidget = SC.Widget(iframe);
            
            this.scWidget.bind(SC.Widget.Events.READY, () => {
                console.log('SoundCloud Widget initialized with API controls');
                this.scWidget.setVolume(50);
                this.scWidget.play();
                this.audioReady = true;
            });
            
            this.scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
                this.scWidget.setVolume(50);
            });
        }
    }

    restartAudioFromBeginning() {
        console.log('Restarting SoundCloud audio from beginning with API controls');
        
        if (this.scWidget) {
            this.scWidget.seekTo(0);
            this.scWidget.setVolume(50);
            this.scWidget.play();
            console.log('Audio restarted via Widget API with 50% volume');
        } else {
            this.initializeSoundCloudPlayer();
        }
    }

    fadeOutSoundCloudAudio() {
        if (this.scWidget) {
            console.log('Starting gentle fade-out via Widget API');
            let currentVolume = 50;
            const fadeStep = 2;
            const fadeInterval = 150;
            
            const fade = setInterval(() => {
                currentVolume = Math.max(0, currentVolume - fadeStep);
                this.scWidget.setVolume(currentVolume);
                console.log(`Fade out: Volume at ${currentVolume}%`);
                
                if (currentVolume <= 0) {
                    clearInterval(fade);
                    console.log('Fade-out complete via Widget API');
                }
            }, fadeInterval);
        }
    }

    fadeVideoToBlack() {
        const fadeOverlay = document.createElement('div');
        fadeOverlay.className = 'fade-to-black-overlay';
        fadeOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0;
            z-index: 9999;
            pointer-events: none;
            transition: opacity 3s ease-in-out;
        `;
        
        document.body.appendChild(fadeOverlay);
        
        setTimeout(() => {
            fadeOverlay.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            this.showEndScreenAfterBlack();
        }, 3500);
    }

    startBackgroundMusic() {
        if (this.scWidget) {
            this.scWidget.setVolume(0);
            this.scWidget.play();
            
            let volume = 0;
            const fadeIn = setInterval(() => {
                volume = Math.min(50, volume + 2);
                this.scWidget.setVolume(volume);
                
                if (volume >= 50) {
                    clearInterval(fadeIn);
                    console.log('Audio fade-in complete at 50% volume');
                }
            }, 100);
        }
    }

    fadeInAudio() {
        if (this.scWidget) {
            this.scWidget.setVolume(50);
        }
    }

    fadeOutAudio() {
        if (this.scWidget) {
            let volume = 50;
            const fadeOut = setInterval(() => {
                volume = Math.max(0, volume - 5);
                this.scWidget.setVolume(volume);
                
                if (volume <= 0) {
                    clearInterval(fadeOut);
                }
            }, 100);
        }
    }

    showEndScreenAfterBlack() {
        const endScreen = document.createElement('div');
        endScreen.className = 'end-screen';
        endScreen.innerHTML = `
            <div class="end-content">
                <h1>Thank You for Joining Us</h1>
                <p>May the wisdom of the Parable of the Talents inspire you to use your God-given gifts to serve others and bring glory to His name.</p>
                <div class="scripture-quote">
                    <p>"Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master's happiness!"</p>
                    <cite>— Matthew 25:23 (NIV)</cite>
                </div>
                <p class="ministry-blessing">Blessings from Jacqueline Worsley Ministries</p>
                <button onclick="location.reload()" class="replay-button">Experience Again</button>
            </div>
        `;
        
        endScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-gold) 0%, var(--crimson) 50%, var(--dark-red) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 0;
            transition: opacity 2s ease-in;
        `;
        
        document.body.appendChild(endScreen);
        
        setTimeout(() => {
            endScreen.style.opacity = '1';
        }, 500);
    }

    startAudioPlayback() {
        setTimeout(() => {
            this.displayWelcomeMessage();
        }, 1500);
    }

    startAmbientAudio() {
        if (this.scWidget) {
            this.scWidget.play();
            this.scWidget.setVolume(50);
        } else {
            this.initializeSoundCloudPlayer();
        }
    }

    createAudioVisualization() {
        const visualization = document.createElement('div');
        visualization.className = 'audio-visualization';
        visualization.innerHTML = `
            <div class="audio-bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <p>♪ Sacred Music Playing ♪</p>
        `;
        
        visualization.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 25px;
            background: linear-gradient(45deg, rgba(212, 175, 55, 0.9), rgba(255, 215, 0, 0.9));
            border-radius: 25px;
            color: var(--dark-red);
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            border: 2px solid var(--cream);
        `;
        
        document.body.appendChild(visualization);
        
        setTimeout(() => {
            if (visualization.parentNode) {
                visualization.remove();
            }
        }, 5000);
    }

    playAudio() {
        if (this.scWidget) {
            console.log('Starting audio via Widget API');
            this.scWidget.play();
            this.scWidget.setVolume(50);
            this.createAudioVisualization();
        } else {
            console.log('Widget not ready, initializing...');
            this.initializeSoundCloudPlayer();
        }
    }

    createFallbackAudio() {
        console.log('Creating fallback audio experience');
        
        const audioNotice = document.createElement('div');
        audioNotice.innerHTML = `
            <p>🎵 For the full experience with background music, please enable JavaScript and refresh the page.</p>
        `;
        audioNotice.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            background: var(--gold);
            color: var(--dark-red);
            border-radius: 10px;
            z-index: 1000;
            font-weight: 600;
        `;
        
        document.body.appendChild(audioNotice);
        
        setTimeout(() => {
            if (audioNotice.parentNode) {
                audioNotice.remove();
            }
        }, 8000);
    }

    setupNavigation() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const beginBtn = document.getElementById('beginJourney');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentSection < this.totalSections - 1) {
                    this.nextSection();
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentSection > 0) {
                    this.previousSection();
                }
            });
        }
        
        if (beginBtn) {
            beginBtn.addEventListener('click', () => {
                this.restartAudioFromBeginning();
                this.nextSection();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSection();
            }
        });
    }

    setupAutoAdvance() {
        this.autoProgressTimer = setInterval(() => {
            if (!this.isNarrating && this.currentSection < this.totalSections - 1) {
                this.nextSection();
            }
        }, 12000);
    }

    showSection(index) {
        this.sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                section.style.display = 'block';
                
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 50);
            } else {
                section.classList.remove('active');
                section.style.opacity = '0';
                setTimeout(() => {
                    if (!section.classList.contains('active')) {
                        section.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        this.currentSection = index;
        this.updateNavigation();
        this.narrateSection(index);
    }

    displayWelcomeMessage() {
        const messages = [
            "Welcome, dear friends, to Jacqueline Worsley Ministries. We're so happy you're here with us today.",
            "Let's prepare our hearts for a wonderful journey through God's Word together.",
            "Today we'll explore the beautiful Parable of the Talents from Matthew 25. It's truly inspiring.",
            "Come, let's discover what amazing gifts our loving God has given each one of us."
        ];
        
        let messageIndex = 0;
        const messageDisplay = document.createElement('div');
        messageDisplay.className = 'voice-message';
        messageDisplay.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, rgba(220, 20, 60, 0.9), rgba(139, 0, 0, 0.9));
            color: var(--gold);
            padding: 1.5rem 2.5rem;
            border-radius: 20px;
            font-size: 1.3rem;
            font-weight: 600;
            z-index: 2000;
            border: 3px solid var(--gold);
            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            opacity: 0;
            transition: all 0.5s ease;
            text-align: center;
            font-family: 'Playfair Display', serif;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        `;
        
        document.body.appendChild(messageDisplay);
        
        this.initializeSpeechSynthesis();
        this.addUserInteractionTrigger();
        
        const showMessage = () => {
            if (messageIndex < messages.length && this.currentSection === 0) {
                messageDisplay.textContent = messages[messageIndex];
                messageDisplay.style.opacity = '1';
                
                const onMessageComplete = () => {
                    messageDisplay.style.opacity = '0';
                    setTimeout(() => {
                        messageIndex++;
                        if (messageIndex < messages.length) {
                            showMessage();
                        } else {
                            messageDisplay.remove();
                            this.sectionNarrated.add('0-intro');
                        }
                    }, 1500);
                };
                
                this.speakText(messages[messageIndex], onMessageComplete);
            }
        };
        
        setTimeout(showMessage, 3000);
    }
    
    speakText(text, onComplete = null) {
        console.log('🎤 Attempting to start narrator voice on live site...');
        
        if ('speechSynthesis' in window) {
            console.log('✓ Speech synthesis available, initializing...');
            
            speechSynthesis.cancel();
            
            const startSpeech = () => {
                try {
                    const voices = speechSynthesis.getVoices();
                    console.log('🔊 Available voices for narrator:', voices.length);
                    
                    if (voices.length === 0) {
                        console.warn('⚠ No voices loaded yet, retrying...');
                        setTimeout(startSpeech, 500);
                        return;
                    }
                    
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = 0.9;
                    utterance.pitch = 1.1;
                    utterance.volume = 1.0;
                    
                    const naturalVoice = voices.find(voice => 
                        voice.lang.startsWith('en') && (
                            voice.name.toLowerCase().includes('samantha') ||
                            voice.name.toLowerCase().includes('karen') ||
                            voice.name.toLowerCase().includes('susan') ||
                            voice.name.toLowerCase().includes('victoria') ||
                            voice.name.toLowerCase().includes('female') ||
                            voice.name.toLowerCase().includes('allison') ||
                            voice.name.toLowerCase().includes('alex')
                        )
                    ) || voices.find(voice => voice.lang.startsWith('en'));
                    
                    if (naturalVoice) {
                        utterance.voice = naturalVoice;
                        console.log('🎯 Selected voice:', naturalVoice.name, naturalVoice.lang);
                    } else {
                        console.log('📢 Using default voice');
                    }
                    
                    this.isNarrating = true;
                    this.currentUtterance = utterance;
                    
                    utterance.onstart = () => {
                        console.log('✅ Narrator voice successfully started on live site!');
                    };
                    
                    utterance.onend = () => {
                        this.isNarrating = false;
                        this.currentUtterance = null;
                        console.log('✅ Narrator voice completed:', text.substring(0, 50) + '...');
                        if (onComplete) {
                            setTimeout(onComplete, 2000);
                        }
                    };
                    
                    utterance.onerror = (event) => {
                        this.isNarrating = false;
                        this.currentUtterance = null;
                        console.error('❌ Narrator voice error on live site:', event.error, event);
                        if (onComplete) {
                            setTimeout(onComplete, 1000);
                        }
                    };
                    
                    utterance.onpause = () => {
                        console.log('⏸ Narrator voice paused');
                    };
                    
                    utterance.onresume = () => {
                        console.log('▶ Narrator voice resumed');
                    };
                    
                    setTimeout(() => {
                        console.log('🚀 Attempting to speak on live site...');
                        speechSynthesis.speak(utterance);
                        
                        setTimeout(() => {
                            if (!this.isNarrating) {
                                console.warn('⚠ Speech may not have started, trying again...');
                                speechSynthesis.cancel();
                                speechSynthesis.speak(utterance);
                            }
                        }, 1000);
                    }, 100);
                    
                } catch (error) {
                    console.error('❌ Error creating speech utterance:', error);
                    if (onComplete) {
                        setTimeout(onComplete, 1000);
                    }
                }
            };
            
            startSpeech();
        } else {
            console.error('❌ Speech synthesis not supported on this browser');
            if (onComplete) {
                setTimeout(onComplete, 1000);
            }
        }
    }

    narrateSection(sectionIndex) {
        if (this.sectionNarrated.has(sectionIndex)) {
            return;
        }
        
        const section = this.sections[sectionIndex];
        if (!section) return;
        
        const sectionContent = section.querySelector('p');
        if (sectionContent) {
            const text = sectionContent.textContent;
            this.speakText(text, () => {
                this.sectionNarrated.add(sectionIndex);
            });
        }
    }

    nextSection() {
        if (this.currentSection < this.totalSections - 1) {
            this.showSection(this.currentSection + 1);
        } else {
            this.endPresentation();
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.showSection(this.currentSection - 1);
        }
    }

    updateNavigation() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentSection > 0 ? 'block' : 'none';
        }
        
        if (nextBtn) {
            if (this.currentSection === this.totalSections - 1) {
                nextBtn.textContent = 'Complete Journey';
            } else {
                nextBtn.textContent = 'Continue';
            }
        }
    }

    endPresentation() {
        if (this.autoProgressTimer) {
            clearInterval(this.autoProgressTimer);
        }
        
        if (this.isNarrating && this.currentUtterance) {
            speechSynthesis.cancel();
            this.isNarrating = false;
        }
        
        this.fadeOutSoundCloudAudio();
        
        setTimeout(() => {
            this.fadeVideoToBlack();
        }, 2000);
    }

    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    pause() {
        this.isPaused = true;
        
        if (this.isNarrating && speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
        
        if (this.autoProgressTimer) {
            clearInterval(this.autoProgressTimer);
        }
        
        if (this.scWidget) {
            this.scWidget.pause();
        }
    }

    resume() {
        this.isPaused = false;
        
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
        
        this.setupAutoAdvance();
        
        if (this.scWidget) {
            this.scWidget.play();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Initializing Jacqueline Worsley Ministries Cinematic Experience...');
    new CinematicWebsite();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.cinematicWebsite) {
            console.log('🎬 Late initialization of Cinematic Experience...');
            window.cinematicWebsite = new CinematicWebsite();
        }
    });
} else {
    if (!window.cinematicWebsite) {
        console.log('🎬 Immediate initialization of Cinematic Experience...');
        window.cinematicWebsite = new CinematicWebsite();
    }
}