import React from 'react';
import Repositem from './Repositem';
import PropTypes from 'prop-types';


export const Repos = ({repos}) => {
    return repos.map(repo=><Repositem repo={repo} key= {repo.id} />)
}

Repos.propTypes = {
    repos :PropTypes.array.isRequired,
}


export default Repos