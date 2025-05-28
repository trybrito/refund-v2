import { BrowserRouter } from 'react-router'
import { ManagerRoutes } from './ManagerRoutes'

export function Router() {
	return (
		<BrowserRouter>
			{/* <AuthRoutes /> */}
			{/* <EmployeeRoutes /> */}
			<ManagerRoutes />
		</BrowserRouter>
	)
}
