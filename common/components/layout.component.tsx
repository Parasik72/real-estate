import React, { useEffect } from "react"
import Navbar from "./navbar.component";
import { Footer } from "./footer.component";
import { AuthUserEffectActions } from "../services/auth-user/auth-user.service";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import ToastifyContainer from "./toastify/toastify-container.component";

interface IProps {
  children?: React.ReactNode;
}

interface IDispatch {
  getAuthUser: () => {
    type: AuthUserEffectActions.GET_AUTH_USER;
  };
}
 
const mapDispatchToProps = (dispatch: Dispatch<Action<AuthUserEffectActions>>): IDispatch => {
  return {
    getAuthUser: () => dispatch({ type: AuthUserEffectActions.GET_AUTH_USER }),
  }
}

function Layout({ children, getAuthUser }: IProps & IDispatch) {
  useEffect(() => {
    getAuthUser();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <ToastifyContainer />
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Layout);