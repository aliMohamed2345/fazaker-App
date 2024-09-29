'use client'
import MoreOptionsSurah from "@/app/components/Quran/ListeningToQuran/MoreOptionsSurah";
import { FaPlay } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import AudioPlayer from "@/app/components/Quran/AudioPlayer/AudioPlayer";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
import { useDispatch } from "react-redux";
import { SetIndex, SetAudioSrc, SetIsOpen, SetListOfSurah } from "@/app/redux/Slices/AudioPlayerSlice";
import { SetReciterName, SetOptionsAudioSrc, SetOptionsSurahName } from "@/app/redux/Slices/AudioPlayerOptionsSlice";
interface ReciterIdProps {
  searchParams: {
    SurahLink: string;
    TotalSurah: number;
    SurahList: string;
    ReciterName: string;
  };
}

const ReciterId = ({ searchParams }: ReciterIdProps) => {
  let dispatch = useDispatch();
  const ListOfSurah = searchParams.SurahList.split(",");
  let ListOfSurahLinks: string[] = [];
  const [openOptions, setOpenOptions] = useState<boolean[]>(
    Array(ListOfSurah.length).fill(false)
  );
  const [activeSurah, setActiveSurah] = useState<string | null>(null);

  const toggleOptions = (index: number) => {
    setOpenOptions((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };
  const handlePlayClick = (index: number, SurahLink: string) => {
    setActiveSurah(SurahLink)
    dispatch(SetIsOpen(true))
    dispatch(SetIndex(index))
    dispatch(SetAudioSrc(SurahLink))
    dispatch(SetListOfSurah(ListOfSurahLinks))
  };

  return (
    <div className="container">
      <p>2</p>
      <h2 className="text-center mt-5 mb-5">{searchParams?.ReciterName}</h2>
      <div
        style={{ marginBottom: `130px` }}
        className="d-flex position-relative justify-content-center flex-wrap flex-row-reverse gap-4 col"
      >
        {ListOfSurah.map((surah, i) => {
          let correctedSurah: string =
            +surah < 10
              ? `00${surah}`
              : +surah === 10 || (+surah > 10 && +surah < 100)
                ? `0${surah}`
                : `${surah}`;
          let SurahLink = `${searchParams.SurahLink}${correctedSurah}.mp3`;
          ListOfSurahLinks.push(SurahLink);
          dispatch(SetReciterName(searchParams?.ReciterName), SetOptionsAudioSrc(SurahLink), SetOptionsSurahName(surahNamesArabic[+surah]))
          return (
            <div
              key={i}
              className="surah-container position-relative  p-3 rounded-3 d-flex justify-content-between align-items-center col-4 col-sm-3 col-md-3 flex-sm-row-reverse flex-md-row-reverse flex-column gap-3 gap-md-2 gap-sm-2"
            >
              <div className="for-small-sizes d-flex flex-row-reverse align-items-center  gap-5 gap-md-0 gap-sm-2">
                <p className="m-0 ">{surahNamesArabic[+surah]}</p>
                <button
                  type="button"
                  title="more options"
                  className={`btn p-0 d-block d-sm-none d-md-none`}
                  onClick={() => toggleOptions(i)}
                >
                  <IoMdMore size={25} />
                </button>
              </div>
              <div className="options d-flex align-items-center gap-1 justify-content-between">
                <button
                  type="button"
                  title="more options"
                  className="btn p-0 d-none d-sm-block d-md-block"
                  onClick={() => toggleOptions(i)}
                >
                  <IoMdMore size={25} />
                </button>
                <button
                  type="button"
                  title="play"
                  className="bg-success text-white p-3 p-sm-2 p-md-2 d-flex align-items-center btn justify-content-center rounded-circle"
                  onClick={() => handlePlayClick(i, SurahLink)}
                >
                  <FaPlay />
                </button>
              </div>
              <MoreOptionsSurah isOptionsOpened={openOptions[i]} />
              {activeSurah === SurahLink &&
                ListOfSurahLinks.map((surah) => {
                  if (surah === SurahLink) {
                    return (
                      <AudioPlayer />
                    );
                  }
                  return null;
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReciterId;
