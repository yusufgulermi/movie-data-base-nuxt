export default defineEventHandler(async (event) => {
    const { type } = event.context.params;

    const personData = await $fetch(`https://api.themoviedb.org/3/watch/providers/${ type }?watch_region=us`,
        {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        },
    });

    return personData;
});