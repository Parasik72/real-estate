import { connect } from "react-redux";
import { AuthUserState } from "../store/auth-user/auth-user.reducer";
import { RootState } from "../store/root.reducer";
import { useRouter } from "next/router";
import { FRONT_PATHS } from "../constants/front-paths.constants";

interface IState extends Object {
    authUser: AuthUserState;
}

export const withAuth = (Component: any) => {
    const mapStateToProps = (rootState: RootState): IState => {
        return {
            authUser: rootState.authUser
        }
    }
    function Auth(props: any) {
        const router = useRouter();
        if (!props.authUser.isReady) {
          return <div>Loading...</div>;
        }
        if (props.authUser.isReady && !props.authUser.isAuth) {
            router.push(FRONT_PATHS.home);
            return <></>;
        }
        return <Component {...props} />;
    };
  
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return connect(mapStateToProps, null)(Auth);
}