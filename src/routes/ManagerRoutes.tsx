import { Route, Routes } from 'react-router'
import { AppLayout } from '../components/layouts/AppLayout'
import { Dashboard } from '../pages/Dashboard'
import { NotFound } from '../pages/NotFound'
import { Refund } from '../pages/Refund'

export function ManagerRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/admin" element={<Dashboard />} />
				<Route path="/admin/refund/:id" element={<Refund />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}
