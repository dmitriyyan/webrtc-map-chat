export const getUserLocalStream = async () => {
  try {
    const localStrem = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return localStrem;
  } catch (err) {
    console.error(err);

    return null;
  }
};
