"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import profilePic from '../../../../public/images/user.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCheck, FaLanguage, FaLocationDot, FaPhone, FaRegStar, FaRegUser, FaUserPen } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';

const Profile = ({ user }) => {
    console.log("user: ", user);
    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();


    const [updatePasswordDialog, setUpdatePasswordDialog] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordChangeError, setPasswordChangeError] = useState(null);

    const handleUpdatePassword = (data) => {
        console.log("Update Password data: ", data);
        setPasswordChangeError(null);

        if (data.newPassword !== data.confirmPassword) {
            setPasswordChangeError("New Passwords didn't match");
            return;
        }

        if (data?.newPassword?.length < 8) {
            setPasswordChangeError("Password must be at least 8 characters long");
            return;
        }

        fetch(`http://localhost:5000/api/v1/user/updatePassword/${user?.data?.user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.status === "Success") {

                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                    setUpdatePasswordDialog(false);
                    reset();
                } else {
                    setPasswordChangeError(data?.message);
                }
            })
            .catch(err => {
                setPasswordChangeError(err?.message);
            })
    }


    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="relative flex items-center h-48 bg-gradient-to-r from-teal-300 via-pink-300 to-yellow-300 rounded-t-md">
                <div className="md:flex items-center absolute top-36 w-full bg-white h-24 rounded-b-md border-white shadow-lg">
                    <div className='flex justify-center items-center mx-auto md:mx-0 md:ml-6 -mt-18 w-30 h-30 border-4 border-white rounded-md bg-white'>
                        <Image src={user?.data?.photo ? user?.data?.photo : profilePic} width={100} height={100} alt="Profile Picture" className="rounded w-28 h-28" />
                    </div>
                    <div className='mt-2 md:-mt-12 md:ml-6'>
                        <h3 className='text-2xl font-semibold text-gray-600 text-center'>{user?.data?.name}</h3>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-start gap-x-2 w-full mt-16">
                <button className="flex items-center gap-x-2 bg-primary/90 hover:bg-primary text-white text-sm py-1 px-1.5 rounded ">
                    <FaUserPen size={18} />
                    Edit Profile
                </button>
                <button onClick={() => setUpdatePasswordDialog(true)} className="flex items-center gap-x-2 bg-primary/90 hover:bg-primary text-white text-sm py-1 px-1.5 rounded">
                    <RiLockPasswordLine size={18} />
                    Update Password
                </button>
            </div>

            {/* Main Content */}

            <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
                {/* Profile Info */}
                <div className="w-full md:w-1/3 bg-white p-4 rounded-md shadow-lg">
                    <div className="rounded-lg">
                        <h3 className="text-lg font-light text-gray-400">ABOUT</h3>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaRegUser size={18} />
                            <p className='font-semibold'>Full Name:</p>
                            <p> {user?.data?.name}</p>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaCheck size={18} />
                            <p className='font-semibold'>Status:</p>
                            <p> {user?.data?.status}</p>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaRegStar size={18} />
                            <p className='font-semibold'>Role:</p>
                            <p> {user?.data?.role}</p>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaLanguage size={18} />
                            <p className='font-semibold'>Language:</p>
                            <p> {user?.data?.language || "Bengali, English"}</p>
                        </div>

                        <h3 className="text-lg font-light text-gray-400 mt-8">CONTACT</h3>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaPhone size={18} />
                            <p className='font-semibold'>Phone:</p>
                            <p> {user?.data?.phone}</p>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <MdOutlineEmail size={20} />
                            <p className='font-semibold'>Email:</p>
                            <p> {user?.data?.email}</p>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-gray-600">
                            <FaLocationDot size={18} />
                            <p className='font-semibold'>Address:</p>
                            <p> {user?.data?.address}</p>
                        </div>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="w-full md:w-2/3 mt-6 md:mt-0 bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-light text-gray-400">BIO</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae modi officia, consequuntur animi similique repellendus. Quam, magnam animi. Magnam quisquam molestiae laborum autem! Ullam ex optio inventore fuga expedita.
                        Maxime alias fugit recusandae consectetur eius nemo enim minima aspernatur necessitatibus rerum? Voluptas reiciendis eaque labore facere suscipit sapiente rerum maxime porro quaerat! Consequatur, ea sit eum facilis eaque dolore.</p>
                </div>
            </div>
            <Dialog header="Update Password" visible={updatePasswordDialog} onHide={() => { if (!updatePasswordDialog) return; setUpdatePasswordDialog(false); setPasswordChangeError(null); setShowCurrentPassword(false); setShowNewPassword(false); setShowConfirmPassword(false); reset() }}
                style={{ width: '50vw', margin: '1rem' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                {
                    passwordChangeError &&
                    <div className='mb-2 text-center'>
                        <p className='text-white bg-red'>{passwordChangeError}</p>
                    </div>
                }
                <form onSubmit={handleSubmit(handleUpdatePassword)}>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('currentPassword', { required: "Current password is required" })}
                                id='currentPassword'
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Enter Current password"
                                className={`${errors.currentPassword && 'border-red'} w-full rounded border border-stroke bg-transparent py-1.5 pl-4 pr-8 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`} />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-2 top-2 focus:outline-none"
                            >
                                {showCurrentPassword ? (
                                    <FaEyeSlash className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <FaEye className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                            {errors.currentPassword && <span className='text-red text-xs' role="alert">{errors.currentPassword.message}</span>}
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('newPassword', { required: "New password is required" })}
                                id='newPassword'
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className={`${errors.newPassword && 'border-red'} w-full rounded border border-stroke bg-transparent py-1.5 pl-4 pr-8 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2 top-2 focus:outline-none"
                            >
                                {showNewPassword ? (
                                    <FaEyeSlash className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <FaEye className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && <span className='text-red text-xs' role="alert">{errors.newPassword.message}</span>}
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('confirmPassword', { required: "Confirm new password is required" })}
                                id='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                className={`${errors.confirmPassword && 'border-red'} w-full rounded border border-stroke bg-transparent py-1.5 pl-4 pr-8 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 focus:outline-none"
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <FaEye className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                            {errors.confirmPassword && <span className='text-red text-xs' role="alert">{errors.confirmPassword.message}</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default Profile