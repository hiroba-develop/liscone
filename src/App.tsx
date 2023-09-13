import { useRoutes } from "react-router-dom";
import router from "src/router";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";
import ThemeProvider from "./theme/ThemeProvider";
import { QueryClientProvider } from "./utility/provider/query-client/QueryClientProvider";
import AuthRoutes from "./hooks/useAuthRoutes";
import { Helmet } from "react-helmet";

function App() {
  const content = useRoutes(router);

  return (
    <div>
      <RecoilRoot>
        <QueryClientProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AuthRoutes>
                <CssBaseline />
                {content}
              </AuthRoutes>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
      <Helmet>
        <meta name="description" content="LisConne説明文" />
      </Helmet>
    </div>
  );
}
export default App;
