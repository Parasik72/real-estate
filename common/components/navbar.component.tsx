import Link from "next/link"
import { LogoIcon } from "../icons/logo.icon"
import { HamburgerIcon } from "../icons/hamburder.icon"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { CrossIcon } from "../icons/cross.icon"
import { useRouter } from "next/router"
import { RootState } from "../store/root.reducer"
import { Action, Dispatch } from "redux"
import { connect } from "react-redux"
import { FRONT_PATHS } from "../constants/front-paths.constants"
import { AuthUserEffectActions } from "../services/auth-user/auth-user.service"
import { AuthUser } from "../types/auth.types"

interface IState {
  authUser: AuthUser;
}

function mapStateToProps(state: RootState): IState {
  return { authUser: state.authUser };
}

interface IDispatch {
  getAuthUser: () => {
    type: AuthUserEffectActions.GET_AUTH_USER;
  };
  logout: () => {
    type: AuthUserEffectActions.LOG_OUT;
  }
}
 
const mapDispatchToProps = (dispatch: Dispatch<Action<AuthUserEffectActions>>): IDispatch => {
  return {
    getAuthUser: () => dispatch({ type: AuthUserEffectActions.GET_AUTH_USER }),
    logout: () => dispatch({ type: AuthUserEffectActions.LOG_OUT })
  }
}

const Navbar = ({ getAuthUser, logout, authUser }: IState & IDispatch) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [router.pathname]);

    useEffect(() => {
        getAuthUser();
    }, []);

    const onLogout = () => {
        logout();
        router.push(FRONT_PATHS.home);
    }

    return (
        <header className="bg-gray-100 shadow-lg lg:shadow-transparent lg:bg-transparent">
            <div className="px-4 py-8 md:max-w-3xl md:mx-auto lg:max-w-none xl:px-0 xl:max-w-6xl flex justify-between items-center">
                <div className="lg:flex w-full">
                    <div className="w-full lg:w-auto flex justify-between items-center">
                        <Link href="/">
                            <LogoIcon className="fill-current text-dark-blue" />
                        </Link>
                        <button onClick={toggleMenu} className="lg:hidden">
                            {isMenuOpen ? <CrossIcon /> : <HamburgerIcon />}
                        </button>
                    </div>
                    <nav className={clsx("mt-4 pt-4 w-full border-t border-gray-500 lg:mt-0 lg:pt-0 lg:border-none lg:flex justify-between", {
                        'flex': isMenuOpen,
                        'hidden': !isMenuOpen
                    })}>
                        <div className="flex flex-col md:flex-row md:items-center gap-5 lg:ml-12">
                            <Link href="/topoffers" className="text-gray-800">Last offers</Link>
                            <Link href="/offers" className="text-gray-800">Search in offers</Link>
                            <Link href="/topoffers" className="text-gray-800">About us</Link>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            {authUser.isAuth ? (
                                <>
                                    <Link href={FRONT_PATHS.profileById.replace(':userId', authUser.userId!)} className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold">Profile</Link>
                                    <button onClick={onLogout} className="px-6 py-2 text-white bg-red-900 rounded-md font-bold">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/sign-in" className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold">Sign In</Link>
                                    <Link href="/sign-up" className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);