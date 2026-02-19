import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { serviceLogSchema } from "../utils/validation";
import {
    ServiceLog,
    ServiceLogFormValues,
} from "../utils/models";
import { updateLog } from "../store/serviceLogsSlice";

type Props = {
    open: boolean;
    onClose: () => void;
    log: ServiceLog | null;
};

export default function EditServiceLogDialog({
    open,
    onClose,
    log,
}: Props) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
    } = useForm<ServiceLogFormValues>({
        resolver: yupResolver(serviceLogSchema),
    });

    const values = useWatch({ control });

    // Заполняем форму при открытии
    useEffect(() => {
        if (!log) return;

        const { id, createdAt, ...formValues } = log;
        reset(formValues);
    }, [log, reset]);

    // Автообновление endDate
    useEffect(() => {
        if (!values?.startDate) return;

        const nextDay = dayjs(values.startDate)
            .add(1, "day")
            .format("YYYY-MM-DD");

        if (values.endDate !== nextDay) {
            setValue("endDate", nextDay);
        }
    }, [values?.startDate, values?.endDate, setValue]);

    const onSubmit = (data: ServiceLogFormValues) => {
        if (!log) return;

        dispatch(
            updateLog({
                ...data,
                id: log.id,
                createdAt: log.createdAt,
            })
        );

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Service Log</DialogTitle>

            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField label="Provider ID" {...register("providerId")} />
                    <TextField label="Service Order" {...register("serviceOrder")} />
                    <TextField label="Car ID" {...register("carId")} />
                    <TextField type="number" label="Odometer" {...register("odometer")} />
                    <TextField type="number" label="Engine Hours" {...register("engineHours")} />
                    <TextField type="date" {...register("startDate")} />
                    <TextField type="date" {...register("endDate")} />

                    <TextField select label="Type" {...register("type")}>
                        <MenuItem value="planned">Planned</MenuItem>
                        <MenuItem value="unplanned">Unplanned</MenuItem>
                        <MenuItem value="emergency">Emergency</MenuItem>
                    </TextField>

                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        {...register("serviceDescription")}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
