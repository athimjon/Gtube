import { Box, Stack } from '@mui/material'
import { ChannelCard, VideoCard } from '../index.js'
const Videos = ({ videos }) => {
	// if (!videos.length) return <Loader />
	return (
		<Stack
			width={'100%'}
			direction={'row'}
			flexWrap={'wrap'}
			justifyContent={'start'}
			alignItems={'start'}
			gap={2}
		>
			{videos.map(item => (
				<Box key={item.id.videoId}>
					{item.id.videoId && <VideoCard video={item} />}
					{item.id.channelId && <ChannelCard video={item} />}
					{console.log(videos)}
				</Box>
			))}
		</Stack>
	)
}

export default Videos
