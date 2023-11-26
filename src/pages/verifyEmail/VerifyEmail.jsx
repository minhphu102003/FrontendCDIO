import React, {useContext, useEffect, useState} from 'react';
import {toast} from "react-toastify";
import * as authService from "../../services/auth"
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../context/authProvider";

const VerifyEmail = () => {
    const [numberOne, setNumberOne] = useState("")
    const [numberTwo, setNumberTwo] = useState("")
    const [numberThree, setNumberThree] = useState("")
    const [numberFour, setNumberFour] = useState("")
    const [numberFive, setNumberFive] = useState("")
    const [numberSix, setNumberSix] = useState("")
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("email@gmail.com")
    const [user, setUser] = useState({})
    const {setAuth} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
        return toastType(message);
    }

    useEffect(() => {
        const userLocal = localStorage.getItem("register")
        if (userLocal != null) {
            const userParse = JSON.parse(userLocal)
            setUser(userParse)
            setEmail(userParse.email)
        } else {
            notify("Bạn cần phải đăng ký trước!", "error")
        }

        if (location.state?.toastMessage !== '') {
            toast.update(location.state?.id, {
                render: location.state?.toastMessage,
                type: location.state?.statusMessage,
                isLoading: false,
                autoClose: true
            });
            navigate(location.pathname, {replace: true, state: {}});
        }

    }, []);


    const validationOTP = () => {
        if (numberOne === "" || numberTwo === "" || numberThree === "" || numberFour === "" || numberFive === "" || numberSix === "")
            notify("OTP phải đủ 6 số!", "error");

    }

    const handleResendOTP = async (e) => {
        e.preventDefault();
        const {name, email, password, province, district, ward, address} = user
        const id = toast.loading("Please wait...")
        // fetch register
        const registerResponse = await authService.register(name, email, password, province, district, ward, address)
        // check output and display error if has error
        if (registerResponse?.status === 200) {
            toast.update(id, {
                render: "Gửi OTP thành công!",
                type: "success",
                isLoading: false,
                autoClose: true
            });
            localStorage.removeItem("register")
        } else {
            toast.update(id, {
                render: "Gửi OTP thất bại!",
                type: "error",
                isLoading: false,
                autoClose: true
            });
        }

    }
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        validationOTP()
        const {name, email, password, province, district, ward, address} = user
        const otpString = numberOne + numberTwo + numberThree + numberFour + numberFive + numberSix
        // fetch register
        const registerResponse = await authService.verifyEmail(name, email, password, province, district, ward, address, otpString)
        console.log({name, email, password, province, district, ward, address, otpString})
        // check output and display error if has error
        if (registerResponse?.status === 201) {
            setAuth({name, email, password, province, district, ward, address})
            localStorage.setItem('auth', JSON.stringify({name, email, password, province, district, ward, address}));
            localStorage.removeItem("register")
            navigate('/login', {state: {toastMessage: "Đăng Ký Thành Công!", statusMessage: "success"}});
        } else {
            if (registerResponse?.response?.status === 400) {
                console.log(registerResponse?.response)
                notify("OTP đã hết hạn hoặc không chính xác!", "error")
            } else {
                console.log(registerResponse?.response)
                notify("Xác nhận thất bại!", "error")
            }
        }
    }


    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Xác thực OTP</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>Chúng tôi sẽ gửi mã xác nhận đến mail của bạn {email}</p>
                        </div>
                    </div>

                    <div>
                        <form action="" onSubmit={(e) => handleVerifyEmail(e)}>
                            <div className="flex flex-col space-y-5">
                                <div className="flex flex-row items-center justify-between mx-auto w-full">
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberOne}
                                            onChange={(e) => setNumberOne(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberTwo}
                                            onChange={(e) => setNumberTwo(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberThree}
                                            onChange={(e) => setNumberThree(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberFour}
                                            onChange={(e) => setNumberFour(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberFive}
                                            onChange={(e) => setNumberFive(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            value={numberSix}
                                            onChange={(e) => setNumberSix(e.target.value)}
                                            maxLength={1}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button

                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-lg shadow-sm font-bold">
                                            Xác nhận
                                        </button>
                                    </div>

                                    <div
                                        className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Không nhận được mã code?</p> <p
                                        className="flex flex-row items-center text-blue-600 hover:cursor-pointer"
                                        onClick={(e) => handleResendOTP(e)}>Gửi lại</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail