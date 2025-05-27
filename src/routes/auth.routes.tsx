import { Route, Routes } from 'react-router'

import { AuthLayout } from '../components/layouts/AuthLayout'
import { SignIn } from '../pages/SignIn'

export function AuthRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route path="/" element={<SignIn />} />
			</Route>
		</Routes>
	)
}
