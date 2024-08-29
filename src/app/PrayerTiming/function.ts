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
export let months = {
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