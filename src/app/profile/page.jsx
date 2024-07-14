
import { auth } from '@/auth';
import Profile from '../components/Profile/Profile';



export default async function ProfilePage() {

    const session = await auth();
    const user = await fetch(`process.env.API_SERVER_URL/user/${session?.user?._id}`).then(res => res.json());
    // console.log("user: ", user?.data);

    return (
        <div>
            <Profile user={user} />
        </div>
    );
}
