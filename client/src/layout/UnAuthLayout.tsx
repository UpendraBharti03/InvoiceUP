import {useMemo, ReactNode} from 'react';
import { healthCheckRequest } from '@/services/healthCheckService';

export const UnAuthLayout = ({children}: {children: ReactNode}) => {
    
    // calling health check route to wake server if its down
    const healthCheckResponse = useMemo(() => {
        healthCheckRequest();
    }, [])
    return <>{children}</>
}