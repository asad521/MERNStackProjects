import React,{Fragment} from 'react';
// import spinner from './spinner.gif';

export const Spinner = () => {
    return (
        <Fragment>
        <img src={'https://icon-library.com/icon/spinner-icon-gif-26.html.html'} 
        style={{widht:'200px', margin:'auto', display:'block'}}
        alt='loading...'></img>
        </Fragment>
    )
}
export default Spinner;