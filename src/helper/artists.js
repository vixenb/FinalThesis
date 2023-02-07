export const setFavourites = (artists, favArtists) => {
  const customArtists = [];
  // eslint-disable-next-line array-callback-return
  artists.map((artist) => {
    let helper = 0;
    let customArtist;

    // eslint-disable-next-line array-callback-return
    favArtists.map((fav) => {
      if (artist.id === fav.artistId) {
        customArtist = {
          ...artist,
          key: artist.id,
          value: artist.name.toLowerCase(),
          isFavourite: true
        };
        customArtists.push(customArtist);
        helper++;
      }
    });

    if (helper === 0) {
      customArtist = {
        ...artist,
        key: artist.id,
        value: artist.name.toLowerCase(),
        isFavourite: false
      };
      customArtists.push(customArtist);
    }
  });

  return customArtists;
};
