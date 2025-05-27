import { BrowserRouter } from 'react-router'
import { AuthRoutes } from './AuthRoutes'

export function Router() {
	return (
		<BrowserRouter>
			<AuthRoutes />
		</BrowserRouter>
	)
}
