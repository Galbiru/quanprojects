'use client';
import { login } from './actions';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <>
      {error && <p style={{color:'red'}}>Incorrect Password</p>}
      <form action={login} style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'20px'}}>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          style={{padding:'10px',borderRadius:'5px',border:'1px solid #ccc',color:'black'}}
          required
        />
        <button type="submit" style={{padding:'10px',borderRadius:'5px',border:'none',background:'white',color:'black',cursor:'pointer',fontWeight:'bold'}}>Enter</button>
      </form>
    </>
  );
}

export default function Home() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
      <h1>Quantitative Project</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}