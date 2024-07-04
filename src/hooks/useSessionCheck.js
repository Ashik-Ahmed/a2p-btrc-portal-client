"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useSessionCheck = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (status === 'authenticated') {
            setChecked(true);
            return;
        }

        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [router, status]);

    useEffect(() => {
        if (checked && session) {
            router.push('/');
            window.location.reload();
        }
    }, [checked, session, router]);

    return { session, status };
};

export default useSessionCheck;
