import { Route, Routes } from 'react-router'

import { AuthLayout } from '../components/layouts/AuthLayout'
import { NotFound } from '../pages/NotFound'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}
