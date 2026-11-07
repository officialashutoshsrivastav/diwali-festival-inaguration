import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CinematicIntro } from './components/CinematicIntro';
import { PersonalizedReveal } from './components/PersonalizedReveal';
import { GrandCurtains } from './components/GrandCurtains';
import { DiwaliReveal } from './components/DiwaliReveal';
import { CelebrationCards } from './components/CelebrationCards';
import { RocketLaunch } from './components/RocketLaunch';
import { DiyaLighting } from './components/DiyaLighting';
import { LuxuryGreetingCard } from './components/LuxuryGreetingCard';
import { PersonalizedWishCreator } from './components/PersonalizedWishCreator';
import { SoundController } from './components/SoundController';
import { BottomSignatureFooter } from './components/FestiveSvgs';
import { usePersonalization } from './hooks/usePersonalization';
import { useSound } from './hooks/useSound';
import {
  CeremonyScene,
  resolveInitialSceneFromSearch,
  getBaseUrl,
} from './utils/shareUtils';

export default function App() {
  const {
    displayName,
    uppercaseName,
    hasCustomName,
    updateRecipientName,
  } = usePersonalization();

  const {
    soundEnabled,
    toggleSound,
    enableSoundOnInteraction,
    playSound,
  } = useSound();

  const [scene, setScene] = useState<CeremonyScene>(() =>
    typeof window !== 'undefined'
      ? resolveInitialSceneFromSearch(window.location.search)
      : 'intro'
  );

  useEffect(() => {
    const baseUrl = getBaseUrl();
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', baseUrl);
    }

    if (hasCustomName) {
      document.title = `Diwali Grand Inauguration for ${displayName} | Made by officialashutoshsrivastav`;
    } else {
      document.title = 'Diwali Grand Inauguration | Made by officialashutoshsrivastav - Ashutosh Srivastav';
    }
  }, [displayName, hasCustomName]);

  const goToScene = (targetScene: CeremonyScene) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScene(targetScene);
  };

  const handleReplayForName = (newName: string) => {
    updateRecipientName(newName, true);
    goToScene('reveal');
  };

  return (
    <div
      data-scene={scene}
      data-base-url={getBaseUrl()}
      className="min-h-screen w-full bg-[#09070F] text-[#FFF5E1] relative overflow-x-hidden font-poppins flex flex-col justify-between"
    >
      <SoundController
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {scene === 'intro' && (
            <motion.main
              key="scene-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <CinematicIntro
                recipientName={displayName}
                hasCustomName={hasCustomName}
                onBegin={() => goToScene('reveal')}
                playSound={playSound}
                enableSoundOnInteraction={enableSoundOnInteraction}
              />
            </motion.main>
          )}

          {scene === 'reveal' && (
            <motion.main
              key="scene-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <PersonalizedReveal
                uppercaseName={uppercaseName}
                onComplete={() => goToScene('curtains')}
                playSound={playSound}
              />
            </motion.main>
          )}

          {scene === 'curtains' && (
            <motion.main
              key="scene-curtains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <GrandCurtains
                recipientName={displayName}
                onCurtainsOpened={() => goToScene('diwali')}
                playSound={playSound}
              />
            </motion.main>
          )}

          {scene === 'diwali' && (
            <motion.main
              key="scene-diwali"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <DiwaliReveal
                recipientName={displayName}
                onNext={() => goToScene('cards')}
                onPrev={() => goToScene('curtains')}
              />
            </motion.main>
          )}

          {scene === 'cards' && (
            <motion.main
              key="scene-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <CelebrationCards
                onNext={() => goToScene('rocket')}
                onPrev={() => goToScene('diwali')}
              />
            </motion.main>
          )}

          {scene === 'rocket' && (
            <motion.main
              key="scene-rocket"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <RocketLaunch
                playSound={playSound}
                onNext={() => goToScene('diya')}
                onPrev={() => goToScene('cards')}
              />
            </motion.main>
          )}

          {scene === 'diya' && (
            <motion.main
              key="scene-diya"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <DiyaLighting
                playSound={playSound}
                onNext={() => goToScene('greeting')}
                onPrev={() => goToScene('rocket')}
              />
            </motion.main>
          )}

          {scene === 'greeting' && (
            <motion.main
              key="scene-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <LuxuryGreetingCard
                uppercaseName={uppercaseName}
                displayName={displayName}
                playSound={playSound}
                onNext={() => goToScene('wish')}
                onPrev={() => goToScene('diya')}
              />
            </motion.main>
          )}

          {scene === 'wish' && (
            <motion.main
              key="scene-wish"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="flex-1"
            >
              <PersonalizedWishCreator
                currentRecipientName={displayName}
                onApplyPersonalization={(newName) => updateRecipientName(newName, true)}
                onReplayWithNewName={handleReplayForName}
                onPrev={() => goToScene('greeting')}
                onRestartFromIntro={() => goToScene('intro')}
              />
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      <BottomSignatureFooter />
    </div>
  );
}
