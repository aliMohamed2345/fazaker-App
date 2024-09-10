
import React, { useEffect } from "react";

export interface AudioPlayerProps {
    isOpen: boolean;
    AudioSrc: string;
    index: number,
    ListOfSurah: string[]
}

export interface AudioStatesProps {
    isPlay: boolean;
    isMute: boolean;
    duration: string;
    currentTime: string;
    volume: number;
    progress: number;
}

export const AudioStatesInitial: AudioStatesProps = {
    isPlay: false,
    isMute: false,
    duration: "00:00",
    currentTime: "00:00",
    volume: 0.3,
    progress: 0,
};

export const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600); // Calculate the number of hours
    const minutes = Math.floor((time % 3600) / 60); // Calculate the remaining minutes
    const seconds = Math.floor(time % 60); // Calculate the remaining seconds
    return `${hours > 0 ? `${hours < 10 ? "0" : ""}${hours}:` : ""}${minutes < 10 ? "0" : ""
        }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const handlePlayBtn = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    audioStates: { isPlay: boolean },
    setAudioStates: React.Dispatch<React.SetStateAction<AudioStatesProps>>
) => {
    if (AudioRef.current) {
        if (!audioStates.isPlay) {
            AudioRef.current.play();
        } else {
            AudioRef.current.pause();
        }
        setAudioStates((prevState) => ({
            ...prevState,
            isPlay: !prevState.isPlay,
        }));
    }
};

export const handleSkipTimeBackward = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    setAudioStates: React.Dispatch<React.SetStateAction<AudioStatesProps>>
) => {
    const RateOfChangeInSeconds = 10;
    if (AudioRef.current) {
        const newTime = Math.max(AudioRef.current.currentTime - RateOfChangeInSeconds, 0);
        AudioRef.current.currentTime = newTime;
        setAudioStates((prevState) => ({
            ...prevState,
            currentTime: formatTime(newTime),
        }));
    }
};

export const handleSkipTimeForward = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    setAudioStates: React.Dispatch<React.SetStateAction<AudioStatesProps>>
) => {
    const RateOfChangeInSeconds = 10;
    if (AudioRef.current) {
        const newTime = Math.min(AudioRef.current.currentTime + RateOfChangeInSeconds, AudioRef.current.duration);
        AudioRef.current.currentTime = newTime;
        setAudioStates((prevState) => ({
            ...prevState,
            currentTime: formatTime(newTime),
        }));
    }
};

export const handleMuteBtn = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    audioStates: { isMute: boolean },
    setAudioStates: React.Dispatch<React.SetStateAction<AudioStatesProps>>
) => {
    if (AudioRef.current) {
        AudioRef.current.muted = !audioStates.isMute;
        setAudioStates((prevState) => ({
            ...prevState,
            isMute: !prevState.isMute,
        }));
    }
};

export const surahNamesArabic: { [key: number]: string } = {
    1: "الفاتحة",
    2: "البقرة",
    3: "آل عمران",
    4: "النساء",
    5: "المائدة",
    6: "الأنعام",
    7: "الأعراف",
    8: "الأنفال",
    9: "التوبة",
    10: "يونس",
    11: "هود",
    12: "يوسف",
    13: "الرعد",
    14: "إبراهيم",
    15: "الحجر",
    16: "النحل",
    17: "الإسراء",
    18: "الكهف",
    19: "مريم",
    20: "طه",
    21: "الأنبياء",
    22: "الحج",
    23: "المؤمنون",
    24: "النور",
    25: "الفرقان",
    26: "الشعراء",
    27: "النمل",
    28: "القصص",
    29: "العنكبوت",
    30: "الروم",
    31: "لقمان",
    32: "السجدة",
    33: "الأحزاب",
    34: "سبأ",
    35: "فاطر",
    36: "يس",
    37: "الصافات",
    38: "ص",
    39: "الزمر",
    40: "غافر",
    41: "فصلت",
    42: "الشورى",
    43: "الزخرف",
    44: "الدخان",
    45: "الجاثية",
    46: "الأحقاف",
    47: "محمد",
    48: "الفتح",
    49: "الحجرات",
    50: "ق",
    51: "الذاريات",
    52: "الطور",
    53: "النجم",
    54: "القمر",
    55: "الرحمن",
    56: "الواقعة",
    57: "الحديد",
    58: "المجادلة",
    59: "الحشر",
    60: "الممتحنة",
    61: "الصف",
    62: "الجمعة",
    63: "المنافقون",
    64: "التغابن",
    65: "الطلاق",
    66: "التحريم",
    67: "الملك",
    68: "القلم",
    69: "الحاقة",
    70: "المعارج",
    71: "نوح",
    72: "الجن",
    73: "المزمل",
    74: "المدثر",
    75: "القيامة",
    76: "الإنسان",
    77: "المرسلات",
    78: "النبأ",
    79: "النازعات",
    80: "عبس",
    81: "التكوير",
    82: "الانفطار",
    83: "المطففين",
    84: "الانشقاق",
    85: "البروج",
    86: "الطارق",
    87: "الأعلى",
    88: "الغاشية",
    89: "الفجر",
    90: "البلد",
    91: "الشمس",
    92: "الليل",
    93: "الضحى",
    94: "الشرح",
    95: "التين",
    96: "العلق",
    97: "القدر",
    98: "البينة",
    99: "الزلزلة",
    100: "العاديات",
    101: "القارعة",
    102: "التكاثر",
    103: "العصر",
    104: "الهمزة",
    105: "الفيل",
    106: "قريش",
    107: "الماعون",
    108: "الكوثر",
    109: "الكافرون",
    110: "النصر",
    111: "المسد",
    112: "الإخلاص",
    113: "الفلق",
    114: "الناس"
};


export const handleStepBackward = (
    setActiveAudioSrc: (src: string) => void,
    ListOfSurah: string[],
    index: number
) => {
    if (index > 0) {
        setActiveAudioSrc(ListOfSurah[index - 1]);
    }
};

export const handleStepForward = (
    setActiveAudioSrc: (src: string) => void,
    ListOfSurah: string[],
    index: number
) => {
    if (index < ListOfSurah.length - 1) {
        setActiveAudioSrc(ListOfSurah[index + 1]);
    }
    
};
