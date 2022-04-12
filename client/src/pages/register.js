import {useState} from "react";
import {Link} from "react-router-dom";
import {register} from "../redux/actions/authAction";
import {useDispatch} from "react-redux";

const RegisterPage = () => {
    const initialState = {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        cf_password: '',
        gender: 'male'
    }

    const [userData, setUserData] = useState(initialState)
    const {fullName, userName, email, password, cf_password, gender} = userData
    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
        console.log(userData)

    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input type="email" id="emailAddress"
                                                       className="form-control form-control-lg"
                                                value={email} name="email"
                                                onChange={handleChangeInput}/>
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>

                                        </div>

                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input type="text" id="fullName"
                                                       className="form-control form-control-lg"
                                                value={fullName} name="fullName"
                                                onChange={handleChangeInput}/>
                                                <label className="form-label" htmlFor="lastName">Full Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input type="text" id="userName"
                                                       className="form-control form-control-lg"
                                                value={userName} name="userName"
                                                onChange={handleChangeInput}/>
                                                <label className="form-label" htmlFor="firstName">User Name</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <h6 className="mb-2 pb-1">Gender: </h6>



                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="maleGender"
                                                    checked
                                                    value={gender} name="male"
                                                    onChange={handleChangeInput}
                                                />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="femaleGender"
                                                    value={gender} name="female"
                                                    onChange={handleChangeInput}
                                                />
                                                <label className="form-check-label"
                                                       htmlFor="femaleGender">Female</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input type="password" id="password"
                                                       className="form-control form-control-lg"
                                                value={password} name="password"
                                                onChange={handleChangeInput}/>
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input type="password" id="cf_password"
                                                       className="form-control form-control-lg"
                                                value={cf_password} name="cf_password"
                                                onChange={handleChangeInput}/>
                                                <label className="form-label" htmlFor="cf_password">Confirm Password</label>
                                            </div>

                                        </div>
                                    </div>



                                    <div className="mt-4 pt-2 ">
                                        <input disabled={!(email && fullName && password && gender && cf_password)} className="btn btn-dark btn-lg" type="submit" value="Register"/>
                                    </div>

                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                                        <Link to='/' className="link-danger">Login</Link>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage