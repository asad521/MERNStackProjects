import React,{useState, useContext, useEffect} from "react";
import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alert/AlertContext";

export const Login = (props) => {
    const AlertContext = useContext(alertContext)
    const AuthContext = useContext(authContext)
    const {setAlert} = AlertContext;
    const {loginUser, error , clearErrors, isAuthenticated} = AuthContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error ==='Invalid Credentials') {
            setAlert(error,'danger');
            clearErrors();
        }
    },[error,isAuthenticated,props.history])

    const [user, setUser] = useState({
        email:'',
        password:'',
    });

    const {email,password} =user;

    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password===''){
            setAlert('Please fill in the all fields', 'danger')
        } else {
            loginUser({
                email,
                password,
            })
        }
    }
    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form  onSubmit={onSubmit}>
                <div className="form-group" >
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value='Login' className="btn btn-primary btn-dark" />
            </form>
        </div>
    )
}

export default Login;