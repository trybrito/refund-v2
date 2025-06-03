import { type ReactNode, createContext, useEffect, useState } from 'react'

type AuthContext = {
	isLoading: boolean
	session: null | UserAPIResponse
	saveSessionData: (data: UserAPIResponse) => void
	removeSessionData: () => void
}

const LOCAL_STORAGE_KEY_PREFIX = '@refund'

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<null | UserAPIResponse>(null)
	const [isLoading, setIsLoading] = useState(true)

	function saveSessionData(data: UserAPIResponse) {
		localStorage.setItem(
			`${LOCAL_STORAGE_KEY_PREFIX}:user`,
			JSON.stringify(data.user),
		)
		localStorage.setItem(
			`${LOCAL_STORAGE_KEY_PREFIX}:token`,
			JSON.stringify(data.token),
		)

		setSession(data)
	}

	function loadSessionData() {
		const user = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}:user`)
		const token = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}:token`)

		if (user && token) {
			setSession({
				user: JSON.parse(user),
				token,
			})
		}

		setIsLoading(false)
	}

	function removeSessionData() {
		setSession(null)

		localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}:user`)
		localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}:token`)

		window.location.assign('/')
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadSessionData()
	}, [])

	return (
		<AuthContext.Provider
			value={{ session, saveSessionData, removeSessionData, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	)
}
