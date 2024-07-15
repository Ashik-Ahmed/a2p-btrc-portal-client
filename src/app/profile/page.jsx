
import { auth } from '@/auth';
import Profile from '../components/Profile/Profile';
import ErrorPage from '../components/Error/ErrorPage';



export default async function ProfilePage() {

    const { user } = await auth();
    const userData = await fetch(`${process.env.API_SERVER_URL}/user/${user?._id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}`
            }
        }
    ).then(res => res.json());

    if (userData?.status === 'Failed') return <ErrorPage />

    return (
        <div>
            <Profile user={userData} />
        </div>
    );
}
