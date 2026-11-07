import { useState, useRef, useCallback, useEffect } from 'react';

export type SoundEffectType =
  | 'countdown'
  | 'reveal'
  | 'curtain'
  | 'fuse'
  | 'launch'
  | 'firework'
  | 'diya'
  | 'card';

export interface SoundSystem {
  soundEnabled: boolean;
  toggleSound: () => void;
  enableSoundOnInteraction: () => void;
  playSound: (effect: SoundEffectType) => void;
}

export function useSound(): SoundSystem {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const getOrCreateContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const stopAmbientDrone = useCallback(() => {
    if (ambientNodesRef.current) {
      try {
        const { osc1, osc2, gain } = ambientNodesRef.current;
        const ctx = audioCtxRef.current;
        if (ctx) {
          gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
        }
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch {}
        }, 400);
      } catch {}
      ambientNodesRef.current = null;
    }
  }, []);

  const startAmbientDrone = useCallback(() => {
    const ctx = getOrCreateContext();
    if (!ctx || ambientNodesRef.current) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(146.83, ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220.0, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ambientNodesRef.current = { osc1, osc2, gain };
    } catch {}
  }, [getOrCreateContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        startAmbientDrone();
      } else {
        stopAmbientDrone();
      }
      return next;
    });
  }, [startAmbientDrone, stopAmbientDrone]);

  const enableSoundOnInteraction = useCallback(() => {
    getOrCreateContext();
  }, [getOrCreateContext]);

  const playSound = useCallback(
    (effect: SoundEffectType) => {
      if (!soundEnabled) return;
      const ctx = getOrCreateContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      try {
        switch (effect) {
          case 'countdown': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(528, now);
            osc.frequency.exponentialRampToValueAtTime(264, now + 0.45);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.46);
            break;
          }
          case 'reveal': {
            const freqs = [293.66, 369.99, 440, 587.33];
            freqs.forEach((f, idx) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, now + idx * 0.08);
              gain.gain.setValueAtTime(0.001, now + idx * 0.08);
              gain.gain.exponentialRampToValueAtTime(0.045, now + idx * 0.08 + 0.3);
              gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.08 + 2.2);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + idx * 0.08);
              osc.stop(now + idx * 0.08 + 2.25);
            });
            break;
          }
          case 'curtain': {
            const bellFreqs = [587.33, 880, 1174.66];
            bellFreqs.forEach((f, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, now + i * 0.12);
              gain.gain.setValueAtTime(0.06 / (i + 1), now + i * 0.12);
              gain.gain.exponentialRampToValueAtTime(0.0005, now + i * 0.12 + 2.6);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + i * 0.12);
              osc.stop(now + i * 0.12 + 2.65);
            });
            break;
          }
          case 'fuse': {
            const bufferSize = ctx.sampleRate * 0.9;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              data[i] = (Math.random() * 2 - 1) * 0.5;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(3200, now);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.002, now + 0.9);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + 0.9);
            break;
          }
          case 'launch': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(840, now + 1.1);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 1.16);
            break;
          }
          case 'firework': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(130, now);
            osc.frequency.exponentialRampToValueAtTime(38, now + 0.65);
            gain.gain.setValueAtTime(0.11, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.72);
            break;
          }
          case 'diya':
          case 'card': {
            const notes = effect === 'diya' ? [440, 554.37, 659.25, 880] : [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((f, idx) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, now + idx * 0.1);
              gain.gain.setValueAtTime(0.045, now + idx * 0.1);
              gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.1 + 1.6);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + idx * 0.1);
              osc.stop(now + idx * 0.1 + 1.65);
            });
            break;
          }
        }
      } catch {}
    },
    [soundEnabled, getOrCreateContext]
  );

  useEffect(() => {
    return () => {
      stopAmbientDrone();
    };
  }, [stopAmbientDrone]);

  return {
    soundEnabled,
    toggleSound,
    enableSoundOnInteraction,
    playSound,
  };
}
