# Jacqueline Worsley Ministries - Joyfully Living Following God

🎵 **Interactive Biblical Website** featuring the Parable of the Talents (Matthew 25:14-30) with cinematic design and **SoundCloud integration**.

## 🌐 Live Website

**[Visit Live Site](https://jlymoure25.netlify.app)** | **[GitHub Repository](https://github.com/Jlymoure25/JacquelineWorsleyMinistriesJoyfullyLivingFollowingGod)**

## ✨ Features

- **🎬 Cinematic Introduction**: Gold, crimson red, and cream white color scheme
- **📖 Interactive Parable Presentation**: Visual storytelling of the Parable of the Talents
- **🎵 SoundCloud Audio Integration**: "We Belong Together (Instrumental)" by Smooth Jazz All Stars
- **🎛️ Pure API Controls**: SoundCloud Widget API for precise 17% volume control
- **🗣️ Natural Narrator Voice**: Web Speech API with warm, natural delivery
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **✨ Cinematic Transitions**: Smooth scene transitions with fade effects
- **🦃 Thanksgiving Message**: Special holiday ending with celebration effects
- **📢 Social Media Ready**: Complete Open Graph and Twitter Card integration

## Color Scheme

- **Gold**: #FFD700 (Primary accent, represents divine blessing)
- **Crimson Red**: #DC143C (Ministry color, represents passion and sacrifice)  
- **Cream White**: #FFF8DC (Background, represents purity and peace)

## 🎵 SoundCloud Audio Integration

**Featured Music**: ["We Belong Together (Instrumental)" by Smooth Jazz All Stars](https://soundcloud.com/smoothjazzallstars/we-belong-together-3)

### API Controls Implementation:
- **Pure SoundCloud Widget API**: No URL parameters or CSS volume controls
- **17% Volume Control**: Precisely managed via `setVolume(17)` API calls
- **Timeline Management**: 
  - ▶️ Plays from beginning (`seekTo(0)`)
  - 🔄 Restart functionality on "Begin Journey"
  - 📈 2-minute fade-in effect
  - 📉 30-second fade-out at video end
- **Event Monitoring**: Progress tracking and volume enforcement
- **Error Recovery**: Automatic API error handling and recovery

### Audio Timeline:
1. **Intro**: Music starts with fade-in
2. **Journey Restart**: Audio restarts from beginning when "Begin Journey" clicked
3. **Continuous Play**: Background music throughout all scenes
4. **Final Fade**: 30-second API-controlled fade-out at end
5. **Fade to Black**: Cinematic video ending after audio fade

## Usage

1. Open `index.html` in a web browser
2. Click "Begin Your Journey" to start the experience
3. Use navigation buttons or keyboard arrows to move between sections
4. Use space bar to advance to the next section
5. Click the audio button to toggle sound

## Sections

1. **Introduction**: Welcome message with ministry branding
2. **Parable Introduction**: Title card for the Parable of the Talents
3. **Scene 1**: The master distributes talents to servants
4. **Scene 2**: Faithful servants multiply their talents
5. **Scene 3**: Fearful servant buries his talent
6. **Scene 4**: The faithful are rewarded
7. **Scene 5**: The unfaithful servant is condemned
8. **Message**: Key takeaway about faithfulness and stewardship
9. **Closing**: "Join us next time" message
10. **Thanksgiving**: Special holiday message and blessing

## Biblical Reference

Matthew 25:14-30 - The Parable of the Talents

## 🛠️ Technical Implementation

### Core Technologies:
- **Frontend**: Pure HTML5, CSS3, JavaScript (no frameworks)
- **Audio**: SoundCloud Widget API with comprehensive event handling
- **Speech**: Web Speech API for natural narrator voice
- **Design**: Responsive design with cinematic CSS animations
- **Navigation**: Touch gesture support for mobile devices

### SoundCloud Widget API Features:
```javascript
// Pure API Volume Control (17%)
this.scWidget.setVolume(17);
this.scWidget.seekTo(0);
this.scWidget.play();

// Event Monitoring
SC.Widget.Events.READY
SC.Widget.Events.PLAY
SC.Widget.Events.PLAY_PROGRESS
SC.Widget.Events.FINISH
```

### Audio Control Methods:
- **Volume Management**: Pure `setVolume()` API calls
- **Timeline Control**: `seekTo(0)` for restart functionality  
- **Progress Monitoring**: Real-time volume enforcement
- **Fade Effects**: Mathematical API-based fade-in/fade-out
- **Error Handling**: Comprehensive API error recovery

### Deployment Ready:
- **Netlify Configuration**: `netlify.toml` with headers and redirects
- **Social Media**: Complete Open Graph, Twitter Cards, Schema.org
- **Performance**: Optimized loading and API efficiency
- **Mobile**: Touch gestures and responsive design

## 🙏 Ministry Information

**Jacqueline Worsley Ministries**  
*Joyfully Living Following God*

This interactive website celebrates the joy of following God's Word through immersive biblical storytelling, combining technology with faith to create meaningful spiritual experiences.

### 🎵 Music Credits:
**"We Belong Together (Instrumental)"**  
Artist: Smooth Jazz All Stars  
Platform: SoundCloud  
Link: [soundcloud.com/smoothjazzallstars/we-belong-together-3](https://soundcloud.com/smoothjazzallstars/we-belong-together-3)

### 🚀 Deployment & Sharing:
- **Live Site**: [jlymoure25.netlify.app](https://jlymoure25.netlify.app)
- **GitHub**: [github.com/Jlymoure25/JacquelineWorsleyMinistriesJoyfullyLivingFollowingGod](https://github.com/Jlymoure25/JacquelineWorsleyMinistriesJoyfullyLivingFollowingGod)
- **Social Sharing**: Optimized for Facebook, Twitter, LinkedIn, Pinterest

---

> *"For to everyone who has will more be given, and he will have an abundance. But from the one who has not, even what he has will be taken away."*  
> **— Matthew 25:29**

**🌟 Experience the complete interactive journey with SoundCloud audio integration and pure API controls!**
