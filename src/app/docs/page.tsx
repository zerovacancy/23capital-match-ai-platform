import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/api/docs');
  }, [router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column' 
    }}>
      <h1>Redirecting to API Documentation...</h1>
      <p>If you are not redirected automatically, <a href="/api/docs">click here</a>.</p>
    </div>
  );
}