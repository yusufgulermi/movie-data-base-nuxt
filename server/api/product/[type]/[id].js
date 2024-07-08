export default defineEventHandler(async (event) => {
    const { id, type } = event.context.params;

    const movieData = await $fetch(`https://api.themoviedb.org/3/${type}/${ id }?append_to_response=keywords,credits`, {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    })

    return movieData;
});