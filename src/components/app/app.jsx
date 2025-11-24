import { Box } from '@mui/material'
import { Route, Routes } from 'react-router'
import { Channel, Main, Navbar, Search, VideoDetail } from '../index'

const App = () => {
	return (
		<Box>
			<Navbar />
			<Routes>
				<Route path='/' element={<Main />}></Route>
				<Route path='/channel/:id' element={<Channel />}></Route>
				<Route path='/video/:id' element={<VideoDetail />}></Route>
				<Route path='/search/:id' element={<Search />}></Route>
			</Routes>
		</Box>
	)
}

export default App
