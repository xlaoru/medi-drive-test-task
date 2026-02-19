import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteLog } from "../store/serviceLogsSlice";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { ServiceLog } from "../utils/models";
import EditServiceLogDialog from "./EditServiceLogDialog";

export default function ServiceLogTable() {
    const dispatch = useDispatch();
    const logs = useSelector(
        (state: RootState) => state.serviceLogs.logs
    );

    const [selectedLog, setSelectedLog] =
        useState<ServiceLog | null>(null);

    const [open, setOpen] = useState(false);

    const handleEdit = (log: ServiceLog) => {
        setSelectedLog(log);
        setOpen(true);
    };

    const columns: GridColDef<ServiceLog>[] = [
        { field: "providerId", headerName: "Provider", flex: 1 },
        { field: "carId", headerName: "Car", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "startDate", headerName: "Start", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>

                    <Button
                        color="error"
                        onClick={() =>
                            dispatch(deleteLog(params.row.id))
                        }
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Box sx={{ height: 400 }}>
                <DataGrid rows={logs} columns={columns} />
            </Box>

            <EditServiceLogDialog
                open={open}
                onClose={() => setOpen(false)}
                log={selectedLog}
            />
        </>
    );
}
