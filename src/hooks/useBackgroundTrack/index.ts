import { Audio } from "expo-av";
import { useCallback, useEffect, useState } from "react";

const useBackgroundTrack = () => {
  const [oldCachedSound, setOldCachedSound] =
    useState<Audio.Sound | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [triggeredFirstPlay, setTriggeredFirstPlay] = useState(false);

  const onFirstPlay = useCallback(async () => {
    setTriggeredFirstPlay(true);
    setIsPlaying(true);
    const { sound } = await Audio.Sound.createAsync(
      require("@assets/sounds/pokemon.mp3"),
      { shouldPlay: false, isLooping: true }
    );
    setOldCachedSound(sound);
  }, []);

  const onVolumeChange = (number: number) => {
    oldCachedSound?.setVolumeAsync(number);
  };
  const onStop = () => {
    setIsPlaying(false);
    oldCachedSound?.pauseAsync();
  };

  const onPlay = () => {
    setIsPlaying(true);
    oldCachedSound?.playAsync();
  };

  useEffect(() => {
    if (!triggeredFirstPlay) onFirstPlay();
  }, [triggeredFirstPlay, onFirstPlay]);

  return { isPlaying, onVolumeChange, onStop, onPlay };
};

export type TReturn = ReturnType<typeof useBackgroundTrack>;

export default useBackgroundTrack;
