import * as functions from 'firebase-functions';
import musica from "./extras/musica";

export const generate_musica = functions.https.onRequest((request, response) => {
	const data = request.query.data;
	const song = musica(data);
	response.send(song);
});
