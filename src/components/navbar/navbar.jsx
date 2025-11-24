import { Box, Stack } from '@mui/material'
import { Link } from 'react-router'
import { colors } from '../../constants/colors'
import { logo } from '../../constants/index'
import { SearchBar } from '../index'

const Navbar = () => {
	return (
		<Stack
			direction={'row'}
			alignItems={'center'}
			justifyContent={'space-between'}
			position={'2'}
			height={'10vh'}
			sx={{
				position: 'sticky',
				top: 0,
				xIndex: 999,
				background: colors.primary,
			}}
		>
			<Link to={'/'}>
				<img src={logo} alt='Logo Not Found⁉️' height={50} />
			</Link>
			<SearchBar />
			<Box />
		</Stack>
	)
}

export default Navbar
