import * as yup from "yup"
import dayjs from "dayjs"
import { ServiceType } from "./models"

export const serviceLogSchema = yup.object({
  providerId: yup.string().required(),
  serviceOrder: yup.string().required(),
  carId: yup.string().required(),
  odometer: yup.number().required().min(0),
  engineHours: yup.number().required().min(0),
  startDate: yup.string().required(),
  endDate: yup
    .string()
    .required()
    .test("is-after", "End date must be after start date", function (value) {
      const { startDate } = this.parent
      return dayjs(value).isAfter(dayjs(startDate))
    }),
  type: yup.mixed<ServiceType>().oneOf(["planned", "unplanned", "emergency"]),
  serviceDescription: yup.string().required(),
})
