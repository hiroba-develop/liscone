import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import Index from "./index";

const Import = ({ importPopOpen, setImportPopOpen, sheetDatas }) => {
  // インポートデータ取得
  const customKeys = [
    "corporateNumber",
    "corporationName",
    "zipCode",
    "address",
    "representativePhoneNumber",
    "representativeName",
    "homePage",
    "salesAmount",
    "employeeNumber",
    "establishmentYear",
    "capitalStock",
    "other",
    "No",
  ];
  const sheetDataObjects = sheetDatas.map((row, index) => {
    const obj = {};
    // customKeysの各要素をキーとしてオブジェクトに追加
    for (let i = 0; i < customKeys.length; i++) {
      const key = customKeys[i];
      if (key === "No") {
        obj[key] = index;
      } else {
        obj[key] = row[i];
      }
    }

    return obj;
  });

  sheetDataObjects.splice(0, 1);
  const filteredSheetDataObjects = sheetDataObjects.filter((dataObject) => {
    return dataObject.corporationName !== undefined;
  });

  const [importData, setImportData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // フィルター後のデータを処理
      for (const dataObject of filteredSheetDataObjects) {
        try {
          const responseImports = await axios.get(
            `${config().apiUrl}/corporations/searchImport`,
            {
              params: {
                corporateNumber: dataObject.corporateNumber,
                homePage: dataObject.homePage,
                corporationName: dataObject.corporationName,
              },
            }
          );

          if (responseImports.statusText === "OK") {
            dataObject.corporateDatas = responseImports.data;
            if (
              dataObject.capitalStock !== undefined &&
              dataObject.capitalStock !== ""
            ) {
              dataObject.capitalStock = parseInt(dataObject.capitalStock);
            }
            if (
              dataObject.employeeNumber !== undefined &&
              dataObject.employeeNumber !== ""
            ) {
              dataObject.employeeNumber = parseInt(dataObject.employeeNumber);
            }
            if (
              dataObject.establishmentYear !== undefined &&
              dataObject.establishmentYear !== ""
            ) {
              dataObject.establishmentYear = parseInt(
                dataObject.establishmentYear
              );
            }
            if (
              dataObject.salesAmount !== undefined &&
              dataObject.salesAmount !== ""
            ) {
              dataObject.salesAmount = parseInt(dataObject.salesAmount);
            }
            console.log(dataObject);

            if (
              Number.isNaN(dataObject.capitalStock) ||
              Number.isNaN(dataObject.employeeNumber) ||
              Number.isNaN(dataObject.establishmentYear) ||
              Number.isNaN(dataObject.salesAmount)
            ) {
              alert("売上、従業員数、設立、資本金は数字のみ入力可能です。");
              return null;
            }
          }
        } catch (error) {
          commonErrorCallback(error);
        }
      }

      setImportData(filteredSheetDataObjects);
    };

    fetchData();
  }, [sheetDatas]);

  return (
    <Index
      importPopOpen={importPopOpen}
      setImportPopOpen={setImportPopOpen}
      importSourceData={importData}
    ></Index>
  );
};

export default Import;
