export const appConfig = ()  => ({
    trakt: {
        apiKey: process.env['TRAKT_API_KEY'] || '',
        apiVersion: process.env['TRAKT_API_VERSION'] || ''           
    }, 
    theMovieDb: {
        apiKey: process.env['THEMOVIEDB_API_KEY'] || ''
    }
});