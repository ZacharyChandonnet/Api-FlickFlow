import {Router} from 'express';
import expressListRoutes from 'express-list-routes';
import * as trakt from '../services/trakt';

export const seriesRouter = Router();

seriesRouter.get('/trending', async (req, res) => {
    try {
        const trendingSeries = await trakt.fetchTrending();
        res.status(200);
        return res.json({success: true, series: trendingSeries});
    } catch(err) {
        res.status(500);
        return res.json({success: false, erreur: err});
    }
});

seriesRouter.get('/search', async (req, res) => {
    const query = req.query['q'] as string;
    console.log(query);
    if (!query) {
        res.status(400);
        return res.json({success: false, erreur: 'Un paramètre de requête "q" est nécessaire à la recherche.'});
    }
    try {
        const foundShows = await trakt.searchShows(query);
        res.status(200);
        return res.json({success: true, series: foundShows});
    } catch(err) {
        res.status(500);
        return res.json({success: false, erreur: err});
    }
});

seriesRouter.get('/favorites', async (req, res) => {
    const query = req.query['id'] as string | string[];
    if (!query) {
        res.status(400);
        return res.json({success: false, erreur: 'Des paramètres de requête "id" sont nécessaires.'});
    }
    const ids = typeof query === 'string' ? [query] : query;
    try {
        const favoriteShows = await trakt.fetchShowsByIds(ids);
        res.status(200);
        return res.json({success: true, series: favoriteShows});
    } catch(err) {
        res.status(500);
        return res.json({success: false, erreur: err});
    }
});

seriesRouter.get('/:serieId', async (req, res) => {
    const serieId = req.params.serieId;
    try {
        const serie = await trakt.fetchExtendedShowById(serieId);
        res.status(200);
        return res.json({success: true, serie});
    } catch(err) {
        res.status(500);
        return res.json({success: false, erreur: err});
    }
});


//@ts-ignore
expressListRoutes(seriesRouter, {prefix: '/api/series'});