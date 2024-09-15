import { prayerNames } from "./Functions"; // Ensure the correct path is used

interface PrayerTimeProps {
    prayerKey: string; // Changed from `key` to `prayerKey` to avoid using the reserved prop name
    time: string;
}

const PrayerTime = ({ prayerKey, time }: PrayerTimeProps) => {
    return (
        <div className=" prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
            <p className="m-0">{time}</p>
            <p className="m-0">{prayerNames[prayerKey]}</p>
        </div>
    );
};

export default PrayerTime;