
import { auth } from '@/auth';
import Profile from '../components/Profile/Profile';



export default async function ProfilePage() {

    const session = await auth();
    const user = await fetch(`http://localhost:5000/api/v1/user/${session?.user?._id}`).then(res => res.json());
    // console.log("user: ", user?.data);

    return (
        <div>
            <Profile user={user} />
        </div>
    );
}
