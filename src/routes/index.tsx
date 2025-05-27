import { BrowserRouter } from 'react-router'
import { AuthRoutes } from './auth.routes'

export function Router() {
	return (
		<BrowserRouter>
			<AuthRoutes />
		</BrowserRouter>
	)
}
