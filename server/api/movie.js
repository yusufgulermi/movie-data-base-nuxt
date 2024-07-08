export default defineEventHandler(async () => {
    const header = {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    };

    const popularMovieData = await $fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,header);
    const topRatedMovieData = await $fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,header);
    const popularTvData = await $fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, header);
    const topRatedTvData = await $fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, header);

    return {
        pm: popularMovieData,
        tm: topRatedMovieData,
        pt: popularTvData,
        tt: topRatedTvData,
    };
});