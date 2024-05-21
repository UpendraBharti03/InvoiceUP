// import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { createFileRoute, redirect } from '@tanstack/react-router'
// import { useSelector } from 'react-redux';

export const Route = createFileRoute('/(app)/dashboard')({
  // beforeLoad: () => {
  //   const isAuthenticated = useSelector(selectIsAuthenticated);
  //   if (!isAuthenticated) {
  //     redirect({
  //       to: "/login",
  //     })
  //   }
  // },
  component: () => <div>Hello /(app)/dashboard!</div>
})