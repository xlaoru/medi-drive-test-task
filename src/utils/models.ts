export type ServiceType = "planned" | "unplanned" | "emergency"

export interface ServiceLog {
  id: string
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number
  engineHours: number
  startDate: string
  endDate: string
  type: ServiceType
  serviceDescription: string
  createdAt: string
}

export type ServiceLogFormValues = {
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number
  engineHours: number
  startDate: string
  endDate: string
  type: "planned" | "unplanned" | "emergency"
  serviceDescription: string
}
