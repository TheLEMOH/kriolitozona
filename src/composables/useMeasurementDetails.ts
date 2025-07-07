import MeasurementDetailsDTO from "../models/measurementDetails"
import { Ref } from "vue"

export default function useMeasurementDetails(item: Ref<MeasurementDetailsDTO[]>) {

    const addDetails = () => {
        item.value.push({})
    }

    const deleteDetails = (index: number) => {
        item.value.splice(index, 1)
    }

    return { addDetails, deleteDetails }
}