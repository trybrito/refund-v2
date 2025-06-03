import { AuthProvider } from './contexts/AuthContext'
import { Router } from './routes'

export function App() {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}
