import {
	CheckCircle,
	FavoriteOutlined,
	MarkChatRead,
	Tag,
	Visibility,
} from '@mui/icons-material'
import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { ApiService } from '../../service/api.service'
import { Loader, Videos } from '../index'

const VideoDetail = () => {
	const { id } = useParams()
	const [videoDetail, setVideoDetail] = useState(null)
	const [relatedVideo, setRelatedVideo] = useState(null)

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await ApiService.fetching(
					`videos?part=snippet,statistics&id=${id}`
				)
				setVideoDetail(data.items[0])

				const relatedData = await ApiService.fetching(
					`search?part=snippet&relatedToVideoId=${id}&type=video`
				)
				setRelatedVideo(relatedData.items)
				console.log(relatedData)
			} catch (error) {
				console.log(error)
			}
		}
		getData()
	}, [id])

	if (!videoDetail || !relatedVideo) return <Loader />
	const {
		snippet: { title, channelId, channelTitle, description, tags, thumbnails },
		statistics: { viewCount, likeCount, commentCount },
	} = videoDetail

	return (
		<Box minHeight={'90vh'} mb={10}>
			<Box display={'flex'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
				<Box width={{ xs: '100%', md: '75%' }}>
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${id}`}
						className='react-player'
						controls
						width='100%'
						height='100%'
						playing={false}
					/>
					{videoDetail.snippet.tags.map((item, idx) => (
						<Chip
							label={item}
							key={idx}
							sx={{ marginTop: '10px', cursor: 'pointer', ml: '10px' }}
							deleteIcon={<Tag />} // properly closed JSX
							onDelete={() => console.log('Tag deleted:', item)} // example handler
							variant='outlined'
						/>
					))}
					<Typography variant='h5' fontWeight='bold' p={2}>
						{videoDetail.snippet.title}
					</Typography>
					<Typography
						variant='body2' // 'subtitle2' works, but 'body2' is more readable for long descriptions
						p={2}
						sx={{ opacity: 0.7, whiteSpace: 'pre-line' }} // preserves line breaks
					>
						{videoDetail.snippet.description}
					</Typography>
					<Stack direction='row' gap='20px' alignItems='center' py={1} px={2}>
						<Stack
							sx={{ opacity: 0.7 }}
							direction='row'
							alignItems='center'
							gap='3px'
						>
							<Visibility />
							{parseInt(
								videoDetail?.statistics?.viewCount || 0
							).toLocaleString()}{' '}
							views
						</Stack>

						<Stack
							sx={{ opacity: 0.7 }}
							direction='row'
							alignItems='center'
							gap='3px'
						>
							<FavoriteOutlined />
							{parseInt(
								videoDetail?.statistics?.likeCount || 0
							).toLocaleString()}{' '}
							likes
						</Stack>

						<Stack
							sx={{ opacity: 0.7 }}
							direction='row'
							alignItems='center'
							gap='3px'
						>
							<MarkChatRead />
							{parseInt(
								videoDetail?.statistics?.commentCount || 0
							).toLocaleString()}
							{parseInt(videoDetail?.statistics?.commentCount || 0) === 1
								? ' comment'
								: ' comments'}
						</Stack>
					</Stack>
					<Stack direction='row' py={1} px={2}>
						<Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
							<Stack direction='row' alignItems='center' gap='5px' mt='5px'>
								<Avatar
									alt={videoDetail.snippet.channelTitle}
									src={videoDetail.snippet.thumbnails.default.url}
								/>
								<Typography
									variant='subtitle2'
									color='gray'
									display='flex'
									alignItems='center'
								>
									{videoDetail.snippet.channelTitle}
									<CheckCircle
										sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
									/>
								</Typography>
							</Stack>
						</Link>
					</Stack>
				</Box>
				<Box
					width={{ xs: '100%', md: '25%' }}
					px={2}
					py={{ md: 1, xs: 5 }}
					justifyContent='center'
					alignItems='center'
					overflow={'scroll'}
					maxHeight={'120vh'}
				>
					<Videos videos={relatedVideo} />
				</Box>
			</Box>
		</Box>
	)
}

export default VideoDetail
