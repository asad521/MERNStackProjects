import React,{useState, useContext, useEffect} from "react";
import alertContext from '../../context/alert/AlertContext';
import authContext from "../../context/auth/authContext";



export const Register = (props) => {
    const AlertContext = useContext(alertContext)
    const AuthContext = useContext(authContext)
    const {setAlert} = AlertContext;
    const {registerUser, error , clearErrors, isAuthenticated} = AuthContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error ==='User already exist') {
            setAlert(error,'danger');
            clearErrors();
        }
    },[error,isAuthenticated,props.history])
    // console.log(alerts)
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2} =user;

    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log('in submit')

        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields' , 'danger');
            console.log('first condition trigger')

        }else if (password !== password2){
            setAlert('Password do not match' , 'danger');
        } else {
            registerUser({
                name,
                email,
                password
            })

        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} />
                </div>
                <input type="submit" value='Register' className="btn btn-primary btn-dark"  />
            </form>
        </div>
    )
}

export default Register;
