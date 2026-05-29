import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const playerRef = useRef<any>(null);
  const containerId = 'youtube-ambient-player';

  useEffect(() => {
    // Hide tooltip after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 1. Define global callback for YouTube API
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerId, {
        videoId: 'DONeavElf7E',
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: 'DONeavElf7E', // Required for loop to work
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            // Set initial volume to a comfortable ambient level
            if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
              playerRef.current.setVolume(35);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    // 2. Load YouTube API script if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else if (window.YT && window.YT.Player) {
      // If script is already loaded but component remounts
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  const togglePlay = () => {
    if (!isReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  return (
    <>
      {/* Hidden YouTube Player Iframe */}
      <div 
        id={containerId} 
        style={{ 
          position: 'absolute', 
          width: 0, 
          height: 0, 
          opacity: 0, 
          pointerEvents: 'none', 
          left: '-9999px' 
        }} 
      />

      {/* Premium Floating Music Widget */}
      <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 select-none">
        
        {/* Tooltip Invite */}
        {showTooltip && (
          <div 
            className="hidden sm:block bg-amber border border-amber/30 text-walnut px-4 py-2 rounded-2xl text-xs font-serif italic shadow-lg shadow-amber/15 animate-bounce animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            Activer l'ambiance 🎵
          </div>
        )}

        <div className="relative group flex items-center">
          {/* Main Controller Glass Card */}
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl ${
              isPlaying
                ? 'bg-amber/20 border-amber/40 text-amber hover:bg-amber/30 hover:scale-105'
                : 'bg-white/10 border-white/20 text-warm-white hover:bg-white/15 hover:border-amber/30 hover:scale-105'
            }`}
            style={{
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            }}
            title={isPlaying ? "Couper l'ambiance" : "Lancer la musique d'ambiance"}
          >
            {isPlaying ? (
              <div className="flex items-center justify-center relative">
                {/* Visualizer animation overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150">
                  <Music size={24} className="animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <Volume2 size={20} className="relative z-10" />
              </div>
            ) : (
              <VolumeX size={20} />
            )}
          </button>

          {/* Equalizer animation when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 ml-3 bg-amber/5 px-2.5 py-1.5 rounded-full border border-amber/10 backdrop-blur-md">
              <span className="w-0.5 bg-amber rounded-full equalizer-bar" style={{ height: '4px', animation: 'bounce 0.8s ease-in-out infinite' }} />
              <span className="w-0.5 bg-amber rounded-full equalizer-bar" style={{ height: '4px', animation: 'bounce 0.8s ease-in-out infinite 0.15s' }} />
              <span className="w-0.5 bg-amber rounded-full equalizer-bar" style={{ height: '4px', animation: 'bounce 0.8s ease-in-out infinite 0.3s' }} />
              <span className="w-0.5 bg-amber rounded-full equalizer-bar" style={{ height: '4px', animation: 'bounce 0.8s ease-in-out infinite 0.45s' }} />
            </div>
          )}

          {/* Sliding track details card on hover */}
          <div 
            className="absolute left-16 pl-2 opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-500 ease-out"
          >
            <div 
              className="bg-walnut/90 border border-amber/20 text-warm-white/90 px-4 py-2.5 rounded-2xl shadow-xl flex flex-col min-w-[210px]"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <span className="text-[10px] text-amber uppercase tracking-widest font-semibold">Musique d'ambiance</span>
              <span className="text-xs font-serif italic font-medium truncate mt-0.5">Matoub Lounès</span>
              <span className="text-[10px] text-sand/60 truncate mt-0.5">Equrent Etregwa (FL Ambient Cover)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Equalizer Styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .equalizer-bar {
          display: inline-block;
        }
      `}</style>
    </>
  );
};
