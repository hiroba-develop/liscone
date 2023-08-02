import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { productsAtom } from "src/utility/recoil/comp/Products.atom";
import ErrorIcon from "../../icon/ErrorIcon";

const ListCreate = ({
  listCreateOpen,
  setListCreateOpen,
  checkItems,
  salesListType,
}) => {
  const navigate = useNavigate();
  const [salesListNameValue, setsalesListNameValue] = useState("");
  const saveSalesListName = (e) => {
    setsalesListNameValue(e.target.value);
  };

  const members = useRecoilValue(membersAtom);
  const [MemberSelected, setMemberSelected] = useState("");

  const handleMemberSelect = (e) => {
    setMemberSelected(e.target.value);
  };
  const products = useRecoilValue(productsAtom);
  const [ProductSelected, setProductSelected] = useState("");

  const handleProductSelect = (e) => {
    setProductSelected(e.target.value);
  };
  const [isSnackBarError, setIsTextError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isError } = useWrapMuation<any, any>(
    ["createlist"],
    async (data) => {
      const param = {
        datas: data,
        member_id: MemberSelected,
        sales_product_number: ProductSelected,
        sales_list_name: salesListNameValue,
        sales_list_type: salesListType,
      };

      return await post<any>(`${config().apiUrl}/saleslists/createlist`, param);
    },
    {
      onSuccess: (data) => {
        setListCreateOpen(false);
        navigate("/salesTask");
      },
      onError: (error) => {
        commonErrorCallback(error);
        setErrorMessage(error.response.data.message);
        setIsTextError(true);
      },
    }
  );

  const createSalesList = (e: FormEvent) => {
    e.preventDefault();
    mutate(checkItems);
  };

  if (listCreateOpen) {
    const editListCreateClose = () => {
      setListCreateOpen(false);
    };
    const editModal = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 0,
      p: 20,
      minWidth: 600,
      minHeight: 300,
      width: "auto",
    };
    const editModalTitle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      color: "white",
      bgcolor: "#66788A",
      py: 1,
      pl: 2,
      fontSize: 20,
    };

    return (
      <>
        <Modal open={listCreateOpen} onClose={editListCreateClose}>
          <Box sx={editModal}>
            {isError && (
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={isSnackBarError}
                autoHideDuration={300}
                onClose={() => setIsTextError(false)}
              >
                <Alert
                  severity="error"
                  sx={{
                    display: "flex",
                    background: "#231F20",
                    borderRadius: 4,
                    padding: "16px 24px",
                  }}
                  iconMapping={{
                    error: <ErrorIcon fontSize="inherit" />,
                  }}
                >
                  <AlertTitle>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#FFFFFF",
                      }}
                    >
                      Error
                    </Typography>
                  </AlertTitle>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#FFFFFF",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                </Alert>
              </Snackbar>
            )}
            <Typography sx={editModalTitle}>リストを作成</Typography>
            <Box
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                textAlign: "right",
                color: "white",
              }}
            >
              <IconButton onClick={editListCreateClose}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box component={"form"} onSubmit={(e) => createSalesList(e)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "3%",
                  fontSize: "20px",
                  pt: 1,
                }}
              >
                リスト名：
              </Box>
              <TextField
                value={salesListNameValue}
                onChange={saveSalesListName}
                variant="outlined"
                size="small"
                inputProps={{
                  style: {
                    width: 400,
                  },
                }}
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "25%",
                  ml: 1,
                  mt: 1,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "3%",
                  fontSize: "20px",
                  pt: 1,
                }}
              >
                ユーザー：
              </Box>
              <TextField
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "25%",
                  minWidth: "200px",
                  ml: 1,
                  mt: 1,
                }}
                id="members"
                select
                value={MemberSelected}
                style={{ width: 200, marginTop: 10 }}
                onChange={handleMemberSelect}
              >
                {members.map((option) => (
                  <MenuItem value={option.member_id}>
                    {option.member_name}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "3%",
                  fontSize: "20px",
                  pt: 1,
                }}
              >
                商材：
              </Box>
              <TextField
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "25%",
                  minWidth: "200px",
                  ml: 1,
                  mt: 1,
                }}
                id="products"
                select
                value={ProductSelected}
                style={{ width: 200, marginTop: 10 }}
                onChange={handleProductSelect}
              >
                {products.map((option) => (
                  <MenuItem value={option.product_number}>
                    {option.product_name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                disabled={
                  !(
                    ProductSelected.length > 0 &&
                    MemberSelected.length > 0 &&
                    salesListNameValue.length > 0
                  )
                }
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#109DBC",
                  position: "absolute",
                  top: "80%",
                  left: "25%",
                  ml: 1,
                  mt: 1,
                  minWidth: "300px",
                }}
              >
                リストを作成
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

export default ListCreate;
