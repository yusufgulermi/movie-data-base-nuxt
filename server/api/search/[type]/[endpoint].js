export default defineEventHandler(async (event) => {
    const { endPoint, type } = event.context.params;

    const personData = await $fetch(`https://api.themoviedb.org/3/discover/${ type }?page=1&with_runtime.gt=0&with_runtime.lte=400&vote_average.lte=10&vote_count.gte=0&vote_average.gte=0&${ endPoint }`,
        {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        },
    });

    return personData;
});