import { BrowserRouter } from 'react-router'
import { EmployeeRoutes } from './EmployeeRoutes'

export function Router() {
	return (
		<BrowserRouter>
			{/* <AuthRoutes /> */}
			<EmployeeRoutes />
		</BrowserRouter>
	)
}
