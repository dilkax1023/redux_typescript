import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
export const PackageList: React.FC = () => {
	const [term, setTerm] = useState('');
	const { searchRepositories } = useActions();
	const { loading, data, error } = useTypedSelector((state) => state.repositories);

	// input change handler for setting term state
	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setTerm(event.target.value);
	};

	// form submit handler for sending api request
	const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		searchRepositories(term);
	};

	return (
		<div style={{ margin: '0 2rem 0' }}>
			<p>Find your package here</p>
			<form onSubmit={onSubmitSearch}>
				<input type='text' onChange={onChangeHandler} />
				<button type='submit'>Search</button>
			</form>
			{loading && <p>Loading...</p>}
			{error && <p>error</p>}
			{data.map((name: string) => (
				<h1 key={name}>{name}</h1>
			))}
		</div>
	);
};
