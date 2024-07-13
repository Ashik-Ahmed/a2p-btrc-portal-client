import Image from 'next/image';
import profilePic from '../../../public/images/user.png'; // replace with your actual profile image
import { FaCheck, FaLanguage, FaLocationDot, FaPhone, FaRegStar, FaRegUser, FaUserPen } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { auth } from '@/auth';



export default async function ProfilePage() {

    const session = await auth();
    const user = await fetch(`http://localhost:5000/api/v1/user/${session?.user?._id}`).then(res => res.json());
    console.log("user: ", user?.data);

    return (
        <div>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="relative flex items-center h-48 bg-gradient-to-r from-teal-300 via-pink-300 to-yellow-300 rounded-t-md">
                    <div className="md:flex items-center absolute top-36 w-full bg-white h-24 rounded-b-md border-white shadow-lg">
                        <div className='flex justify-center items-center mx-auto md:mx-0 md:ml-6 -mt-18 w-30 h-30 border-4 border-white rounded-md bg-white'>
                            <Image src={user?.data?.photo || profilePic} width={100} height={100} alt="Profile Picture" className="rounded w-28 h-28" />
                        </div>
                        <div className='mt-2 md:-mt-12 md:ml-6'>
                            <h3 className='text-2xl font-semibold text-gray-600 text-center'>{user?.data?.name}</h3>
                        </div>
                    </div>
                </div>



                <div className="flex items-center justify-start gap-x-2 w-full mt-16">
                    <button className="flex items-center gap-x-2 bg-primary/90 hover:bg-primary text-white text-sm py-1 px-1.5 rounded ">
                        <FaUserPen size={18} />
                        Edit Profile</button>
                    <button className="flex items-center gap-x-2 bg-primary/90 hover:bg-primary text-white text-sm py-1 px-1.5 rounded">
                        <RiLockPasswordLine size={18} />
                        Update Password</button>
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

            </div>
        </div>
    );
}
