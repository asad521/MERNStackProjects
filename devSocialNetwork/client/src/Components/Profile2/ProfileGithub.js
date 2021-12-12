import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({username,getGithubRepos ,repos}) => {
    useEffect(() => {
        getGithubRepos(username);
    },[getGithubRepos])

    return (
        <div className='profile-github'>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {repos === null ? 'Spinner' :(
                repos.map(repo => 
                    (<div className='repo bg-white p-1 my-1'>
                        <div>
                            <h2>
                                <a href={repo.html_url} target='_blank'>{repo.name}d</a>
                            </h2>
                            <p>{repo.discription}</p>
                        </div>
                        <ul>
                            <li className='badge badge-primary'>Stars:{repos.watchers}</li>
                            <li className='badge badge-dark'>Forks:{repos.forks}</li>
                            <li className='badge badge-light'>Issues:{repos.forks_count}</li>
                        </ul>
                    </div>)
                )
            )}
            
        </div>
    )
}

ProfileGithub.propTypes = {

}

const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
