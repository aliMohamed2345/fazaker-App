'use client';
import {
    getDateFormat,
    PrayerTimesProps,
    InputFormsProps,
    InitialInputForms,
    DateDataProps,
    InitialPrayerTimes,
    months,
    handleSubmitBtn,
    PrayerTimesInArabic,
    prayerNames
} from '../components/PrayerTimes/Functions';
import { useRef, useState, useEffect } from 'react';
import PrayerTime from '../components/PrayerTimes/PrayerTime';

const PrayerTiming = () => {
    // Hooks
    const [errorMessage, setErrorMessage] = useState('');
    const [DateData, SetDateData] = useState<DateDataProps | null>(null);
    const [prayerTimes, SetPrayerTimes] = useState<PrayerTimesProps>(InitialPrayerTimes);
    const [inputForms, SetInputForms] = useState<InputFormsProps>(InitialInputForms);

    // Refs
    const cityInput = useRef<HTMLInputElement>(null);
    const countryInput = useRef<HTMLInputElement>(null);

    // Checking if city and country values are found in local storage on mount
    useEffect(() => {
        const savedCity = localStorage.getItem('city') || '';
        const savedCountry = localStorage.getItem('country') || '';
        if (savedCity && savedCountry) {
            SetInputForms({ ...inputForms, city: savedCity, country: savedCountry });
        }
    }, []);

    // Handling the API requests
    useEffect(() => {
        if (inputForms.city && inputForms.country) {
            fetch(
                `${process.env.NEXT_PUBLIC_PRAYER_TIME_API}/${getDateFormat()}?city=${inputForms.city}&country=${inputForms.country}&method=8`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.code === 200) {
                        SetDateData(data.data.date);
                        SetPrayerTimes(data.data.timings);
                        setErrorMessage('');
                    } else {
                        setErrorMessage('من فضلك ادخل اسم الدوله والبلده بطريقه صحيحه ');
                    }
                })
                .catch(() => setErrorMessage('فشل تحميل البيانات من فضلك اعد التحميل مره اخري'));
        }
    }, [inputForms.city, inputForms.country]);

    return (
        <div className="container text-center">
            <h1 className="mt-5">مواقيت الصلاه</h1>
            <form className="d-flex mt-5 justify-content-center gap-5 flex-column">
                <div className=" d-flex gap-4 justify-content-center">
                    <label>ادخل اسم الدوله</label>
                    <input
                        ref={countryInput}
                        type="text"
                        onChange={(e) => SetInputForms({ ...inputForms, country: e.target.value })}
                        name="country"
                        value={inputForms.country || ''}
                        className="w-50 rounded-1 border-0 border-bottom border-success bg-transparent text-secondary shadow-none text-center"
                        placeholder="اسم الدوله"
                    />
                </div>
                <div className=" d-flex justify-content-center gap-4">
                    <label>ادخل اسم البلده</label>
                    <input
                        ref={cityInput}
                        type="text"
                        name="city"
                        onChange={(e) => SetInputForms({ ...inputForms, city: e.target.value })}
                        value={inputForms.city || ''}
                        className="w-50 rounded-1 border-0 border-bottom text-secondary border-success bg-transparent shadow-none text-center"
                        placeholder="اسم البلده"
                    />
                </div>
                <div className="submit-area flex-column d-flex gap-2">
                    <button
                        onClick={(e) => handleSubmitBtn(e, cityInput, countryInput, SetInputForms, inputForms, setErrorMessage)}
                        className="btn-success btn text-white w-25 m-auto"
                    >
                        بحث
                    </button>
                    <span id="error-area" className="error-area">{errorMessage}</span>
                </div>
            </form>

            {DateData && (
                <>
                    <h4 className="text-center fw-bold mb-5 mt-4">{DateData.hijri.weekday.ar}</h4>
                    <div className="Today-date d-flex align-items-center justify-content-between gap-3 mb-5">
                        <div className="Gregorian-date">
                            <p>
                                {DateData.gregorian.day}-{months[DateData.gregorian.month.en as keyof typeof months]}-{DateData.gregorian.year}
                            </p>
                        </div>
                        <div className="Hijri-Date">
                            <p>
                                {DateData.hijri.day}-{DateData.hijri.month.ar}-{DateData.hijri.year}
                            </p>
                        </div>
                    </div>
                    <div className=" w-100 mw-100 d-flex flex-column gap-4 mb-5">
                        {Object.entries(prayerTimes)
                            .filter(([key]) => PrayerTimesInArabic.includes(prayerNames[key])) // Check if the Arabic name exists in PrayerTimesInArabic
                            .map(([key, time]) => (
                                <PrayerTime prayerKey={key} time={time}  />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PrayerTiming;


