import { Timestamp } from "@angular/fire/firestore"
import dayjs from "dayjs/esm"

export const timestampFromDate = (date: string): Timestamp => {
    return Timestamp.fromDate(dayjs(date).toDate())
}