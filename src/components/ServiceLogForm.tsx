import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceLogSchema } from "../utils/validation";
import { ServiceLog, ServiceLogFormValues } from "../utils/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
    setDraft,
    setSaving,
    setSaved,
    deleteDraft,
    clearAllDrafts,
} from "../store/draftsSlice";
import { addLog } from "../store/serviceLogsSlice";
import { v4 as uuid } from "uuid";
import { useWatch } from "react-hook-form";

export default function ServiceLogForm() {
    const dispatch = useDispatch();
    const { draft, saving, saved } = useSelector(
        (state: RootState) => state.drafts
    );

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ServiceLogFormValues>({
        resolver: yupResolver(serviceLogSchema),
        mode: "onSubmit",
        defaultValues: draft ?? {
            providerId: "",
            serviceOrder: "",
            carId: "",
            odometer: 0,
            engineHours: 0,
            startDate: dayjs().format("YYYY-MM-DD"),
            endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
            type: "planned",
            serviceDescription: "",
        },
    });

    const values = useWatch({ control });

    useEffect(() => {
        if (!values) return;

        dispatch(setSaving(true));

        const timeout = setTimeout(() => {
            dispatch(setDraft(values));
            dispatch(setSaving(false));
            dispatch(setSaved(true));
        }, 400);

        return () => clearTimeout(timeout);
    }, [values, dispatch]);

    useEffect(() => {
        if (values.startDate) {
            setValue(
                "endDate",
                dayjs(values.startDate).add(1, "day").format("YYYY-MM-DD")
            );
        }
    }, [values.startDate]);

    const onSubmit = (data: Partial<ServiceLog>) => {
        dispatch(
            addLog({
                ...(data as ServiceLog),
                id: uuid(),
                createdAt: new Date().toISOString(),
            })
        );
        dispatch(deleteDraft());
        reset();
    };

    return (
        <Box sx={{ p: 3, boxShadow: 3, mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Provider ID"
                fullWidth
                {...register("providerId")}
                error={!!errors.providerId}
                helperText={errors.providerId?.message}
            />
            <TextField
                label="Service Order"
                fullWidth
                {...register("serviceOrder")}
                error={!!errors.serviceOrder}
                helperText={errors.serviceOrder?.message}
            />
            <TextField
                label="Car ID"
                fullWidth
                {...register("carId")}
                error={!!errors.carId}
                helperText={errors.carId?.message}
            />
            <TextField
                type="number"
                label="Odometer"
                fullWidth
                {...register("odometer")}
                error={!!errors.odometer}
                helperText={errors.odometer?.message}
            />
            <TextField
                type="number"
                label="Engine Hours"
                fullWidth
                {...register("engineHours")}
                error={!!errors.engineHours}
                helperText={errors.engineHours?.message}
            />
            <TextField
                type="date"
                fullWidth
                {...register("startDate")}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
            />
            <TextField
                type="date"
                fullWidth
                {...register("endDate")}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
            />
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        label="Type"
                        fullWidth
                        error={!!errors.type}
                        helperText={errors.type?.message}
                    >
                        <MenuItem value="planned">Planned</MenuItem>
                        <MenuItem value="unplanned">Unplanned</MenuItem>
                        <MenuItem value="emergency">Emergency</MenuItem>
                    </TextField>
                )}
            />
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                {...register("serviceDescription")}
                error={!!errors.serviceDescription}
                helperText={errors.serviceDescription?.message}
            />
            {saving && <Typography>Saving...</Typography>}
            {saved && <CheckCircleIcon color="success" />}
            <Box mt={2} display="flex" gap={2}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        dispatch(setDraft(values));
                        dispatch(setSaved(true));
                    }}
                >
                    Create Draft
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => dispatch(deleteDraft())}
                >
                    Delete Draft
                </Button>
                <Button
                    color="error"
                    onClick={() => dispatch(clearAllDrafts())}
                >
                    Clear All Drafts
                </Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Create Service Log
                </Button>
            </Box>
        </Box>
    );
}
