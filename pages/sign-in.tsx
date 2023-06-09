import Login from '../components/Login'
import { useEffect } from 'react';
import { state as authState } from '../services/auth';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { push } = useRouter();
  useEffect(() => {
    if (authState.value.profile) {
      push('/');
    }
  }, []);

  return  <Login/>
}
