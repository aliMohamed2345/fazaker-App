'use client'
import MoreOptionsSurah from "@/app/components/Quran/MoreOptionsSurah";
import SearchArea from "@/app/components/Quran/SearchArea";
import { FaPlay } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import AudioPlayer from "@/app/components/Quran/AudioPlayer/AudioPlayer";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
import NotFound from "@/app/components/Quran/NotFound";

interface ReciterIdProps {
  searchParams: {
    SurahLink: string;
    TotalSurah: number;
    SurahList: string;
    ReciterName: string;
  };
}

const ReciterId = ({ searchParams }: ReciterIdProps) => {
  const ListOfSurah = searchParams.SurahList.split(",");
  let ListOfSurahLinks: string[] = [];
  const [openOptions, setOpenOptions] = useState<boolean[]>(
    Array(ListOfSurah.length).fill(false)
  );
  const [activeSurah, setActiveSurah] = useState<string | null>(null);
  const [searchVal, SetSearchVal] = useState<string>(""); // Search value state

  const toggleOptions = (index: number) => {
    setOpenOptions((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  // Filter Surahs based on search value
  const filteredSurah = ListOfSurah.filter((surah) =>
    surahNamesArabic[+surah].includes(searchVal)
  );

  return (
    <div className="container">
      <p>2</p>
      <h2 className="text-center mt-5 mb-5">{searchParams?.ReciterName}</h2>
      <SearchArea
        searchVal={searchVal}
        SetSearchVal={SetSearchVal}
      />
      <div
        style={{ marginBottom: `130px` }}
        className="d-flex position-relative justify-content-center flex-wrap flex-row-reverse gap-4 col"
      >
        {!filteredSurah.length && <NotFound />}
        {filteredSurah.map((surah, i) => {
          let correctedSurah: string =
            +surah < 10
              ? `00${surah}`
              : +surah === 10 || (+surah > 10 && +surah < 100)
                ? `0${surah}`
                : `${surah}`;
          let SurahLink = `${searchParams.SurahLink}${correctedSurah}.mp3`;
          ListOfSurahLinks.push(SurahLink);

          return (
            <div
              key={i}
              className="surah-container position-relative bg-secondary p-3 rounded-3 d-flex justify-content-between align-items-center col-4 col-sm-3 col-md-3 flex-sm-row-reverse flex-md-row-reverse flex-column gap-3 gap-md-2 gap-sm-2"
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
                  onClick={() => setActiveSurah(SurahLink)}
                >
                  <FaPlay />
                </button>
              </div>
              <MoreOptionsSurah
                isOptionsOpened={openOptions[i]}
                AudioSrc={SurahLink}
                SurahName={surahNamesArabic[+surah]}
                ReciterName={searchParams?.ReciterName}
              />
              {activeSurah === SurahLink &&
                ListOfSurahLinks.map((surah, i) => {
                  if (surah === SurahLink) {
                    return (
                      <AudioPlayer
                        key={i}
                        index={i}
                        isOpen={true}
                        AudioSrc={ListOfSurahLinks[i]}
                        ListOfSurah={ListOfSurahLinks}
                      />
                    );
                  }
                  return null; // Return null for non-matching cases
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReciterId;
