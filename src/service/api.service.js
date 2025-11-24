import axios from 'axios'
const BASE_URI = 'https://youtube-v31.p.rapidapi.com'
const KEY = process.env.REACT_APP_PUBLIC_KEY
const options = {
	params: {
		// relatedToVideoId: '7ghhRHRP6t4',
		// part: 'id,snippet',
		// type: 'video',
		maxResults: '50',
	},
	headers: {
		'x-rapidapi-key': KEY.toString(),
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
	},
}

export const ApiService = {
	async fetching(url) {
		const response = await axios.get(`${BASE_URI}/${url}`, options)
		return response.data
	},
}
