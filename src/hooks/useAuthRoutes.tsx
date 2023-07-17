import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes = (props: AuthRoutesProps) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    logoutCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logoutCheck = async () => {
    if (auth.userId === "") {
      sessionStorage.clear();
      navigate(`${NavigatePath.LOGIN}`);
    }
  };

  return <>{children}</>;
};

export default AuthRoutes;
