import { useContext } from "react";

import { Box, Button, List, ListItem, styled } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "src/contexts/SidebarContext";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { config } from "src/utility/config/AppConfig";
import axios from "axios";
import { useEffect, useState } from "react";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: #66788A;
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: #66788A;
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: #66788A;
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: #66788A;
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: #66788A;
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: #F6F6FA;
            color: #66788A;

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: #66788A;
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  const [companyList, setCompanyList] = useState<number>(0);
  const authUser = useRecoilValue(authAtom);
  useEffect(() => {
    const getCompanyList = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/company/byCompanycode`,
          {
            params: {
              companyCode: authUser.coId,
            },
          }
        );
        if (response.statusText === "OK") {
          setCompanyList(response.data[0].form_status);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    getCompanyList();
  }, [authUser.userId]);

  const display = companyList == 1 ? true:false;

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/task"
                  startIcon={
                    <img src="/static/images/dashboard.svg" alt="dashboard" />
                  }
                >
                  ダッシュボード
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/corporation"
                  startIcon={
                    <img
                      src="/static/images/corporationList.svg"
                      alt="corporationList"
                    />
                  }
                >
                  企業リスト作成
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/staff"
                  startIcon={
                    <img src="/static/images/staffList.svg" alt="staffList" />
                  }
                >
                  担当者リスト作成
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/salesTask"
                  startIcon={
                    <img src="/static/images/salesList.svg" alt="salesList" />
                  }
                >
                  リスト一覧
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/reports"
                  startIcon={
                    <img src="/static/images/report.svg" alt="report" />
                  }
                >
                  レポート
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/action"
                  startIcon={
                    <img src="/static/images/actionLog.svg" alt="actionLog" />
                  }
                >
                  行動ログ
                </Button>
              </ListItem>
              {display && (
                <>
                  <ListItem component="div">
                    <Button
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/autoFormSend"
                      startIcon={
                        <img
                          src="/static/images/autoFormSend.svg"
                          alt="autoFormSend"
                        />
                      }
                    >
                      自動フォーム送信
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/autoFormSendLog"
                      startIcon={
                        <img
                          src="/static/images/autoFormSendLog.svg"
                          alt="autoFormSendLog"
                        />
                      }
                    >
                      自動フォーム送信履歴
                    </Button>
                  </ListItem>
                </>
              )}
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
