export default async (req, res) => {
    let allData ={}

    const mostPopularData = await $fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    })

    const topRatedData = await $fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    })

    return allData = {
        mp: mostPopularData.results,
        tp: topRatedData.results,
    }
}
