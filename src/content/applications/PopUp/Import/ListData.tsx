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
