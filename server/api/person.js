export default async (req, res) => {
    const personData = await $fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1`, {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        },
    });
    return personData;
}
