import React from 'react'
import notFoundImage from '../../public/images/error-page.webp'
import Image from 'next/image';
import Link from 'next/link';

const notFound = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-white'>
            <Image src={notFoundImage} alt="Not Found" height={400} width={400} />
            <h2 className='text-2xl font-bold text-boxdark'>Sorry, the page can’t be found</h2>
            <p>The page you were looking for appears to have been moved, deleted or does not exist.</p>
            <div className='my-4 flex justify-center'>
                <Link className="bg-primary rounded-md text-white p-2" href="/"> <i className="pi pi-arrow-left"></i> Back to Home </Link>
            </div>
        </div>
    )
}

export default notFound;