import { BrowserRouter } from 'react-router'
import { Loading } from '../components/Loading'
// import { ManagerRoutes } from './ManagerRoutes'
// import { EmployeeRoutes } from './EmployeeRoutes'
import { AuthRoutes } from './AuthRoutes'

const isLoading = true

export function Router() {
	if (isLoading) {
		return <Loading />
	}

	return (
		<BrowserRouter>
			<AuthRoutes />
			{/* <EmployeeRoutes /> */}
			{/* <ManagerRoutes /> */}
		</BrowserRouter>
	)
}
