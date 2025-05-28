import { Route, Routes } from 'react-router'
import { AppLayout } from '../components/layouts/AppLayout'
import { Confirm } from '../pages/Confirm'
import { NotFound } from '../pages/NotFound'
import { Refund } from '../pages/Refund'

export function EmployeeRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/" element={<Refund />} />
				<Route path="/confirm" element={<Confirm />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}
