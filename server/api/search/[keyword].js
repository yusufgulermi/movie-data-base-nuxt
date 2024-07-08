export default defineEventHandler(async (event) => {
    const { keyword } = event.context.params;

    const searchedData = await $fetch(`https://api.themoviedb.org/3/search/multi?query=${ keyword }`, {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    })

    return searchedData;
});