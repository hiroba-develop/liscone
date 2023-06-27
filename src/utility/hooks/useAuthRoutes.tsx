import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { NavigatePath } from "../constants/NavigatePath";
import { authAtom } from "../recoil/auth/Auth.atom";

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes = (props: AuthRoutesProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    logoutCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logoutCheck = async () => {
    if (auth.userId === "") {
      localStorage.clear();
      navigate(`${NavigatePath.LOGIN}`);
    }
  };
  return <>{pathname}</>;
};

export default AuthRoutes;
