import { Search } from '@mui/icons-material'
import { IconButton, Paper } from '@mui/material'
import { useState } from 'react'
import { colors } from '../../constants/colors'

import { useNavigate } from 'react-router'
const SearchBar = () => {
	const [value, setValue] = useState('')
	const navigate = useNavigate()

	const SubmitHandler = e => {
		e.preventDefault()
		console.log(value)
		if (value) navigate(`/search/${value}`)
		setValue('')
	}

	return (
		<Paper
			component={'form'}
			sx={{ border: `1px solid ${colors.secondary}`, pl: 2, boxShadow: 'none' }}
			onSubmit={SubmitHandler}
		>
			<input
				type='text'
				placeholder='Search....'
				className='search-bar'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<IconButton type='submit'>
				<Search />
			</IconButton>
		</Paper>
	)
}

export default SearchBar
