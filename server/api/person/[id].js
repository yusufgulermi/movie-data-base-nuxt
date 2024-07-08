export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    const personData = await $fetch(`https://api.themoviedb.org/3/person/${ id }?append_to_response=combined_credits,external_ids,latest`, {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        },
    });

    return personData;
});