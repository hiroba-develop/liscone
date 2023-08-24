import { Card } from "@mui/material";
import ActionListsTable from "./ActionListsTable";

function ActionLists(props) {
  return (
    <Card>
      <ActionListsTable
        actionLists={props.actionLists}
        searchCorporationName={props.searchCorporationName}
        searchSalesListName={props.searchSalesListName}
        searchStaffName={props.searchStaffName}
        searchMemberName={props.searchMemberName}
        searchExecuteBigResult={props.searchExecuteBigResult}
        searchExecuteSmallResult={props.searchExecuteSmallResult}
        searchFromDate={props.searchFromDate}
        searchToDate={props.searchToDate}
      />
    </Card>
  );
}

export default ActionLists;
