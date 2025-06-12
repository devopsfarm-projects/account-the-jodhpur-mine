"use client"
import { useEffect } from 'react';

export default function ClientBootstrap() {
  useEffect(() => {
    // Import Bootstrap JS only on client-side
    try {
      import('bootstrap/dist/js/bootstrap.bundle.min').then(() => {
        console.log('Bootstrap JS loaded successfully');
      });
    } catch (error) {
      console.error('Error loading Bootstrap JS:', error);
    }
  }, []);

  return null;
}
