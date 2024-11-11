import { Timestamp } from "@angular/fire/firestore"

export const timestampFromDate = (date: string): Timestamp => {
    return Timestamp.fromDate(new Date(date))
}