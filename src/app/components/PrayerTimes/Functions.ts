import { MouseEvent, RefObject } from "react";

//interfaces
export interface PrayerTimesProps {
    Fajr: string,
    Sunrise: string,
    Dhuhr: string,
    Asr: string,
    Sunset: string,
    Maghrib: string,
    Isha: string,
}
export interface DateDataProps {
    gregorian: {
        date: string;
        weekday: { en: string; ar: string };
        day: string
        month: { number: number; en: string; };
        year: string
    };
    hijri: {
        date: string;
        day: string;
        month: { number: number; en: string; ar: string };
        year: string;
        weekday: { en: string; ar: string };
    };
}
export interface InputFormsProps {
    city: string
    , country: string
}
//function
export function getDateFormat(): string {
    let Day = ('0' + new Date().getDate()).slice(-2);
    let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    let year = new Date().getFullYear();
    return `${Day}-${month}-${year}`;
}
//objects
export let months: { [key: string]: string } = {
    "January": "يناير",
    "February": "فبراير"
    , "March": "مارس",
    "April": "ابريل"
    , "May": "مايو",
    "June": "يونيو",
    "July": "يوليو",
    "August": "اغسطس"
    , "September": "سبتمبر"
    , "October": "اكتوبر",
    "November": "نوفمبر"
    , "December": "ديسمبر"
}
export let InitialInputForms: InputFormsProps = {
    country: '',
    city: ''
}
export let InitialPrayerTimes: PrayerTimesProps = {
    Fajr: '',
    Sunrise: '',
    Dhuhr: '',
    Asr: '',
    Sunset: '',
    Maghrib: '',
    Isha: '',
}
export let PrayerTimesInArabic: string[] = [`الفجر`, `الشروق`, `الظهر`, `العصر`, `المغرب`, `العشاء`]
export const prayerNames: { [key: string]: string } = {
    Fajr: 'الفجر',
    Sunrise: 'الشروق',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء',
};
export const handleSubmitBtn = (
    e: MouseEvent<HTMLButtonElement>,
    cityInput: RefObject<HTMLInputElement>,
    countryInput: RefObject<HTMLInputElement>,
    setInputForms: React.Dispatch<React.SetStateAction<InputFormsProps>>,
    inputForms: InputFormsProps,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
    e.preventDefault();
    const cityValue = cityInput.current?.value;
    const countryValue = countryInput.current?.value;
    if (cityValue && countryValue) {
        localStorage.setItem("city", cityValue);
        localStorage.setItem("country", countryValue);
        setInputForms({ ...inputForms, city: cityValue, country: countryValue });
    } else {
        setErrorMessage("من فضلك ادخل القيم في حقول الادخال");
    }
};