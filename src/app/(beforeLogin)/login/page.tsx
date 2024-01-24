import Main from '@/app/(beforeLogin)/_component/Main';
import RedirectToLogin from './_component/RedirectToLogin';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) {
        redirect('/home');
    }

    return (
        <>
            <RedirectToLogin />
            <Main />
        </>
    );
}
