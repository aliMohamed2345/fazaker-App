'use client'
import { getDateFormat, PrayerTimesProps, InputFormsProps, InitialInputForms, DateDataProps, InitialPrayerTimes, months } from "./function";
import { useRef, useState, MouseEvent, useEffect } from "react";

const PrayerTiming = () => {
    //Hooks
    const [errorMessage, setErrorMessage] = useState('');
    const [DateData, SetDateData] = useState<DateDataProps | null>(null);
    const [prayerTimes, SetPrayerTimes] = useState<PrayerTimesProps>(InitialPrayerTimes);
    const [inputForms, SetInputForms] = useState<InputFormsProps>(InitialInputForms)
    //Refs
    const cityInput = useRef<HTMLInputElement>(null);
    const countryInput = useRef<HTMLInputElement>(null);
    //for checking if the city and country values found in local storage in the mounting 
    useEffect(() => {
        const savedCity = localStorage.getItem('city') || "";
        const savedCountry = localStorage.getItem('country') || "";
        if (savedCity && savedCountry) {
            SetInputForms({ ...inputForms, city: savedCity, country: savedCountry })
        }
    }, []);
    //handling the api requests where is status code is 200 or the data doesn't fetched 
    useEffect(() => {
        if (inputForms.city && inputForms.country) {
            fetch(`https://api.aladhan.com/v1/timingsByCity/${getDateFormat()}?city=${inputForms.city}&country=${inputForms.country}&method=8`)
                .then(res => res.json())
                .then(data => {
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

    const handleSubmitBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cityValue = cityInput.current?.value;
        const countryValue = countryInput.current?.value;
        if (cityValue && countryValue) {
            localStorage.setItem('city', cityValue);
            localStorage.setItem('country', countryValue);
            SetInputForms({ ...inputForms, city: cityValue, country: countryValue })
        } else {
            setErrorMessage('من فضلك ادخل القيم في حقول الادخال');
        }
    };

    let { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = prayerTimes;
    return (
        <div className="container text-center">
            <h1>hello</h1>
            <h1 className="mt-4">مواقيت الصلاه</h1>
            <form className="d-flex mt-5 justify-content-center gap-5 flex-column">
                <div className="country d-flex gap-4 justify-content-center">
                    <label>ادخل اسم الدوله</label>
                    <input ref={countryInput} type="text" onChange={(e) => SetInputForms({ ...inputForms, country: e.target.value })} name="country" value={inputForms.country || ''} className="w-50 rounded-1 border-0 border-bottom border-success bg-transparent text-secondary shadow-none text-center" placeholder="اسم الدوله" />
                </div>
                <div className="city d-flex justify-content-center gap-4">
                    <label>ادخل اسم البلده</label>
                    <input ref={cityInput} type="text" name="city" onChange={(e) => SetInputForms({ ...inputForms, city: e.target.value })} value={inputForms.city || ''} className="w-50 rounded-1 border-0 border-bottom text-secondary border-success bg-transparent shadow-none text-center" placeholder="اسم البلده" />
                </div>
                <div className="submit-area flex-column d-flex gap-2">
                    <button onClick={handleSubmitBtn} className="btn-success btn text-white w-25 m-auto">بحث</button>
                    <span id="error-area" className="error-area">{errorMessage}</span>
                </div>
            </form>
            {DateData && <>
                <p className="text-center fs-2 fw-bold mb-5 mt-4">{DateData.hijri.weekday.ar}</p>
                <div className="Today-date d-flex align-items-center justify-content-between gap-3 mb-5">
                    <div className="Gregorian-date">
                        <p className="fs-5">{DateData.gregorian.day}-{months[DateData.gregorian.month.en]}-{DateData.gregorian.year}</p>
                    </div>
                    <div className="Hijri-Date">
                        <p className="fs-5">{DateData.hijri.day}-{DateData.hijri.month.ar}-{DateData.hijri.year}</p>
                    </div>
                </div>
                <div className="prayer-times w-100 mw-100 d-flex flex-column gap-4">
                    <div className="bg-secondary prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Fajr}</p>
                        <p className="m-0">الفجر</p>
                    </div>
                    <div className="bg-secondary prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Sunrise}</p>
                        <p className="m-0">الشروق</p>
                    </div>
                    <div className="bg-secondary prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Dhuhr}</p>
                        <p className="m-0">الظهر</p>
                    </div>
                    <div className="bg-secondary prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Asr}</p>
                        <p className="m-0">العصر</p>
                    </div>
                    <div className="bg-secondary prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Maghrib}</p>
                        <p className="m-0">المغرب</p>
                    </div>
                    <div className="bg-secondary mb-5 prayer d-flex fw-bold align-items-center justify-content-between rounded-3 p-2">
                        <p className="m-0">{Isha}</p>
                        <p className="m-0">العشاء</p>
                    </div>
                </div>
            </>
            }
        </div>
    );
};

export default PrayerTiming;
