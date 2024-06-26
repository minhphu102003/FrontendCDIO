import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState, useContext, useEffect} from "react";
import {toast} from "react-toastify";
import * as authService from "../../services/auth"
import AuthContext from "../../context/authProvider";
import MethodContext from "../../context/methodProvider";

const Register = () => {

    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [hiddenRePassword, setHiddenRePassword] = useState(true)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const {notify, toastLoadingId, toastUpdateLoadingId} = useContext(MethodContext);

    // Set state for navigation register success
    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, location.state?.statusMessage);
            navigate(location.pathname, {replace: true, state: {}});
        }
    }, []);

    const validationPassword = (oldPass, newPass) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        // Use a regular expression to enforce password strength rules
        const isStrong = passwordRegex.test(password)
        if (!isStrong) {
            notify("Mật khẩu ít nhất 6 ký tự và bao gồm chữ in hoa, chữ thường, và số!", "error")
            return false;
        }
        if (oldPass !== newPass) {
            notify("Mật khẩu không trùng khớp, vui lòng nhập lại!", "error");
            return false;
        }
        return true;
    }

    // handle call api register
    const handleSubmit = async (e) => {
        e.preventDefault();
        // verify password before start another way
        if (!validationPassword(password, rePassword))
            return;
        const id = toastLoadingId("Đang chờ...")
        setIsLoading(true);
        // fetch register
        const registerResponse = await authService.register(name, email, password)
        console.log(registerResponse);
        // check output and display error if has error
        if (registerResponse?.status === 200) {
            localStorage.setItem('register', JSON.stringify({
                name,
                email,
                password,
            }));
            setIsLoading(false);
            navigate('/verify-email', {
                state: {
                    id: id,
                    toastMessage: "Vui lòng nhập mã OTP được gửi trên email của bạn để xác nhận!",
                    statusMessage: "success"
                }
            });
        } else {
            if (registerResponse?.response?.status === 409) {
                console.log(registerResponse?.response)
                toastUpdateLoadingId("Email đã tồn tại!", "error", id)
                setIsLoading(false);
            } else {
                console.log(registerResponse?.response)
                toastUpdateLoadingId("Đăng ký thất bại!", "error", id)
                setIsLoading(false);
            }
        }
    }


    return (
        <div className="mx-auto grid grid-cols-12">
            <div className="col-span-12  lg:col-span-7 ">
                <form action="" onSubmit={(e) => {
                    handleSubmit(e)
                }} className="pb-12 w-[90%] mx-auto pl-5 pr-5">
                    <h1 className="pt-12 text-4xl text-primaryColor font-bold text-center">Đăng Ký</h1>
                    <div className="w-[400px] h-[200px] mb-9 overflow-hidden mx-auto">
                        <Link to={"/"}>
                            <img className="w-[300px] h-full object-cover ml-12"
                                 src={require('../../assets/images/logo.png')} alt="Logo"/>
                        </Link>
                    </div>
                    <div className="block md:flex md:justify-between">
                        <div className="w-full md:w-[90%] ">
                            <div className="w-full mb-4 ml-8">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputEmail">Email</label>
                                <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                       id="inputEmail"
                                       type="email"
                                       placeholder="email@gmail.com"
                                       pattern=".+@gmail\.com"
                                       title="Vui lòng nhập đúng địa chỉ email với đuôi @gmail.com"
                                       required
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="w-full mb-4 ml-8">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputFullName">Họ Và Tên</label>
                                <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                       id="inputFullName"
                                       type="text"
                                       placeholder="Họ và tên"
                                       required
                                       value={name}
                                       onChange={(e) => setName((e.target.value))}
                                />

                            </div>
                            <div className="relative w-full mb-4 ml-8">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputPassword">Mật Khẩu</label>
                                <div className="w-full">
                                    <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                           id="inputPassword"
                                           type={hiddenPassword ? "password" : "text"}
                                           placeholder="Mật khẩu"
                                           required
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           max={15}
                                    />

                                    {
                                        hiddenPassword ?
                                            <FontAwesomeIcon onClick={() => setHiddenPassword(!hiddenPassword)}
                                                             icon={faEyeSlash}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/> :
                                            <FontAwesomeIcon onClick={() => setHiddenPassword(!hiddenPassword)}
                                                             icon={faEye}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/>
                                    }
                                </div>
                            </div>
                            <div className="relative w-full mb-4 ml-8">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputRePassword">Nhập Lại Mật Khẩu</label>
                                <div className="w-full">
                                    <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                           id="inputRePassword"
                                           type={hiddenRePassword ? "password" : "text"} placeholder="Nhập lại mật khẩu"
                                           required
                                           value={rePassword}
                                           onChange={(e) => setRePassword(e.target.value)}
                                           max={15}
                                    />

                                    {
                                        hiddenRePassword ?
                                            <FontAwesomeIcon onClick={() => setHiddenRePassword(!hiddenRePassword)}
                                                             icon={faEyeSlash}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/> :
                                            <FontAwesomeIcon onClick={() => setHiddenRePassword(!hiddenRePassword)}
                                                             icon={faEye}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-5">
                        <button
                            className=" w-full px-4 py-3 text-xl font-bold text-white bg-primaryColor rounded-2xl shadow-primaryColor hover:shadow-lg hover:opacity-90">{
                            isLoading ? "Loading..." : "Đăng Ký"
                        }
                        </button>
                    </div>
                    <div className=" mt-5 text-center">
                        <p className="">Đã Có Tài Khoản! <Link to="/login"
                                                               className=" text-primaryColor">Đăng Nhập</Link></p>
                    </div>
                </form>
            </div>
            <div className="h-full hidden lg:block  lg:col-span-5">
                <img
                    className="w-full h-full object-cover"
                    src="https://doctortrust.vn/photos/nha-thuoc-pharmacity-26qw-q9-ngu-hanh-son-da-nang-viet-nam1.jpeg"
                    alt="ảnh nhà"/>
            </div>
        </div>
    )
}

export default Register;